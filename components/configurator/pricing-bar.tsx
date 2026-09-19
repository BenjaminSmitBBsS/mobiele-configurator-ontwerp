export function PricingBar() {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-border bg-muted px-[18px] py-5">
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">Opstartkosten: € 50,00</span>
        <span className="text-lg font-bold text-foreground">Maandelijks: € 2,50</span>
      </div>
      <button
        type="button"
        className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Pakket Aanvragen
      </button>
    </div>
  )
}
