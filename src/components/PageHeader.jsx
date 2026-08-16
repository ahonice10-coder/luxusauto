export function PageHeader({ kicker, title, description, action }) {
  return (
    <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {kicker ? <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{kicker}</p> : null}
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground md:text-[2.75rem] md:leading-tight">{title}</h1>
        {description ? <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function SectionHeader({ title, subtitle, action, center = false }) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? 'mx-auto max-w-2xl text-center' : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? '' : 'max-w-2xl'}>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-tight">{title}</h2>
        {subtitle ? <h3 className="mt-3 text-lg font-normal leading-snug text-muted-foreground md:text-xl">{subtitle}</h3> : null}
      </div>
      {action && !center ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
