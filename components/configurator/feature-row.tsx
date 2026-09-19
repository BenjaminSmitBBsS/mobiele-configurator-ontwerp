"use client"

import { CheckCheck } from "lucide-react"
import type { Feature } from "@/lib/configurator-data"
import { cn } from "@/lib/utils"

export function FeatureRow({
  feature,
  selected,
  onToggle,
}: {
  feature: Feature
  selected: boolean
  onToggle: () => void
}) {
  const Icon = feature.icon

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors",
        selected ? "border-primary/70 bg-accent" : "border-border bg-card hover:border-muted-foreground/40",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-transparent",
        )}
      >
        {selected && <CheckCheck className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>

      <span
        aria-hidden
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          selected ? "bg-accent-strong text-primary" : "bg-secondary text-muted-foreground",
        )}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>

      <span
        className={cn("flex-1 text-[15px] font-semibold", selected ? "text-foreground" : "text-muted-foreground")}
      >
        {feature.label}
      </span>

      <span aria-hidden className={cn("h-2 w-2 shrink-0 rounded-full", selected ? "bg-primary" : "bg-border")} />
    </button>
  )
}
