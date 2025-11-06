"use client"

import { useState } from 'react'
import { useAppStore } from '@store/store'

export function AddWalletSheet({ onDone }: { onDone?: () => void }) {
  const addWallet = useAppStore((s) => s.addWallet)
  const [name, setName] = useState('V? m?i')
  const [type, setType] = useState<'ti?n m?t' | 'ng?n h?ng' | 'v? ?i?n t?'>('ti?n m?t')
  const [balance, setBalance] = useState(0)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addWallet({ name, type, balance: Number(balance) })
    onDone?.()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm mb-1">T?n v?</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Lo?i v?</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2">
          <option value="ti?n m?t">Ti?n m?t</option>
          <option value="ng?n h?ng">Ng?n h?ng</option>
          <option value="v? ?i?n t?">V? ?i?n t?</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">S? d? ban ??u</label>
        <input inputMode="numeric" value={balance} onChange={(e) => setBalance(Number(e.target.value))} className="w-full border rounded-lg px-3 py-2" placeholder="0" />
      </div>
      <button type="submit" className="w-full bg-primary text-white rounded-lg py-2.5 font-medium">T?o v?</button>
    </form>
  )
}
