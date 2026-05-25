export interface NamedEntry {
  id: string
  name: string
  dueDate: string
  budgeted: number
  actual: number
  checked: boolean
}

export type Bill = NamedEntry
export type Subscription = NamedEntry
export type Saving = NamedEntry
export type Debt = NamedEntry

export interface SpendingEntry {
  id: string
  date: string
  expense: string
  category: string
  cost: number
  checked: boolean
}

export interface SpendingCategory {
  id: string
  name: string
  budgeted: number
  checked: boolean
}

export interface PayPeriod {
  payDate: string
  nextPayDate: string
  inAccount: number
  spendingEntries: SpendingEntry[]
  spendingCategories: SpendingCategory[]
  bills: Bill[]
  subscriptions: Subscription[]
  savings: Saving[]
  debts: Debt[]
}

export type EntryKind = 'bills' | 'subscriptions' | 'savings' | 'debts'
