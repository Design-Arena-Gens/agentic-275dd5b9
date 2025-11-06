"use client"

import { BottomNav } from '@components/BottomNav'
import { Header } from '@components/Header'
import { useAppStore } from '@store/store'
import { useState } from 'react'

export default function CategoriesPage() {
  const categories = useAppStore((s) => s.categories)
  const addCategory = useAppStore((s) => s.addCategory)
  const deleteCategory = useAppStore((s) => s.deleteCategory)

  const [name, setName] = useState('')
  const [type, setType] = useState<'chi ti?u' | 'thu nh?p'>('chi ti?u')

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    addCategory({ name: name.trim(), type })
    setName('')
  }

  return (
    <div className="pb-24">
      <Header title="Danh m?c" />
      <div className="p-4">
        <form onSubmit={onAdd} className="grid grid-cols-4 gap-2">
          <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded-lg px-2 py-2 col-span-2" placeholder="T?n danh m?c" />
          <select value={type} onChange={(e) => setType(e.target.value as any)} className="border rounded-lg px-2 py-2">
            <option value="chi ti?u">Chi ti?u</option>
            <option value="thu nh?p">Thu nh?p</option>
          </select>
          <button type="submit" className="bg-primary text-white rounded-lg">Th?m</button>
        </form>

        <div className="mt-4">
          <div className="font-semibold mb-2">Chi ti?u</div>
          <div className="space-y-2">
            {categories.filter(c => c.type === 'chi ti?u').map((c) => (
              <div key={c.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                <div>{c.name}</div>
                <button onClick={() => deleteCategory(c.id)} className="text-red-600 text-sm">Xo?</button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="font-semibold mb-2">Thu nh?p</div>
          <div className="space-y-2">
            {categories.filter(c => c.type === 'thu nh?p').map((c) => (
              <div key={c.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                <div>{c.name}</div>
                <button onClick={() => deleteCategory(c.id)} className="text-red-600 text-sm">Xo?</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
