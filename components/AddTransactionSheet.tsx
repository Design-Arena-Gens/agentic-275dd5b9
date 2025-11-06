"use client"

import { useState } from 'react'
import { useAppStore } from '@store/store'
import { TransactionType } from '@store/types'

export function AddTransactionSheet({ onDone }: { onDone?: () => void }) {
  const wallets = useAppStore((s) => s.wallets)
  const categories = useAppStore((s) => s.categories)
  const addTransaction = useAppStore((s) => s.addTransaction)

  const [walletId, setWalletId] = useState(wallets[0]?.id ?? '')
  const [type, setType] = useState<TransactionType>('chi ti?u')
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletId || !categoryId || !amount) return
    addTransaction({ walletId, categoryId, type, amount: Number(amount), description })
    onDone?.()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <button type="button" className={`rounded-lg py-2 border ${type === 'chi ti?u' ? 'bg-red-50 border-red-300 text-red-700' : 'border-gray-300'}`} onClick={() => setType('chi ti?u')}>Chi ti?u</button>
        <button type="button" className={`rounded-lg py-2 border ${type === 'thu nh?p' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-gray-300'}`} onClick={() => setType('thu nh?p')}>Thu nh?p</button>
      </div>

      <div>
        <label className="block text-sm mb-1">V?</label>
        <select value={walletId} onChange={(e) => setWalletId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
          {wallets.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">Danh m?c</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border rounded-lg px-3 py-2">
          {categories.filter(c => c.type === type).map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm mb-1">S? ti?n</label>
        <input inputMode="numeric" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" placeholder="0" />
      </div>

      <div>
        <label className="block text-sm mb-1">M? t? (tu? ch?n)</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-lg px-3 py-2" placeholder="V? d?: C? ph?" />
      </div>

      <button type="submit" className="w-full bg-primary text-white rounded-lg py-2.5 font-medium">L?u giao d?ch</button>
    </form>
  )
}
