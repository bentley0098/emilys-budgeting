<script setup lang="ts">
import IconsHome from '~/components/icons/Home.vue'
import IconsSpend from '~/components/icons/Spend.vue'
import IconsBills from '~/components/icons/Bills.vue'
import IconsSubscriptions from '~/components/icons/Subscriptions.vue'
import IconsSavings from '~/components/icons/Savings.vue'
import IconsDebt from '~/components/icons/Debt.vue'

const links = [
  { to: '/', label: 'Home', icon: IconsHome },
  { to: '/spending', label: 'Spend', icon: IconsSpend },
  { to: '/bills', label: 'Bills', icon: IconsBills },
  { to: '/subscriptions', label: 'Subs', icon: IconsSubscriptions },
  { to: '/savings', label: 'Save', icon: IconsSavings },
  { to: '/debt', label: 'Debt', icon: IconsDebt },
]
</script>

<template>
  <nav
    class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-secondary z-40"
    style="padding-bottom: env(safe-area-inset-bottom);"
  >
    <ul class="grid grid-cols-6">
      <li v-for="l in links" :key="l.to">
        <NuxtLink
          :to="l.to"
          class="flex flex-col items-center justify-center min-h-[56px] text-[10px] font-medium text-slate-500"
          active-class="text-primary"
          exact-active-class="text-primary"
        >
          <component :is="l.icon" class="w-5 h-5" />
          <span class="mt-0.5">{{ l.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
