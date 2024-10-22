'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react'
import React from 'react'

interface ItemProps {
  id?: Id<'documents'>
  label: string
  level?: number
  expanded?: boolean
  icon?: LucideIcon
  onExpand?: () => void
  onClick?: () => void
  active?: boolean
  documentIcon?: string
}

export const Item = ({
  label,
  id,
  level,
  onExpand,
  expanded,
  onClick,
  active,
  documentIcon,
  icon: Icon,
}: ItemProps) => {
  const { user } = useUser()
  const createDocument = useMutation(api.document.createDocument)

  const onCreateDocument = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    if (!id) return

    createDocument({ title: 'Untitled', parentDocument: id }).then(
      (document) => {
        if (!expanded) {
          onExpand?.()
        }
      }
    )
  }

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation()
    onExpand?.()
  }

  const ChevronIcon = expanded ? ChevronDown : ChevronRight

  return (
    <div
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary'
      )}
      onClick={onClick}
    >
      {!!id && (
        <div
          title="Back"
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        Icon && (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )
      )}
      <span className="truncate">{label}</span>
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
              <div
                title="More"
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by{' '}
                <span className="font-medium">{user?.fullName}</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            onClick={onCreateDocument}
            role="button"
            title="Add"
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-x-2 py-[3px]"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  )
}
