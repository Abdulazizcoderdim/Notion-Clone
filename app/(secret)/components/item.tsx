import { Id } from '@/convex/_generated/dataModel'
import { ChevronLeft } from 'lucide-react'

interface ItemProps {
  id?: Id<'documents'>
  label: string
}

export const Item = ({ label, id }: ItemProps) => {
  return (
    <div
      style={{ paddingLeft: '12px' }}
      className="group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium"
    >
      {!!id && (
        <div role='button' className='h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1'>
          <ChevronLeft className='h-4 w-4 shrink-0 text-muted-foreground' />
        </div>
      )}
      <span className="truncate">{label}</span>
    </div>
  )
}
