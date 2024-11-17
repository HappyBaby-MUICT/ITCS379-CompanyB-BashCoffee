import { CaretDown } from '@phosphor-icons/react'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/modules/ui/accordion'

interface SimpleCollaspeProps {
  open?: boolean
  children: React.ReactNode
  className?: string
}

interface SimpleCollaspeWithToggleProps {
  children: React.ReactNode
  title: string
}

export function SimpleCollaspeWithToggle(props: SimpleCollaspeWithToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="hover:bg-accent/30 rounded-lg border transition-all">
      <div
        className="fi group cursor-pointer gap-2 p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-medium">{props.title}</p>
        <div className="ml-auto">
          <CaretDown className={isOpen ? 'rotate-180 transform' : ''} />
        </div>
      </div>
      <SimpleCollaspe open={isOpen}>
        <div className="mt-3 p-3 pt-0">{props.children}</div>
      </SimpleCollaspe>
    </div>
  )
}

export function SimpleCollaspe(props: SimpleCollaspeProps) {
  return (
    <Accordion
      type="single"
      value={props.open ? 'item' : undefined}
      collapsible
      className={props.className}
    >
      <AccordionItem value="item" className="border-0 w-full">
        <AccordionContent>{props.children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
