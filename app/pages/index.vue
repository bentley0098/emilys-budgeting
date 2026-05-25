<script setup lang="ts">
import { ref } from 'vue'

const { active } = usePayPeriods()
const showNewPeriod = ref(false)

const quickLinks = [
  { to: '/spending', label: 'Spending', icon: '🛒', color: 'bg-violet-100 text-violet-800' },
  { to: '/bills', label: 'Bills', icon: '📄', color: 'bg-amber-100 text-amber-800' },
  { to: '/subscriptions', label: 'Subscriptions', icon: '🔁', color: 'bg-sky-100 text-sky-800' },
  { to: '/savings', label: 'Savings', icon: '🐖', color: 'bg-emerald-100 text-emerald-800' },
  { to: '/debt', label: 'Debt', icon: '💳', color: 'bg-rose-100 text-rose-800' },
]
</script>

<template>
  <div class="space-y-4">
    <PeriodSelector @new-period="showNewPeriod = true" />

    <template v-if="active">
      <InAccountField />
      <SummaryStrip />
      <FixedExpensesStrip />
      <ExpenseBreakdownChart />

      <div>
        <div class="text-xs uppercase tracking-wider text-slate-500 mb-2">Quick nav</div>
        <div class="grid grid-cols-3 gap-2">
          <NuxtLink
            v-for="l in quickLinks"
            :key="l.to"
            :to="l.to"
            class="rounded-xl p-3 text-center min-h-[72px] flex flex-col items-center justify-center"
            :class="l.color"
          >
            <div class="text-xl">{{ l.icon }}</div>
            <div class="text-[11px] font-medium mt-1">{{ l.label }}</div>
          </NuxtLink>
        </div>
      </div>
    </template>

    <div v-else class="text-center text-slate-500 py-12">Loading…</div>

    <NewPeriodModal :open="showNewPeriod" @close="showNewPeriod = false" />
  </div>
</template>
