"use client"

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import { HomeIcon, WalletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

const items: { href: Route; label: string; icon: any }[] = [
  { href: '/', label: 'T?ng quan', icon: HomeIcon },
  { href: '/wallets', label: 'V?', icon: WalletIcon },
  { href: '/transactions', label: 'Giao d?ch', icon: Squares2X2Icon },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t" style={{ paddingBottom: 'var(--safe-bottom)' }}>
      <div className="container-mobile grid grid-cols-3">
        {items.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} className="flex flex-col items-center py-2.5">
              <Icon className={`h-6 w-6 ${active ? 'text-primary' : 'text-gray-500'}`} />
              <span className={`text-xs ${active ? 'text-primary' : 'text-gray-600'}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
