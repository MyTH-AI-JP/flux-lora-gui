"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

// カスタムナビゲーション
const NavigationMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <nav className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
      <div className="container mx-auto">
        {children}
      </div>
    </nav>
  )
}

const NavigationMenuList: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ul className="flex items-center space-x-6">
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
  return cn(
    "text-white hover:text-white/80 px-3 py-2 rounded-md font-medium text-sm transition-colors",
    className
  )
}

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink>
              ホーム
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/mypage" legacyBehavior passHref>
            <NavigationMenuLink>
              マイページ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/lora-management" legacyBehavior passHref>
            <NavigationMenuLink>
              Lora管理
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 