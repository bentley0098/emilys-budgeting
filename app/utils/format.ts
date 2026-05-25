const eurFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatEUR(value: number | null | undefined): string {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : 0
  return eurFormatter.format(n)
}

export function parseEUR(input: string): number {
  if (input == null) return 0
  const cleaned = String(input).replace(/[^0-9.,-]/g, '').replace(/,/g, '.')
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : 0
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export function addMonthsISO(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number]
  const date = new Date(Date.UTC(y, m - 1, d))
  date.setUTCMonth(date.getUTCMonth() + months)
  return date.toISOString().slice(0, 10)
}

export function formatDateShort(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number) as [number, number, number]
  if (!y || !m || !d) return iso
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString('en-IE', { day: '2-digit', month: 'short', year: 'numeric' })
}
