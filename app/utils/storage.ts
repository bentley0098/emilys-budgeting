import type { PayPeriod } from './types'

const INDEX_KEY = 'budget:periods'
const periodKey = (payDate: string) => `budget:period:${payDate}`

export function listPeriodKeys(): string[] {
  const raw = localStorage.getItem(INDEX_KEY)
  if (!raw) return []
  try {
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

function writeIndex(keys: string[]) {
  const sorted = [...new Set(keys)].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
  localStorage.setItem(INDEX_KEY, JSON.stringify(sorted))
}

export function readPeriod(payDate: string): PayPeriod | null {
  const raw = localStorage.getItem(periodKey(payDate))
  if (!raw) return null
  try {
    return JSON.parse(raw) as PayPeriod
  } catch {
    return null
  }
}

export function writePeriod(period: PayPeriod): void {
  localStorage.setItem(periodKey(period.payDate), JSON.stringify(period))
  const keys = listPeriodKeys()
  if (!keys.includes(period.payDate)) {
    keys.push(period.payDate)
    writeIndex(keys)
  }
}

export function removePeriod(payDate: string): void {
  localStorage.removeItem(periodKey(payDate))
  writeIndex(listPeriodKeys().filter((k) => k !== payDate))
}
