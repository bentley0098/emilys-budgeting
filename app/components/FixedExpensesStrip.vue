<script setup lang="ts">
import { formatEUR } from '~/utils/format'

const { spending, bills, subscriptions, savings, debts } = usePeriodTotals()

const tiles = [
  { label: 'Spending', value: spending, color: 'bg-primary text-slate-700' },
  { label: 'Bills', value: bills, color: 'bg-secondary text-slate-700' },
  { label: 'Subs', value: subscriptions, color: 'bg-tertiary text-slate-700' },
  { label: 'Savings', value: savings, color: 'bg-fourth text-slate-700' },
  { label: 'Debt', value: debts, color: 'bg-primary text-slate-700' },
]
</script>

<template>
  <div class="grid grid-cols-5 gap-1.5">
    <div
      v-for="t in tiles"
      :key="t.label"
      class="rounded-lg p-2 text-center"
      :class="t.color"
    >
      <div class="text-[9px] uppercase tracking-wider opacity-70">{{ t.label }}</div>
      <div class="text-xs font-semibold mt-1">{{ formatEUR(t.value.value) }}</div>
    </div>
  </div>
</template>
