"use client"

import { BottomNav } from '@components/BottomNav'
import { Header } from '@components/Header'
import { WalletCard } from '@components/WalletCard'
import { useAppStore } from '@store/store'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function WalletsPage() {
  const wallets = useAppStore((s) => s.wallets)
  const deleteWallet = useAppStore((s) => s.deleteWallet)

  return (
    <div className="pb-24">
      <Header title="V?" />
      <div className="p-4 space-y-3">
        {wallets.map((w) => (
          <div key={w.id} className="relative">
            <WalletCard wallet={w} />
            <button onClick={() => deleteWallet(w.id)} className="absolute top-2 right-2 p-2 rounded-full bg-white/90">
              <TrashIcon className="h-5 w-5 text-red-600" />
            </button>
          </div>
        ))}
        {wallets.length === 0 && (
          <div className="text-sm text-gray-500 py-8 text-center">Ch?a c? v? n?o.</div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
