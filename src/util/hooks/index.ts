import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

//Just sets the setOpen() state to false whenever we change the page
export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState)
  const pathname = usePathname()
  const initialPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== initialPathname.current) {
      setOpen(false)
      initialPathname.current = pathname
    }
  }, [pathname, open])

  return [open, setOpen] as const
}
