<script setup lang="ts">
import { computed } from 'vue'
import { formatEUR } from '~/utils/format'

const { active } = usePayPeriods()

const value = computed({
  get() {
    return active.value ? active.value.inAccount : 0
  },
  set(v: number) {
    if (active.value) active.value.inAccount = Number(v) || 0
  },
})
</script>

<template>
  <div class="rounded-lg bg-primary text-white p-3 text-center">
    <div class="text-xs uppercase tracking-wider opacity-80">Payslip</div>
    <div class="mt-1 flex items-center justify-center gap-1">
      <span class="text-base font-semibold opacity-80">€</span>
      <input
        v-model.number="value"
        type="number"
        step="0.01"
        inputmode="decimal"
        class="w-32 bg-transparent text-2xl font-bold text-center outline-none placeholder:text-white/60"
      />
    </div>
    <div class="mt-0.5 text-xs opacity-70">{{ formatEUR(value) }}</div>
  </div>
</template>
