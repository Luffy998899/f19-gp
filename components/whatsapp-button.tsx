import { MessageCircle } from "lucide-react"

type Props = {
  phone: string
}

export function WhatsAppButton({ phone }: Props) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors shadow-lg"
    >
      <MessageCircle className="h-4 w-4" />
      WhatsApp
    </a>
  )
}
