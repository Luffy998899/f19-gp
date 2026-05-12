import { createClient } from "@/lib/supabase/server"
import { ContentForm } from "@/components/admin/content-form"

export const dynamic = "force-dynamic"

const FIELD_GROUPS = [
  {
    title: "Hero Section",
    description: "Top of the homepage",
    fields: [
      { key: "hero_eyebrow", label: "Eyebrow text" },
      { key: "hero_title_1", label: "Title line 1" },
      { key: "hero_title_2", label: "Title line 2" },
      { key: "hero_title_3", label: "Title line 3 (red accent)" },
      { key: "hero_description", label: "Description", multiline: true },
    ],
  },
  {
    title: "About Section",
    fields: [
      { key: "about_title", label: "Title" },
      { key: "about_description", label: "Description", multiline: true },
    ],
  },
  {
    title: "Contact Information",
    fields: [
      { key: "contact_phone", label: "Phone number" },
      { key: "contact_email", label: "Email address" },
      { key: "whatsapp_number", label: "WhatsApp number (digits only, with country code)" },
      { key: "contact_address_line1", label: "Address line 1" },
      { key: "contact_address_line2", label: "Address line 2" },
      { key: "business_hours", label: "Business hours" },
    ],
  },
]

export default async function AdminContentPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("site_content").select("key, value")
  const content: Record<string, string> = {}
  for (const row of data || []) content[row.key] = row.value

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Site Content</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Edit the text displayed across the public site.
        </p>
      </div>

      <ContentForm content={content} fieldGroups={FIELD_GROUPS} />
    </div>
  )
}
