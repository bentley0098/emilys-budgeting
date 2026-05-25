<script setup lang="ts">
import type { NamedEntry } from '~/utils/types'

defineProps<{ item: NamedEntry }>()
const emit = defineEmits<{ (e: 'remove'): void }>()
</script>

<template>
  <tr :class="item.checked ? 'opacity-50' : ''" class="border-b border-slate-100 last:border-0">
    <td class="w-8 py-2 align-middle text-center">
      <input
        v-model="item.checked"
        type="checkbox"
        class="h-5 w-5 accent-emerald-600"
      />
    </td>
    <td class="py-2 pr-1 align-middle">
      <input
        v-model="item.name"
        type="text"
        placeholder="Name"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-slate-50 px-2 text-sm focus:border-slate-300 focus:bg-white outline-none"
        :class="item.checked ? 'line-through' : ''"
      />
    </td>
    <td class="py-2 pr-1 align-middle w-[110px]">
      <input
        v-model="item.dueDate"
        type="date"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-slate-50 px-1 text-xs focus:border-slate-300 focus:bg-white outline-none"
      />
    </td>
    <td class="py-2 pr-1 align-middle w-[72px]">
      <input
        v-model.number="item.budgeted"
        type="number"
        step="0.01"
        inputmode="decimal"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-slate-50 px-2 text-sm text-right focus:border-slate-300 focus:bg-white outline-none"
      />
    </td>
    <td class="py-2 pr-1 align-middle w-[72px]">
      <input
        v-model.number="item.actual"
        type="number"
        step="0.01"
        inputmode="decimal"
        class="w-full min-h-[36px] rounded-md border border-transparent bg-slate-50 px-2 text-sm text-right focus:border-slate-300 focus:bg-white outline-none"
      />
    </td>
    <td class="w-8 py-2 align-middle text-center">
      <button
        type="button"
        class="h-8 w-8 rounded-full text-slate-400 hover:text-rose-600"
        aria-label="Delete"
        @click="emit('remove')"
      >
        🗑
      </button>
    </td>
  </tr>
</template>
