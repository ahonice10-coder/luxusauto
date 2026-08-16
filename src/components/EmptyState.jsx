import { Card, CardContent } from '@/components/ui/card'

export function EmptyState({ title, hint, action }) {
  return (
    <Card className="border-dashed py-16 text-center shadow-none">
      <CardContent>
        <p className="text-lg font-medium">{title}</p>
        {hint ? <p className="mt-2 text-sm text-muted-foreground">{hint}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </CardContent>
    </Card>
  )
}
