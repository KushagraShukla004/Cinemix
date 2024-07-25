import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordian'
import { BaseComponent } from '@/util/types'

export const SimpleAccordion = ({
  title,
  children,
}: { title: string | number } & BaseComponent) => {
  return (
    <Accordion type="multiple">
      <AccordionItem value={title.toString()} defaultChecked>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div className="max-w-full">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
