<script setup lang="ts">
import { ref } from 'vue'
import IconsSpend from '~/components/icons/Spend.vue'
import IconsBills from '~/components/icons/Bills.vue'
import IconsSubscriptions from '~/components/icons/Subscriptions.vue'
import IconsSavings from '~/components/icons/Savings.vue'
import IconsDebt from '~/components/icons/Debt.vue'

const { active } = usePayPeriods()
const showNewPeriod = ref(false)

const quickLinks = [
  { to: '/spending', label: 'Spending', icon: IconsSpend, color: 'bg-primary text-slate-700' },
  { to: '/bills', label: 'Bills', icon: IconsBills, color: 'bg-secondary text-slate-700' },
  { to: '/subscriptions', label: 'Subscriptions', icon: IconsSubscriptions, color: 'bg-tertiary text-slate-700' },
  { to: '/savings', label: 'Savings', icon: IconsSavings, color: 'bg-fourth text-slate-700' },
  { to: '/debt', label: 'Debt', icon: IconsDebt, color: 'bg-primary text-slate-700' },
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
            class="rounded-lg p-3 text-center min-h-[72px] flex flex-col items-center justify-center"
            :class="l.color"
          >
            <component :is="l.icon" class="w-6 h-6" />
            <div class="text-[11px] font-medium mt-1">{{ l.label }}</div>
          </NuxtLink>
        </div>
      </div>
    </template>

    <div v-else class="text-center text-slate-500 py-12">Loading…</div>

    <NewPeriodModal :open="showNewPeriod" @close="showNewPeriod = false" />
  </div>
</template>
