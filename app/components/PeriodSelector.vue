<script setup lang="ts">
import { ref } from 'vue'
import { formatDateShort } from '~/utils/format'

const { active, allPeriods, switchTo, exportActive } = usePayPeriods()

const open = ref(false)
const emit = defineEmits<{ (e: 'new-period'): void }>()

function pick(payDate: string) {
  switchTo(payDate)
  open.value = false
}
</script>

<template>
  <div class="relative">
    <div class="flex items-stretch gap-2">
      <button
        type="button"
        class="flex-1 min-h-[44px] rounded-lg bg-primary text-white px-4 py-2 text-left"
        @click="open = !open"
      >
        <div class="text-[10px] uppercase tracking-wider text-white/70">Pay period</div>
        <div class="text-sm font-semibold">
          {{ active ? formatDateShort(active.payDate) : '—' }}
          <span class="text-white/60">→</span>
          {{ active ? formatDateShort(active.nextPayDate) : '—' }}
        </div>
      </button>
      <button
        type="button"
        class="min-h-[44px] min-w-[44px] rounded-lg bg-primary text-white text-xl font-bold"
        aria-label="New pay period"
        @click="emit('new-period')"
      >
        +
      </button>
      <button
        type="button"
        class="min-h-[44px] min-w-[44px] rounded-lg bg-secondary text-slate-700 text-base"
        aria-label="Export JSON"
        @click="exportActive"
      >
        ⤓
      </button>
    </div>

    <div
      v-if="open"
      class="absolute z-30 mt-2 w-full rounded-lg border border-secondary bg-white shadow-lg overflow-hidden"
    >
      <button
        v-for="p in allPeriods"
        :key="p.payDate"
        type="button"
        class="w-full text-left px-4 py-3 min-h-[44px] hover:bg-secondary/30 flex justify-between items-center"
        :class="active && p.payDate === active.payDate ? 'bg-fourth/50 text-slate-700 font-semibold' : ''"
        @click="pick(p.payDate)"
      >
        <span>{{ formatDateShort(p.payDate) }}</span>
        <span class="text-xs text-slate-400">→ {{ formatDateShort(p.nextPayDate) }}</span>
      </button>
    </div>
  </div>
</template>
