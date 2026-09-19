import type { LucideIcon } from "lucide-react"
import { ArrowRightFromLine, ClockArrowUp, FileSignature, MessageCircle, Users } from "lucide-react"

export type Feature = {
  id: string
  label: string
  icon: LucideIcon
  moduleLabel: string
  defaultSelected: boolean
}

export const features: Feature[] = [
  {
    id: "scheduling",
    label: "Zelf afspraken plannen",
    icon: ClockArrowUp,
    moduleLabel: "Slimme Agenda & Planningsmodule",
    defaultSelected: true,
  },
  {
    id: "follow-ups",
    label: "Automatische follow-ups sturen",
    icon: ArrowRightFromLine,
    moduleLabel: "Systeem voor Geautomatiseerde Klantreacties",
    defaultSelected: true,
  },
  {
    id: "leads",
    label: "Leads & contacten beheren",
    icon: Users,
    moduleLabel: "Centraal Klanten- & Offerteoverzicht",
    defaultSelected: false,
  },
  {
    id: "signing",
    label: "Digitaal ondertekenen van offertes",
    icon: FileSignature,
    moduleLabel: "Module voor Digitaal Ondertekenen",
    defaultSelected: true,
  },
  {
    id: "whatsapp",
    label: "Vragen ontvangen via WhatsApp",
    icon: MessageCircle,
    moduleLabel: "Directe Communicatiekoppeling",
    defaultSelected: false,
  },
]
