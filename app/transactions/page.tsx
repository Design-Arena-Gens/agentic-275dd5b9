"use client"

import { BottomNav } from '@components/BottomNav'
import { Header } from '@components/Header'
import { FiltersBar, Filters } from '@components/FiltersBar'
import { TransactionItem } from '@components/TransactionItem'
import { useAppStore } from '@store/store'
import { useEffect, useMemo, useState } from 'react'

export default function TransactionsPage() {
  const categories = useAppStore((s) => s.categories)
  const getTxs = useAppStore((s) => s.getTransactionsByFilter)
  const [filters, setFilters] = useState<Filters>({})

  const txs = useMemo(() => getTxs(filters), [filters, getTxs])

  useEffect(() => {
    // default filter: today
    setFilters((f) => ({ day: f.day ?? new Date().toISOString().slice(0, 10), type: f.type ?? 'chi ti?u' }))
  }, [])

  return (
    <div className="pb-24">
      <Header title="Giao d?ch" />
      <div className="p-4">
        <FiltersBar categories={categories} onChange={setFilters} />
        <div className="mt-4 divide-y">
          {txs.map((tx) => (
            <TransactionItem key={tx.id} tx={tx} />
          ))}
          {txs.length === 0 && (
            <div className="text-sm text-gray-500 py-8 text-center">Kh?ng c? giao d?ch ph? h?p.</div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
