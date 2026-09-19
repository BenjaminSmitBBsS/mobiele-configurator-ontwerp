"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { CheckCircle2, ChevronLeft, ClipboardList, ExternalLink, FileText, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { Feature } from "@/lib/configurator-data"
import { formatCurrency } from "@/lib/configurator-data"
import { buildOfferteUrl, buildWhatsAppUrl } from "@/lib/contact-config"
import { WhatsAppIcon } from "./whatsapp-icon"

type Step = "choice" | "form" | "success"

export function RequestModal({
  open,
  onOpenChange,
  selectedFeatures,
  opstartTotal,
  maandTotal,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedFeatures: Feature[]
  opstartTotal: number
  maandTotal: number
}) {
  const [step, setStep] = useState<Step>("choice")
  const [naam, setNaam] = useState("")
  const [telefoon, setTelefoon] = useState("")
  const [email, setEmail] = useState("")

  // Reset de flow zodra de modal (weer) gesloten is, zodat een volgend bezoek bij "choice" begint.
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setStep("choice")
        setNaam("")
        setTelefoon("")
        setEmail("")
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [open])

  const moduleNamen = selectedFeatures.map((feature) => feature.label)
  const moduleLijst = moduleNamen.length > 0 ? moduleNamen.join(", ") : "geen extra modules"

  const whatsappMessage = `Hoi! Ik heb mijn pakket samengesteld op de website. Gekozen modules: ${moduleLijst}. Totale opstartkosten: ${formatCurrency(opstartTotal)}, Maandelijks: ${formatCurrency(maandTotal)}. Ik wil dit graag in gang zetten!`
  const whatsappHref = buildWhatsAppUrl(whatsappMessage)

  const offerteHref = buildOfferteUrl({
    modules: selectedFeatures.map((feature) => feature.id).join(",") || "geen",
    opstart: opstartTotal.toFixed(2),
    maand: maandTotal.toFixed(2),
  })

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStep("success")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 sm:max-w-[360px]">
        {step === "choice" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">Hoe wil je jouw aanvraag versturen?</DialogTitle>
              <DialogDescription>
                Gekozen pakket: {formatCurrency(opstartTotal)} eenmalig + {formatCurrency(maandTotal)}/mnd
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-primary p-3.5 text-left text-primary-foreground transition-opacity hover:opacity-90"
              >
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <WhatsAppIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold">Direct via WhatsApp</span>
                  <span className="block text-xs text-primary-foreground/80">Snelst antwoord, persoonlijk contact</span>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left transition-colors hover:border-muted-foreground/40"
              >
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <ClipboardList className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold text-foreground">Snel formulier invullen</span>
                  <span className="block text-xs text-muted-foreground">Naam, telefoon en e-mail, klaar in 30 sec</span>
                </span>
              </button>

              <a
                href={offerteHref ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!offerteHref}
                onClick={(event) => {
                  if (!offerteHref) event.preventDefault()
                }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left transition-colors hover:border-muted-foreground/40 aria-disabled:pointer-events-none aria-disabled:opacity-50"
              >
                <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                  <FileText className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 text-[15px] font-semibold text-foreground">
                    Uitgebreid offerteformulier
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {offerteHref ? "Opent in een nieuw tabblad" : "Nog niet geconfigureerd"}
                  </span>
                </span>
              </a>
            </div>
          </>
        )}

        {step === "form" && (
          <>
            <DialogHeader>
              <button
                type="button"
                onClick={() => setStep("choice")}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.5} />
                Terug
              </button>
              <DialogTitle className="text-lg">Snel formulier invullen</DialogTitle>
              <DialogDescription>
                Gekozen pakket: {formatCurrency(opstartTotal)} eenmalig + {formatCurrency(maandTotal)}/mnd
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="request-naam">Naam</FieldLabel>
                  <Input
                    id="request-naam"
                    value={naam}
                    onChange={(event) => setNaam(event.target.value)}
                    placeholder="Je volledige naam"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="request-telefoon">Telefoonnummer</FieldLabel>
                  <Input
                    id="request-telefoon"
                    type="tel"
                    value={telefoon}
                    onChange={(event) => setTelefoon(event.target.value)}
                    placeholder="06 12345678"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="request-email">E-mailadres</FieldLabel>
                  <Input
                    id="request-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="jij@bedrijf.nl"
                    required
                  />
                </Field>
              </FieldGroup>

              <Button type="submit" size="lg" className="h-11 w-full rounded-full text-sm font-semibold">
                <Send data-icon="inline-start" />
                Verstuur Aanvraag
              </Button>
            </form>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
              <CheckCircle2 className="h-6 w-6" strokeWidth={2} />
            </span>
            <DialogTitle className="text-lg">Bedankt!</DialogTitle>
            <DialogDescription className="text-sm">We nemen binnen 24 uur contact op.</DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
