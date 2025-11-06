"use client"

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { nanoid } from '../utils/nanoid'
import dayjs from 'dayjs'
import { eventBus } from './eventBus'
import type { Wallet, Category, Transaction, TransactionType } from './types'

interface AppState {
  userId: string
  wallets: Wallet[]
  categories: Category[]
  transactions: Transaction[]

  // wallet ops
  addWallet: (input: Omit<Wallet, 'id' | 'userId'>) => Wallet
  updateWallet: (id: string, changes: Partial<Omit<Wallet, 'id' | 'userId'>>) => void
  deleteWallet: (id: string) => void

  // category ops
  addCategory: (input: Omit<Category, 'id'>) => Category
  updateCategory: (id: string, changes: Partial<Omit<Category, 'id'>>) => void
  deleteCategory: (id: string) => void

  // transaction ops (atomic update of wallet balance)
  addTransaction: (input: Omit<Transaction, 'id' | 'date'> & { date?: string }) => Transaction
  deleteTransaction: (id: string) => void

  // selectors/helpers
  getWalletBalance: (walletId: string) => number
  getTransactionsByFilter: (opts: {
    day?: string // YYYY-MM-DD
    categoryId?: string
    type?: TransactionType
  }) => Transaction[]
}

const initialCategories: Category[] = [
  { id: 'cat_food', name: '?n u?ng', type: 'chi ti?u' },
  { id: 'cat_transport', name: 'Di chuy?n', type: 'chi ti?u' },
  { id: 'cat_salary', name: 'L??ng', type: 'thu nh?p' },
]

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      immer((set, get) => ({
        userId: 'user_demo',
        wallets: [
          { id: 'w_default', userId: 'user_demo', name: 'V? ch?nh', balance: 500000, type: 'ti?n m?t' },
        ],
        categories: initialCategories,
        transactions: [],

        addWallet: (input) => {
          const wallet: Wallet = { id: nanoid(), userId: get().userId, ...input }
          set((s) => {
            s.wallets.push(wallet)
          })
          return wallet
        },

        updateWallet: (id, changes) => {
          set((s) => {
            const w = s.wallets.find((x) => x.id === id)
            if (w) Object.assign(w, changes)
          })
        },

        deleteWallet: (id) => {
          set((s) => {
            s.wallets = s.wallets.filter((w) => w.id !== id)
            s.transactions = s.transactions.filter((t) => t.walletId !== id)
          })
        },

        addCategory: (input) => {
          const category: Category = { id: nanoid(), ...input }
          set((s) => {
            s.categories.push(category)
          })
          return category
        },

        updateCategory: (id, changes) => {
          set((s) => {
            const c = s.categories.find((x) => x.id === id)
            if (c) Object.assign(c, changes)
          })
        },

        deleteCategory: (id) => {
          set((s) => {
            s.categories = s.categories.filter((c) => c.id !== id && c.parentId !== id)
          })
        },

        addTransaction: (input) => {
          const tx: Transaction = {
            id: nanoid(),
            date: input.date ?? dayjs().toISOString(),
            ...input,
          }
          set((s) => {
            s.transactions.unshift(tx)
            const w = s.wallets.find((x) => x.id === tx.walletId)
            if (!w) return
            if (tx.type === 'chi ti?u') w.balance -= Math.abs(tx.amount)
            else w.balance += Math.abs(tx.amount)
          })
          // simulate events
          const bal = get().getWalletBalance(tx.walletId)
          eventBus.emit('wallet_updated', { walletId: tx.walletId, balance: bal })
          eventBus.emit('transaction_added', { transactionId: tx.id, walletId: tx.walletId })
          return tx
        },

        deleteTransaction: (id) => {
          set((s) => {
            const idx = s.transactions.findIndex((t) => t.id === id)
            if (idx >= 0) {
              const tx = s.transactions[idx]
              const w = s.wallets.find((x) => x.id === tx.walletId)
              if (w) {
                if (tx.type === 'chi ti?u') w.balance += Math.abs(tx.amount)
                else w.balance -= Math.abs(tx.amount)
                eventBus.emit('wallet_updated', { walletId: w.id, balance: w.balance })
              }
              s.transactions.splice(idx, 1)
            }
          })
        },

        getWalletBalance: (walletId) => {
          const w = get().wallets.find((x) => x.id === walletId)
          return w?.balance ?? 0
        },

        getTransactionsByFilter: (opts) => {
          const { day, categoryId, type } = opts
          return get().transactions.filter((t) => {
            if (day && !dayjs(t.date).isSame(day, 'day')) return false
            if (categoryId && t.categoryId !== categoryId) return false
            if (type && t.type !== type) return false
            return true
          })
        },
      })),
      { name: 'pfm-mobile-vn' }
    )
  )
)
