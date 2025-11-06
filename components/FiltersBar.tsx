"use client"

import dayjs from 'dayjs'
import { useState } from 'react'

export interface Filters {
  day?: string
  categoryId?: string
  type?: 'chi ti?u' | 'thu nh?p'
}

export function FiltersBar({
  categories,
  onChange,
}: {
  categories: { id: string; name: string; type: 'chi ti?u' | 'thu nh?p' }[]
  onChange: (filters: Filters) => void
}) {
  const [day, setDay] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [categoryId, setCategoryId] = useState<string>('')
  const [type, setType] = useState<Filters['type']>('chi ti?u')

  const apply = () => onChange({ day, categoryId: categoryId || undefined, type })

  return (
    <div className="grid grid-cols-3 gap-2">
      <input type="date" value={day} onChange={(e) => setDay(e.target.value)} className="border rounded-lg px-2 py-2" />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border rounded-lg px-2 py-2">
        <option value="">T?t c? m?c</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select value={type ?? ''} onChange={(e) => setType((e.target.value as any) || undefined)} className="border rounded-lg px-2 py-2">
        <option value="chi ti?u">Chi ti?u</option>
        <option value="thu nh?p">Thu nh?p</option>
      </select>
      <button onClick={apply} className="col-span-3 bg-gray-900 text-white rounded-lg py-2 mt-1">L?c</button>
    </div>
  )
}
