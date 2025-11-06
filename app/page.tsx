"use client"

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { BottomNav } from '@components/BottomNav'
import { WalletCard } from '@components/WalletCard'
import { TransactionItem } from '@components/TransactionItem'
import { AddTransactionSheet } from '@components/AddTransactionSheet'
import { AddWalletSheet } from '@components/AddWalletSheet'
import { useAppStore } from '@store/store'
import { formatCurrencyVND } from '@utils/format'

export default function HomePage() {
  const wallets = useAppStore((s) => s.wallets)
  const transactions = useAppStore((s) => s.transactions)

  const totalBalance = useMemo(() => wallets.reduce((sum, w) => sum + w.balance, 0), [wallets])

  const [showAddTx, setShowAddTx] = useState(false)
  const [showAddWallet, setShowAddWallet] = useState(false)

  return (
    <div className="pb-24">
      <div className="px-4 pt-4 pb-3 border-b bg-white sticky top-0 z-10">
        <div className="text-sm text-gray-600">T?ng s? d?</div>
        <div className="text-3xl font-bold mt-1">{formatCurrencyVND(totalBalance)}</div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => setShowAddTx(true)} className="flex-1 bg-primary text-white rounded-lg py-2.5 font-medium">Th?m giao d?ch</button>
          <button onClick={() => setShowAddWallet(true)} className="flex-1 bg-gray-900 text-white rounded-lg py-2.5 font-medium">T?o v?</button>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">V? c?a b?n</div>
          <Link href="/wallets" className="text-primary text-sm">Xem t?t c?</Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {wallets.map((w) => (
            <WalletCard key={w.id} wallet={w} />
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="font-semibold mb-2">Giao d?ch g?n ??y</div>
        <div className="divide-y">
          {transactions.slice(0, 10).map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
          {transactions.length === 0 && (
            <div className="text-sm text-gray-500 py-8 text-center">Ch?a c? giao d?ch. H?y th?m giao d?ch ??u ti?n!</div>
          )}
        </div>
      </div>

      {showAddTx && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-end" onClick={() => setShowAddTx(false)}>
          <div className="bg-white w-full rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 w-10 bg-gray-300 rounded mx-auto mb-3"/>
            <div className="font-semibold mb-3 text-center">Th?m giao d?ch</div>
            <AddTransactionSheet onDone={() => setShowAddTx(false)} />
          </div>
        </div>
      )}

      {showAddWallet && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-end" onClick={() => setShowAddWallet(false)}>
          <div className="bg-white w-full rounded-t-2xl p-4" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 w-10 bg-gray-300 rounded mx-auto mb-3"/>
            <div className="font-semibold mb-3 text-center">T?o v?</div>
            <AddWalletSheet onDone={() => setShowAddWallet(false)} />
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}
