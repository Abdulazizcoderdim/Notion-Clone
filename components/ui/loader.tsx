import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

const loaderVariants = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'w-4 h-4',
      sm: 'w-2 h-2',
      lg: 'w-6 h-6',
      xl: 'w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface LoaderProps extends VariantProps<typeof loaderVariants> {}

export const Loader = ({ size }: LoaderProps) => {
  return <Loader2 className={cn(loaderVariants({ size }))} />
}
