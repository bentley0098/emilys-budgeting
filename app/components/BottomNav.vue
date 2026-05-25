<script setup lang="ts">
const links = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/spending', label: 'Spend', icon: '🛒' },
  { to: '/bills', label: 'Bills', icon: '📄' },
  { to: '/subscriptions', label: 'Subs', icon: '🔁' },
  { to: '/savings', label: 'Save', icon: '🐖' },
  { to: '/debt', label: 'Debt', icon: '💳' },
]
</script>

<template>
  <nav
    class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-200 z-40"
    style="padding-bottom: env(safe-area-inset-bottom);"
  >
    <ul class="grid grid-cols-6">
      <li v-for="l in links" :key="l.to">
        <NuxtLink
          :to="l.to"
          class="flex flex-col items-center justify-center min-h-[56px] text-[10px] font-medium text-slate-500"
          active-class="text-emerald-600"
          exact-active-class="text-emerald-600"
        >
          <span class="text-lg leading-none">{{ l.icon }}</span>
          <span class="mt-0.5">{{ l.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
