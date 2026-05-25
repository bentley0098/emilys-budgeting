<script setup lang="ts">
import { computed } from 'vue'
import type { SpendingCategory } from '~/utils/types'
import { formatEUR } from '~/utils/format'

const props = defineProps<{ item: SpendingCategory }>()
const emit = defineEmits<{ (e: 'remove'): void }>()

const { categoryActual } = usePeriodTotals()
const actual = computed(() => categoryActual(props.item.name))
const over = computed(() => actual.value > (Number(props.item.budgeted) || 0))
</script>

<template>
  <tr :class="item.checked ? 'opacity-50' : ''" class="border-b border-secondary last:border-0">
    <td class="w-8 py-2 align-middle text-center">
      <input
        v-model="item.checked"
        type="checkbox"
        class="h-5 w-5 accent-primary"
      />
    </td>
    <td class="py-2 pr-1 align-middle">
      <input
        v-model="item.name"
        type="text"
        placeholder="Category"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-white px-2 text-sm focus:border-secondary focus:bg-white outline-none"
        :class="item.checked ? 'line-through' : ''"
      />
    </td>
    <td class="py-2 pr-1 align-middle w-[80px]">
      <input
        v-model.number="item.budgeted"
        type="number"
        step="0.01"
        inputmode="decimal"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-white px-2 text-sm text-right focus:border-secondary focus:bg-white outline-none"
      />
    </td>
    <td
      class="py-2 pr-1 align-middle w-[80px] text-right text-sm font-medium"
      :class="over ? 'text-primary' : 'text-slate-700'"
    >
      {{ formatEUR(actual) }}
    </td>
    <td class="w-8 py-2 align-middle text-center">
      <button
        type="button"
        class="h-8 w-8 rounded-lg text-slate-400 hover:text-primary"
        aria-label="Delete"
        @click="emit('remove')"
      >
        🗑
      </button>
    </td>
  </tr>
</template>
