import { computed } from 'vue'

export function usePeriodTotals() {
  const { active } = usePayPeriods()

  const sum = (arr: { actual: number }[]) => arr.reduce((t, e) => t + (Number(e.actual) || 0), 0)

  const spending = computed(() =>
    (active.value?.spendingEntries ?? []).reduce((t, e) => t + (Number(e.cost) || 0), 0)
  )
  const bills = computed(() => sum(active.value?.bills ?? []))
  const subscriptions = computed(() => sum(active.value?.subscriptions ?? []))
  const savings = computed(() => sum(active.value?.savings ?? []))
  const debts = computed(() => sum(active.value?.debts ?? []))

  const fixedTotal = computed(() => bills.value + subscriptions.value + savings.value + debts.value)
  const inAccount = computed(() => Number(active.value?.inAccount) || 0)
  const leftToBudget = computed(() => inAccount.value - fixedTotal.value)
  const leftToSpend = computed(() => leftToBudget.value - spending.value)

  function categoryActual(name: string): number {
    if (!active.value) return 0
    return active.value.spendingEntries
      .filter((e) => e.category === name)
      .reduce((t, e) => t + (Number(e.cost) || 0), 0)
  }

  const breakdown = computed<{ label: string; value: number }[]>(() => {
    const out: { label: string; value: number }[] = []
    for (const cat of active.value?.spendingCategories ?? []) {
      const v = categoryActual(cat.name)
      if (v > 0) out.push({ label: cat.name, value: v })
    }
    const uncategorised = (active.value?.spendingEntries ?? [])
      .filter((e) => !(active.value?.spendingCategories ?? []).some((c) => c.name === e.category))
      .reduce((t, e) => t + (Number(e.cost) || 0), 0)
    if (uncategorised > 0) out.push({ label: 'Uncategorised', value: uncategorised })
    if (bills.value > 0) out.push({ label: 'Bills', value: bills.value })
    if (subscriptions.value > 0) out.push({ label: 'Subscriptions', value: subscriptions.value })
    if (savings.value > 0) out.push({ label: 'Savings', value: savings.value })
    if (debts.value > 0) out.push({ label: 'Debt', value: debts.value })
    return out
  })

  return {
    spending,
    bills,
    subscriptions,
    savings,
    debts,
    fixedTotal,
    inAccount,
    leftToBudget,
    leftToSpend,
    categoryActual,
    breakdown,
  }
}
