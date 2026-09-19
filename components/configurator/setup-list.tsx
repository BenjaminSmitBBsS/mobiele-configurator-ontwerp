import { CheckCircle2, MinusCircle } from "lucide-react"
import type { Feature } from "@/lib/configurator-data"
import { cn } from "@/lib/utils"

export function SetupList({
  features,
  selected,
  activeCount,
}: {
  features: Feature[]
  selected: Record<string, boolean>
  activeCount: number
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Jouw opstelling:</h2>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">{activeCount} actief</span>
      </div>

      <ul role="list" className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-muted/40">
        {features.map((feature) => {
          const isActive = Boolean(selected[feature.id])
          return (
            <li key={feature.id} className="flex items-center gap-3 px-4 py-3.5">
              {isActive ? (
                <CheckCircle2 aria-hidden className="h-[18px] w-[18px] shrink-0 text-primary" strokeWidth={2} />
              ) : (
                <MinusCircle
                  aria-hidden
                  className="h-[18px] w-[18px] shrink-0 text-muted-foreground/50"
                  strokeWidth={2}
                />
              )}
              <span
                className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground/60")}
              >
                {feature.moduleLabel}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
