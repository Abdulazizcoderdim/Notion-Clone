import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const TrashBox = () => {
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-4 h-4" />
        <Input
          placeholder="Filter by page title..."
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents in trash
        </p>
      </div>
    </div>
  )
}

export default TrashBox
