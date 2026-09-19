export function StatusBar() {
  return (
    <div aria-hidden className="flex h-[34px] shrink-0 items-center justify-between px-[22px]">
      <span className="text-[11px] text-foreground">9:41</span>
      <img src="/figma/systeemstatus.svg" alt="" className="h-[13px] w-[53px]" />
    </div>
  )
}
