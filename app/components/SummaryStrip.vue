<script setup lang="ts">
import { formatEUR } from '~/utils/format'

const { spending, leftToBudget, leftToSpend } = usePeriodTotals()
</script>

<template>
  <div class="grid grid-cols-3 gap-2">
    <div class="rounded-xl bg-slate-100 p-3 text-center">
      <div class="text-[10px] uppercase tracking-wider text-slate-500">Spending</div>
      <div class="text-sm font-semibold mt-1 text-slate-800">{{ formatEUR(spending) }}</div>
    </div>
    <div class="rounded-xl bg-slate-100 p-3 text-center">
      <div class="text-[10px] uppercase tracking-wider text-slate-500">Left to budget</div>
      <div class="text-sm font-semibold mt-1 text-slate-800">{{ formatEUR(leftToBudget) }}</div>
    </div>
    <div class="rounded-xl bg-slate-100 p-3 text-center">
      <div class="text-[10px] uppercase tracking-wider text-slate-500">Left to spend</div>
      <div
        class="text-sm font-semibold mt-1"
        :class="leftToSpend >= 0 ? 'text-emerald-600' : 'text-rose-600'"
      >
        {{ formatEUR(leftToSpend) }}
      </div>
    </div>
  </div>
</template>
