import { useLanguage } from '../i18n/LanguageContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function FaqAccordion() {
  const { t } = useLanguage()
  const faqs = [1, 2, 3, 4, 5].map((id) => ({
    id,
    question: t(`faq.q${id}`),
    answer: t(`faq.a${id}`),
  }))

  return (
    <Accordion type="single" collapsible className="rounded-xl border bg-card px-3 sm:px-4">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
          <AccordionTrigger className="text-left text-sm sm:text-base">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground sm:text-base">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
