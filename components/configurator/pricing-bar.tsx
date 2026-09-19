import type { Feature } from "@/lib/configurator-data"
import { formatCurrency } from "@/lib/configurator-data"

export function PricingBar({
  selectedFeatures,
  opstartTotal,
  maandTotal,
}: {
  selectedFeatures: Feature[]
  opstartTotal: number
  maandTotal: number
}) {
  return (
    <div className="flex shrink-0 flex-col gap-3 border-t border-border bg-muted px-[18px] py-4">
      {selectedFeatures.length > 0 && (
        <ul role="list" className="flex flex-wrap gap-1.5">
          {selectedFeatures.map((feature) => (
            <li
              key={feature.id}
              className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-primary"
            >
              {feature.label}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Opstartkosten: {formatCurrency(opstartTotal)}</span>
          <span className="text-lg font-bold text-foreground">Maandelijks: {formatCurrency(maandTotal)}</span>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Pakket Aanvragen
        </button>
      </div>
    </div>
  )
}
