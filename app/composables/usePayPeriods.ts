import { computed, watch } from 'vue'
import type { PayPeriod } from '~/utils/types'
import { addMonthsISO, todayISO } from '~/utils/format'
import { listPeriodKeys, readPeriod, removePeriod, writePeriod } from '~/utils/storage'

interface BudgetState {
  activePayDate: string
  periods: Record<string, PayPeriod>
  initialized: boolean
}

function emptyPeriod(payDate: string, nextPayDate: string, inAccount = 0): PayPeriod {
  return {
    payDate,
    nextPayDate,
    inAccount,
    spendingEntries: [],
    spendingCategories: [],
    bills: [],
    subscriptions: [],
    savings: [],
    debts: [],
  }
}

export function usePayPeriods() {
  const state = useState<BudgetState>('budget', () => ({
    activePayDate: '',
    periods: {},
    initialized: false,
  }))

  function init() {
    if (state.value.initialized) return
    const keys = listPeriodKeys()
    const loaded: Record<string, PayPeriod> = {}
    for (const k of keys) {
      const p = readPeriod(k)
      if (p) loaded[k] = p
    }
    if (Object.keys(loaded).length === 0) {
      const today = todayISO()
      const next = addMonthsISO(today, 1)
      const fresh = emptyPeriod(today, next)
      loaded[today] = fresh
      writePeriod(fresh)
      state.value.activePayDate = today
    } else {
      const sorted = Object.keys(loaded).sort((a, b) => (a < b ? 1 : -1))
      state.value.activePayDate = sorted[0]!
    }
    state.value.periods = loaded
    state.value.initialized = true

    watch(
      () => state.value.periods,
      (periods) => {
        const active = periods[state.value.activePayDate]
        if (active) writePeriod(active)
      },
      { deep: true }
    )
  }

  const active = computed<PayPeriod | null>(() => state.value.periods[state.value.activePayDate] ?? null)

  const allPeriods = computed<PayPeriod[]>(() =>
    Object.values(state.value.periods).sort((a, b) => (a.payDate < b.payDate ? 1 : -1))
  )

  function switchTo(payDate: string) {
    if (state.value.periods[payDate]) {
      state.value.activePayDate = payDate
    }
  }

  function createPeriod(opts: { payDate: string; nextPayDate: string; inAccount?: number }) {
    const period = emptyPeriod(opts.payDate, opts.nextPayDate, opts.inAccount ?? 0)
    state.value.periods[opts.payDate] = period
    writePeriod(period)
    state.value.activePayDate = opts.payDate
  }

  function deletePeriod(payDate: string) {
    if (!state.value.periods[payDate]) return
    delete state.value.periods[payDate]
    removePeriod(payDate)
    if (state.value.activePayDate === payDate) {
      const remaining = Object.keys(state.value.periods).sort((a, b) => (a < b ? 1 : -1))
      if (remaining.length) {
        state.value.activePayDate = remaining[0]!
      } else {
        const today = todayISO()
        const next = addMonthsISO(today, 1)
        const fresh = emptyPeriod(today, next)
        state.value.periods[today] = fresh
        writePeriod(fresh)
        state.value.activePayDate = today
      }
    }
  }

  function exportActive() {
    if (!active.value) return
    const json = JSON.stringify(active.value, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget-${active.value.payDate}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return {
    state,
    active,
    allPeriods,
    init,
    switchTo,
    createPeriod,
    deletePeriod,
    exportActive,
  }
}
