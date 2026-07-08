#!/usr/bin/env node
/**
 * Import WheelPros TechFeed XML catalog into Supabase products.
 *
 * Reads TechFeed.zip from the project root, parses Wheel/Tire/Accessory/Lighting
 * feeds, and upserts products by SKU. MapPrice_TechGuide.xml is intentionally
 * skipped — prices are never stored or exposed to customers.
 *
 * Usage:
 *   pnpm import:techfeed
 *   pnpm import:techfeed -- --force   # re-import even if already done
 */

import { createClient } from "@supabase/supabase-js"
import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const ZIP_PATH = path.join(ROOT, "TechFeed.zip")
const BATCH_SIZE = 400

const FEEDS = [
  { file: "Wheel_TechGuide.xml", category: "Wheels", type: "wheel" },
  { file: "Tire_TechGuide.xml", category: "Tires", type: "tire" },
  { file: "Accessory_TechGuide.xml", category: "Accessories", type: "accessory" },
  { file: "Lighting_TechGuide.xml", category: "Lighting", type: "lighting" },
]

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
  return execFileSync("unzip", ["-p", ZIP_PATH, filename], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  })
}

function parseBlocks(xml) {
  const inner = xml.replace(/^[\s\S]*?<root>/i, "").replace(/<\/root>[\s\S]*$/, "")
  return inner
    .split("</data>")
    .map((chunk) => chunk.replace(/^[\s\S]*?<data>/i, "").trim())
    .filter(Boolean)
}

function mapWheel(block, displayOrder) {
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
    category: "Wheels",
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

function mapTire(block, displayOrder) {
  const sku = tagValue(block, "sku")
  if (!sku) return null

  const brand = tagValue(block, "brand_desc")
  const terrain = tagValue(block, "terrain")
  const load = tagValue(block, "load_index")
  const speed = tagValue(block, "speed_rating")

  const descriptionParts = [brand, terrain, load && speed ? `${load}${speed}` : ""]
    .filter(Boolean)
    .join(" · ")

  return {
    sku,
    name: tagValue(block, "tire_description") || tagValue(block, "display_model_no") || sku,
    category: "Tires",
    description: descriptionParts || null,
    size: tagValue(block, "tire_size") || tagValue(block, "rim_diameter") || null,
    width: tagValue(block, "section_width") || null,
    profile: load && speed ? `${load}${speed}` : null,
    image_url: firstImage(tagValue(block, "image_url")),
    price: null,
    rating: 5,
    reviews_count: 0,
    is_featured: false,
    is_active: true,
    display_order: displayOrder,
    _featuredKey: `${brand}:${tagValue(block, "display_model_no")}`,
  }
}

function mapAccessory(block, displayOrder) {
  const sku = tagValue(block, "sku")
  if (!sku) return null

  const brand = tagValue(block, "brand_desc")
  const subType = tagValue(block, "product_sub_type")

  return {
    sku,
    name: tagValue(block, "product_desc") || sku,
    category: subType ? `Accessories · ${subType}` : "Accessories",
    description: brand || null,
    size: null,
    width: null,
    profile: null,
    image_url: firstImage(tagValue(block, "image_url")),
    price: null,
    rating: 5,
    reviews_count: 0,
    is_featured: false,
    is_active: true,
    display_order: displayOrder,
    _featuredKey: `${brand}:${subType}`,
  }
}

function mapLighting(block, displayOrder) {
  const sku = tagValue(block, "SKU") || tagValue(block, "sku")
  if (!sku) return null

  const brand = tagValue(block, "Brand")
  const subcategory = tagValue(block, "Subcategory")

  return {
    sku,
    name: tagValue(block, "DisplayName") || sku,
    category: subcategory ? `Lighting · ${subcategory}` : "Lighting",
    description: tagValue(block, "DetailedDescription") || brand || null,
    size: null,
    width: null,
    profile: null,
    image_url: firstImage(
      tagValue(block, "ImageLink1"),
      tagValue(block, "ImageLink2"),
      tagValue(block, "ImageLink3"),
    ),
    price: null,
    rating: 5,
    reviews_count: 0,
    is_featured: false,
    is_active: true,
    display_order: displayOrder,
    _featuredKey: `${brand}:${subcategory}`,
  }
}

function mapRecord(type, block, displayOrder) {
  switch (type) {
    case "wheel":
      return mapWheel(block, displayOrder)
    case "tire":
      return mapTire(block, displayOrder)
    case "accessory":
      return mapAccessory(block, displayOrder)
    case "lighting":
      return mapLighting(block, displayOrder)
    default:
      return null
  }
}

function markFeatured(products, perCategory = 8) {
  const seen = new Map()
  for (const product of products) {
    if (!product.image_url) continue
    const bucket = product.category.split(" · ")[0]
    const count = seen.get(bucket) || 0
    if (count >= perCategory) continue
    const key = product._featuredKey || product.sku
    const usedKeys = seen.get(`${bucket}:keys`) || new Set()
    if (usedKeys.has(key)) continue
    usedKeys.add(key)
    seen.set(`${bucket}:keys`, usedKeys)
    product.is_featured = true
    seen.set(bucket, count + 1)
  }
  return products
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
      console.log(`TechFeed already imported at ${flag.value}. Use --force to re-import.`)
      return
    }
  }

  console.log("Parsing TechFeed.zip …")
  const allProducts = []
  let order = 0

  for (const feed of FEEDS) {
    console.log(`  • ${feed.file}`)
    const xml = readFeedXml(feed.file)
    const blocks = parseBlocks(xml)
    for (const block of blocks) {
      const mapped = mapRecord(feed.type, block, order++)
      if (mapped) allProducts.push(mapped)
    }
  }

  markFeatured(allProducts)

  const payload = allProducts.map(({ _featuredKey, ...product }) => product)
  console.log(`Upserting ${payload.length.toLocaleString()} products …`)

  let imported = 0
  for (let i = 0; i < payload.length; i += BATCH_SIZE) {
    const batch = payload.slice(i, i + BATCH_SIZE)
    const { error } = await supabase.from("products").upsert(batch, { onConflict: "sku" })
    if (error) {
      console.error(`Batch ${i / BATCH_SIZE + 1} failed:`, error.message)
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
  console.log(`Imported ${payload.length.toLocaleString()} products (${featuredCount} featured).`)
  console.log("Prices were not imported — customers request quotes via WhatsApp.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
