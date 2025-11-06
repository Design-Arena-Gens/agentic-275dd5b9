"use client"

import { ReactNode } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export function Header({ title, right }: { title: string; right?: ReactNode }) {
  const router = useRouter()
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => router.back()} aria-label="Quay l?i" className="p-1 -ml-1">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <div className="font-semibold text-lg">{title}</div>
        <div className="min-w-[24px] text-right">{right}</div>
      </div>
    </div>
  )
}
