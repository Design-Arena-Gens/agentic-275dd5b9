export type WalletType = 'ti?n m?t' | 'ng?n h?ng' | 'v? ?i?n t?'

export interface Wallet {
  id: string
  userId: string
  name: string
  balance: number
  type: WalletType
}

export type CategoryType = 'chi ti?u' | 'thu nh?p'

export interface Category {
  id: string
  name: string
  parentId?: string | null
  iconPath?: string
  type: CategoryType
}

export type TransactionType = 'chi ti?u' | 'thu nh?p'

export interface Transaction {
  id: string
  walletId: string
  amount: number
  categoryId: string
  subCategoryId?: string | null
  type: TransactionType
  date: string // ISO date
  description?: string
  locationEncryptedJson?: string // gi? l?p
}
