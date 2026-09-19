// Zet deze waarden via de projectinstellingen (Vars) van v0 / Vercel.
// NEXT_PUBLIC_WHATSAPP_NUMBER: internationaal nummer zonder "+" of spaties, bv. 31612345678
// NEXT_PUBLIC_GOHIGHLEVEL_FORM_URL: volledige URL van het GoHighLevel-formulier
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? ""
export const GOHIGHLEVEL_FORM_URL = process.env.NEXT_PUBLIC_GOHIGHLEVEL_FORM_URL?.trim() ?? ""

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message)
  // Zonder ingesteld nummer valt dit terug op de contactkiezer van WhatsApp,
  // zodat de knop altijd werkt terwijl het echte nummer nog niet is ingevuld.
  if (WHATSAPP_NUMBER) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  }
  return `https://api.whatsapp.com/send?text=${text}`
}

export function buildOfferteUrl(params: Record<string, string>) {
  if (!GOHIGHLEVEL_FORM_URL) return null
  try {
    const url = new URL(GOHIGHLEVEL_FORM_URL)
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }
    return url.toString()
  } catch {
    return null
  }
}
