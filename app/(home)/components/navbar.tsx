'use client'

import { ModeToggle } from '@/components/shared/ModeToggle'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { Logo } from '.'

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const scrolled = useScrolled()

  return (
    <div
      className={cn(
        'z-50 justify-between bg-background fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className="flex items-center gap-x-2">
        {isLoading && <Loader />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button size={'sm'} variant={'ghost'}>
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={'sm'}>Get Notion Free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button asChild variant={'ghost'} size={'sm'}>
              <Link href={'/documents'}>Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}
