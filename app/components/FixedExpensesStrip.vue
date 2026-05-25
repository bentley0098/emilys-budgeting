<script setup lang="ts">
import { formatEUR } from '~/utils/format'

const { bills, subscriptions, savings, debts } = usePeriodTotals()

const tiles = [
  { label: 'Bills', value: bills, color: 'bg-amber-100 text-amber-800' },
  { label: 'Subs', value: subscriptions, color: 'bg-sky-100 text-sky-800' },
  { label: 'Savings', value: savings, color: 'bg-emerald-100 text-emerald-800' },
  { label: 'Debt', value: debts, color: 'bg-rose-100 text-rose-800' },
]
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <div
      v-for="t in tiles"
      :key="t.label"
      class="rounded-xl p-2 text-center"
      :class="t.color"
    >
      <div class="text-[10px] uppercase tracking-wider opacity-70">{{ t.label }}</div>
      <div class="text-xs font-semibold mt-1">{{ formatEUR(t.value.value) }}</div>
    </div>
  </div>
</template>
