'use client'

import { api } from '@/convex/_generated/api'
import { cn } from '@/lib/utils'
import { useMutation } from 'convex/react'
import { ChevronsLeft, MenuIcon, Plus, Search, Settings } from 'lucide-react'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import DocumentList from './document-list'
import { Item } from './item'
import { UserBox } from './user-box'

const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 770px)')
  const createDocument = useMutation(api.document.createDocument)

  const sidebarRef = useRef<ElementRef<'div'>>(null)
  const navbarRef = useRef<ElementRef<'div'>>(null)

  const [isCollapsed, setIsCollapsed] = useState(isMobile)
  const [isResetting, setIsResetting] = useState(false)
  const isResizing = useRef(false)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      reset()
    }
  }, [isMobile])

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.width = '100%'
      navbarRef.current.style.left = '0'
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const reset = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? '100%' : '240px'
      navbarRef.current.style.width = isMobile ? '0' : 'calc(100% - 240px)'
      navbarRef.current.style.left = isMobile ? '100%' : '240px'
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const handleMoseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()

    isResizing.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizing.current) return

    let newWidth = event.clientX

    if (newWidth < 240) newWidth = 240
    if (newWidth > 400) newWidth = 400

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.left = `${newWidth}px`
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`
    }
  }

  const handleMouseUp = () => {
    isResizing.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const onCreateDocument = () => {
    createDocument({
      title: 'Untitle',
    })
  }

  return (
    <>
      <div
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-50',
          isResetting && 'transition-all ease-in duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          role="button"
          className={cn(
            'h-6 w-6 flex items-center justify-center text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 cursor-pointer opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobile && 'opacity-100'
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div className="">
          <UserBox />
          <Item label="Search" icon={Search} />
          <Item label="Settings" icon={Settings} />
          <Item label="New document" icon={Plus} onClick={onCreateDocument} />
        </div>

        <div className="mt-4">
          <DocumentList />
          <Item onClick={onCreateDocument} icon={Plus} label="Add a page" />
        </div>

        <div
          onMouseDown={handleMoseDown}
          className="absolute right-0 top-0 w-1.5 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition"
        />
      </div>

      <div
        className={cn(
          'absolute top-0 z-50 left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in duration-300',
          isMobile && 'w-full left-0'
        )}
        ref={navbarRef}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={reset}
              className="h-6 w-6 text-muted-foreground"
              role="button"
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
