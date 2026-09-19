"use client"

import { useMemo, useState } from "react"
import { basisKosten, features } from "@/lib/configurator-data"
import { FeatureRow } from "./feature-row"
import { PricingBar } from "./pricing-bar"
import { SetupList } from "./setup-list"
import { StatusBar } from "./status-bar"

export function ConfiguratorApp() {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(features.map((feature) => [feature.id, feature.defaultSelected])),
  )

  const selectedFeatures = useMemo(() => features.filter((feature) => selected[feature.id]), [selected])
  const activeCount = selectedFeatures.length

  const totals = useMemo(
    () => ({
      opstart: basisKosten.opstart + selectedFeatures.reduce((sum, feature) => sum + feature.opstart, 0),
      maand: basisKosten.maand + selectedFeatures.reduce((sum, feature) => sum + feature.maand, 0),
    }),
    [selectedFeatures],
  )

  function toggleFeature(id: string) {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="relative flex h-[844px] max-h-[100dvh] w-full max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-border bg-card shadow-2xl shadow-black/60">
      <StatusBar />

      <div className="flex-1 overflow-y-auto px-[18px] pb-3 pt-2.5">
        <div className="flex flex-col gap-[15px] pb-6">
          <div className="flex flex-col gap-[7px]">
            <div className="flex items-center gap-[7px]">
              <span aria-hidden className="h-[3px] w-[18px] shrink-0 rounded-full bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Digitale configurator
              </span>
            </div>
            <h1 className="text-balance text-[30px] font-bold leading-[1.15] text-foreground">
              Stel jouw Digitale Basis samen
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Kies wat je nodig hebt, wij regelen de techniek.
            </p>
          </div>

          <ul role="list" className="flex flex-col gap-3">
            {features.map((feature) => (
              <li key={feature.id}>
                <FeatureRow
                  feature={feature}
                  selected={Boolean(selected[feature.id])}
                  onToggle={() => toggleFeature(feature.id)}
                />
              </li>
            ))}
          </ul>

          <SetupList features={features} selected={selected} activeCount={activeCount} />
        </div>
      </div>

      <PricingBar selectedFeatures={selectedFeatures} opstartTotal={totals.opstart} maandTotal={totals.maand} />
    </div>
  )
}
