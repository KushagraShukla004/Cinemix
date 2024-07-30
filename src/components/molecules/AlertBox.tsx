import { ReactNode } from 'react'
import { cn } from '@/util/styles'

export interface IAlertBoxProps {
  children: ReactNode
  className?: string
}

export const AlertBox = ({ children, className }: IAlertBoxProps) => {
  return (
    <div
      className={cn(
        'flex items-center rounded-xl justify-center py-12 bg-gray-300/50',
        className,
      )}
    >
      {children}
    </div>
  )
}
