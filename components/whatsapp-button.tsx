import { MessageCircle } from "lucide-react"

interface WhatsAppButtonProps {
  phone: string
}

export function WhatsAppButton({ phone }: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors shadow-lg border-2 border-foreground"
    >
      <MessageCircle className="w-4 h-4" />
      WhatsApp
    </a>
  )
}
