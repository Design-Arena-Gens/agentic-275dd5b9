"use client"

import dayjs from 'dayjs'
import { formatCurrencyVND } from '@utils/format'
import { useAppStore } from '@store/store'
import { Transaction } from '@store/types'

export function TransactionItem({ tx }: { tx: Transaction }) {
  const category = useAppStore((s) => s.categories.find((c) => c.id === tx.categoryId))
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="font-medium">{category?.name ?? 'Danh m?c'}</div>
        <div className="text-xs text-gray-500">{dayjs(tx.date).format('HH:mm DD/MM')}</div>
      </div>
      <div className={`font-semibold ${tx.type === 'chi ti?u' ? 'text-red-600' : 'text-emerald-600'}`}>
        {tx.type === 'chi ti?u' ? '-' : '+'}{formatCurrencyVND(Math.abs(tx.amount))}
      </div>
    </div>
  )
}
