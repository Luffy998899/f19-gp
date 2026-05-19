import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  MessageCircle,
  Twitch,
  Music2,
  Globe,
  type LucideIcon,
} from "lucide-react"

export function socialIcon(platform: string): LucideIcon {
  const p = (platform || "").toLowerCase()
  if (p.includes("facebook")) return Facebook
  if (p.includes("instagram")) return Instagram
  if (p.includes("youtube")) return Youtube
  if (p === "x" || p.includes("twitter")) return Twitter
  if (p.includes("linkedin")) return Linkedin
  if (p.includes("whatsapp")) return MessageCircle
  if (p.includes("twitch")) return Twitch
  if (p.includes("tiktok")) return Music2
  return Globe
}

export function socialLabel(platform: string, label?: string | null) {
  if (label && label.trim().length > 0) return label
  if (!platform) return "Link"
  return platform.charAt(0).toUpperCase() + platform.slice(1)
}
