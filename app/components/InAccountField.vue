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
  <div class="rounded-2xl bg-emerald-600 text-white p-5 text-center">
    <div class="text-xs uppercase tracking-wider opacity-80">In account</div>
    <div class="mt-2 flex items-center justify-center gap-1">
      <span class="text-2xl font-semibold opacity-80">€</span>
      <input
        v-model.number="value"
        type="number"
        step="0.01"
        inputmode="decimal"
        class="w-40 bg-transparent text-4xl font-bold text-center outline-none placeholder:text-white/60"
      />
    </div>
    <div class="mt-1 text-xs opacity-70">{{ formatEUR(value) }}</div>
  </div>
</template>
