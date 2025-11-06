"use client"

import { Wallet } from '@store/types'
import { formatCurrencyVND } from '@utils/format'

export function WalletCard({ wallet }: { wallet: Wallet }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-emerald-600 text-white p-4">
      <div className="text-sm opacity-90">{wallet.type}</div>
      <div className="mt-1 font-semibold text-lg">{wallet.name}</div>
      <div className="mt-4 text-2xl font-bold">{formatCurrencyVND(wallet.balance)}</div>
    </div>
  )
}
