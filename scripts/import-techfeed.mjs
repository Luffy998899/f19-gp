#!/usr/bin/env node
/**
 * Import WheelPros TechFeed rim/wheel catalog into Supabase products.
 *
 * Reads Wheel_TechGuide.xml from TechFeed.zip only (rims — no tires,
 * accessories, or lighting). MapPrice_TechGuide.xml is skipped; prices are
 * never stored or exposed to customers.
 *
 * Usage:
 *   pnpm import:techfeed
 *   pnpm import:techfeed -- --force   # re-import even if already done
 */

import { createClient } from "@supabase/supabase-js"
import AdmZip from "adm-zip"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const ZIP_PATH = path.join(ROOT, "TechFeed.zip")
const BATCH_SIZE = 400
const RIM_CATEGORY = "Rims"
const WHEEL_FEED = "Wheel_TechGuide.xml"

/** Next.js loads .env.local automatically; standalone Node scripts do not. */
function loadEnvFiles() {
  for (const name of [".env.local", ".env"]) {
    const filePath = path.join(ROOT, name)
    if (!existsSync(filePath)) continue
    let raw = readFileSync(filePath)
    if (raw[0] === 0xff && raw[1] === 0xfe) {
      raw = raw.slice(2)
      applyEnvContent(raw.toString("utf16le"))
      continue
    }
    applyEnvContent(raw.toString("utf8").replace(/^\uFEFF/, ""))
  }
}

function applyEnvContent(content) {
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

loadEnvFiles()

const force = process.argv.includes("--force")

function getEnv(name) {
  return process.env[name] || process.env[name.replace("NEXT_PUBLIC_", "")]
}

function tagValue(block, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "i")
  const match = block.match(re)
  return match ? match[1].trim() : ""
}

function firstImage(...candidates) {
  for (const value of candidates) {
    if (value && /^https?:\/\//i.test(value)) return value
  }
  return null
}

function readFeedXml(filename) {
  if (!existsSync(ZIP_PATH)) {
    throw new Error(`TechFeed.zip not found at ${ZIP_PATH}`)
  }
  const zip = new AdmZip(ZIP_PATH)
  const entry = zip.getEntry(filename)
  if (!entry) {
    throw new Error(`${filename} not found inside TechFeed.zip`)
  }
  return entry.getData().toString("utf8")
}

function parseBlocks(xml) {
  const inner = xml.replace(/^[\s\S]*?<root>/i, "").replace(/<\/root>[\s\S]*$/, "")
  return inner
    .split("</data>")
    .map((chunk) => chunk.replace(/^[\s\S]*?<data>/i, "").trim())
    .filter(Boolean)
}

function mapRim(block, displayOrder) {
  const sku = tagValue(block, "sku")
  if (!sku) return null

  const brand = tagValue(block, "brand_desc")
  const finish = tagValue(block, "fancy_finish_desc") || tagValue(block, "abbreviated_finish_desc")
  const bolt = tagValue(block, "bolt_pattern_metric") || tagValue(block, "bolt_pattern_standard")
  const offset = tagValue(block, "offset")

  const descriptionParts = [brand, finish, bolt ? `Bolt ${bolt}` : "", offset ? `ET${offset}` : ""]
    .filter(Boolean)
    .join(" · ")

  return {
    sku,
    name: tagValue(block, "product_desc") || tagValue(block, "style") || sku,
    category: RIM_CATEGORY,
    description: descriptionParts || null,
    size: tagValue(block, "size_desc") || null,
    width: tagValue(block, "width") || null,
    profile: offset || null,
    image_url: firstImage(
      tagValue(block, "image_url1"),
      tagValue(block, "image_url"),
      tagValue(block, "image_url2"),
      tagValue(block, "image_url4"),
    ),
    price: null,
    rating: 5,
    reviews_count: 0,
    is_featured: false,
    is_active: true,
    display_order: displayOrder,
    _featuredKey: `${brand}:${tagValue(block, "style")}`,
  }
}

function markFeatured(products, limit = 16) {
  const seen = new Set()
  let count = 0
  for (const product of products) {
    if (!product.image_url || count >= limit) continue
    const key = product._featuredKey || product.sku
    if (seen.has(key)) continue
    seen.add(key)
    product.is_featured = true
    count++
  }
  return products
}

async function clearPriorTechFeedProducts(supabase) {
  console.log("Removing prior TechFeed imports (keeping manual admin products without SKU)…")
  const { error } = await supabase.from("products").delete().not("sku", "is", null)
  if (error) {
    throw new Error(`Could not clear prior TechFeed products: ${error.message}`)
  }
}

async function main() {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL") || getEnv("SUPABASE_URL")
  const serviceKey = getEnv("SUPABASE_SERVICE_ROLE_KEY")
  if (!url || !serviceKey) {
    console.log("Skipping TechFeed import — Supabase credentials not configured.")
    process.exit(0)
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  if (!force) {
    const { data: flag } = await supabase
      .from("site_content")
      .select("value")
      .eq("key", "techfeed_imported_at")
      .maybeSingle()
    if (flag?.value) {
      console.log(`TechFeed rims already imported at ${flag.value}. Use --force to re-import.`)
      return
    }
  }

  await clearPriorTechFeedProducts(supabase)

  console.log(`Parsing TechFeed.zip (${WHEEL_FEED} — rims only)…`)
  const xml = readFeedXml(WHEEL_FEED)
  const blocks = parseBlocks(xml)
  const allProducts = []
  let order = 0

  for (const block of blocks) {
    const mapped = mapRim(block, order++)
    if (mapped) allProducts.push(mapped)
  }

  markFeatured(allProducts)

  const payload = allProducts.map(({ _featuredKey, ...product }) => product)
  console.log(`Upserting ${payload.length.toLocaleString()} rims …`)

  let imported = 0
  for (let i = 0; i < payload.length; i += BATCH_SIZE) {
    const batch = payload.slice(i, i + BATCH_SIZE)
    const { error } = await supabase.from("products").upsert(batch, { onConflict: "sku" })
    if (error) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error.message)
      if (error.message.includes("ON CONFLICT") || error.message.includes("unique")) {
        console.error(
          "\nRun scripts/003_techfeed_products.sql in the Supabase SQL Editor first,\n" +
            "then re-run: pnpm import:techfeed -- --force\n",
        )
      }
      process.exit(1)
    }
    imported += batch.length
    process.stdout.write(`\r  ${imported.toLocaleString()} / ${payload.length.toLocaleString()}`)
  }
  console.log("\nDone.")

  const importedAt = new Date().toISOString()
  await supabase.from("site_content").upsert({
    key: "techfeed_imported_at",
    value: importedAt,
    updated_at: importedAt,
  })

  const featuredCount = payload.filter((p) => p.is_featured).length
  console.log(`Imported ${payload.length.toLocaleString()} rims (${featuredCount} featured).`)
  console.log("Tires, accessories, and lighting were skipped. Prices were not imported.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
