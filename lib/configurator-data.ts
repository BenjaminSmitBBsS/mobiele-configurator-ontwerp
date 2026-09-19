import type { LucideIcon } from "lucide-react"
import { ArrowRightFromLine, ClockArrowUp, FileSignature, MessageCircle, Users } from "lucide-react"

export type Feature = {
  id: string
  label: string
  icon: LucideIcon
  moduleLabel: string
  defaultSelected: boolean
  opstart: number
  maand: number
}

// Basiskosten die altijd gelden, los van de aangevinkte modules.
export const basisKosten = { opstart: 50, maand: 2.5 }

export const features: Feature[] = [
  {
    id: "agenda",
    label: "Zelf afspraken plannen",
    icon: ClockArrowUp,
    moduleLabel: "Slimme Agenda & Planningsmodule",
    defaultSelected: true,
    opstart: 15,
    maand: 3.5,
  },
  {
    id: "auto",
    label: "Automatische follow-ups sturen",
    icon: ArrowRightFromLine,
    moduleLabel: "Systeem voor Geautomatiseerde Klantreacties",
    defaultSelected: true,
    opstart: 18,
    maand: 5.0,
  },
  {
    id: "crm",
    label: "Leads & contacten beheren",
    icon: Users,
    moduleLabel: "Centraal Klanten- & Offerteoverzicht",
    defaultSelected: false,
    opstart: 12,
    maand: 2.5,
  },
  {
    id: "sign",
    label: "Digitaal ondertekenen van offertes",
    icon: FileSignature,
    moduleLabel: "Module voor Digitaal Ondertekenen",
    defaultSelected: true,
    opstart: 15,
    maand: 4.0,
  },
  {
    id: "app",
    label: "Vragen ontvangen via WhatsApp",
    icon: MessageCircle,
    moduleLabel: "Directe Communicatiekoppeling",
    defaultSelected: false,
    opstart: 10,
    maand: 3.5,
  },
]

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
