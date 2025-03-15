"use client"

import React, { forwardRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

import { cn } from "@/lib/utils"

// カスタムナビゲーション
const NavigationMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <nav className="relative z-10">
      <div className="flex h-16 items-center px-4 md:px-6">{children}</div>
    </nav>
  )
}

const NavigationMenuList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
      {children}
    </ul>
  )
}

const NavigationMenuItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <li>{children}</li>
}

const NavigationMenuLink: React.FC<React.PropsWithChildren<{className?: string}>> = ({ className, children }) => {
  return <a className={navigationMenuTriggerStyle(className)}>{children}</a>
}

const navigationMenuTriggerStyle = (className?: string) => {
  return `group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${className ?? ''}`
}

export function NavigationMenuDemo() {
  const { t } = useLanguage()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              {t('home')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/mypage" legacyBehavior passHref>
            <NavigationMenuLink>
              {t('myPage')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/lora-management" legacyBehavior passHref>
            <NavigationMenuLink>
              {t('loraManagement')}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 