export function PageHeader({ kicker, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl min-w-0">
        {kicker ? <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{kicker}</p> : null}
        <h1 className="mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground sm:mt-3 sm:text-4xl md:text-[2.75rem] md:leading-tight">{title}</h1>
        {description ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base md:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function SectionHeader({ title, subtitle, action, center = false }) {
  return (
    <div className={`mb-8 sm:mb-12 md:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? '' : 'max-w-2xl min-w-0'}>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-5xl md:leading-tight">{title}</h2>
        {subtitle ? <h3 className="mt-2 text-base font-normal leading-snug text-muted-foreground sm:mt-3 sm:text-lg md:text-xl">{subtitle}</h3> : null}
      </div>
      {action && !center ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
