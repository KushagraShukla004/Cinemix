import { MapPin } from 'lucide-react'

export interface IBrandIconProps {
  className?: string
  animate?: boolean
  shadow?: boolean
  height?: number
  width?: number
}

export const BrandIcon = ({
  className,
  animate = false,
  shadow = false,
  width = 26,
  height = 26,
}: IBrandIconProps) => {
  return (
    <div style={{ perspective: '30px' }}>
      <MapPin
        className={`${className}`}
        width={width}
        height={height}
        color="red"
      />
    </div>
  )
}
