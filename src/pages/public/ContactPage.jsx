import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { SITE } from '../../lib/config'
import { createContact } from '../../lib/supabaseApi'
import { Seo } from '../../components/Seo'
import { PageHeader } from '../../components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!name || !validEmail || message.length < 8) {
      toast(t('contact.invalid'), 'danger')
      return
    }

    const result = await createContact({ name, email, message })
    if (!result.ok) {
      toast(t('common.error'), 'danger')
      return
    }
    setForm({ name: '', email: '', message: '' })
    toast(t('contact.sent'), 'success')
  }

  return (
    <div className="page-shell max-w-5xl">
      <Seo title={t('seo.contact')} description={t('contact.title')} />
      <PageHeader kicker={t('contact.kicker')} title={t('contact.title')} />
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="text-xl font-semibold">{t('contact.details')}</h2>
          <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>{SITE.email}</li>
            <li>{SITE.phone}</li>
            <li>{SITE.address}</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="contact-name">{t('contact.name')}</Label>
            <Input id="contact-name" name="name" value={form.name} onChange={handleChange} className="h-11" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">{t('auth.email')}</Label>
            <Input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} className="h-11" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">{t('contact.message')}</Label>
            <Textarea id="contact-message" name="message" value={form.message} onChange={handleChange} className="min-h-36" required />
          </div>
          <Button type="submit" size="lg">{t('common.send')}</Button>
        </form>
      </div>
    </div>
  )
}
