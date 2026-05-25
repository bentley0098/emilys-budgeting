<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EntryKind, NamedEntry } from '~/utils/types'
import { formatEUR } from '~/utils/format'
import { newId } from '~/utils/id'

const props = defineProps<{ kind: EntryKind; title: string; addLabel?: string }>()

const { active } = usePayPeriods()

const items = computed<NamedEntry[]>(() => (active.value ? active.value[props.kind] : []))

const showAdd = ref(false)

const totalBudgeted = computed(() => items.value.reduce((t, i) => t + (Number(i.budgeted) || 0), 0))
const totalActual = computed(() => items.value.reduce((t, i) => t + (Number(i.actual) || 0), 0))

function add(payload: { name: string; dueDate: string; budgeted: number; actual: number }) {
  if (!active.value) return
  active.value[props.kind].push({
    id: newId(),
    name: payload.name,
    dueDate: payload.dueDate,
    budgeted: payload.budgeted,
    actual: payload.actual,
    checked: false,
  })
}

function remove(id: string) {
  if (!active.value) return
  const arr = active.value[props.kind]
  const idx = arr.findIndex((x) => x.id === id)
  if (idx >= 0) arr.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <button
        type="button"
        class="min-h-[44px] rounded-xl bg-emerald-600 text-white px-4 font-semibold"
        @click="showAdd = true"
      >
        + Add
      </button>
    </div>

    <div class="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50">
          <tr>
            <th class="w-8 py-2"></th>
            <th class="py-2 text-left pl-2">Name</th>
            <th class="py-2 text-left">Due</th>
            <th class="py-2 text-right pr-1">Budget</th>
            <th class="py-2 text-right pr-1">Actual</th>
            <th class="w-8 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <EntryRow
            v-for="item in items"
            :key="item.id"
            :item="item"
            @remove="remove(item.id)"
          />
          <tr v-if="items.length === 0">
            <td colspan="6" class="py-6 text-center text-xs text-slate-400">
              No entries yet. Tap "+ Add" to create one.
            </td>
          </tr>
        </tbody>
        <tfoot v-if="items.length" class="bg-slate-50 font-semibold text-sm">
          <tr>
            <td colspan="3" class="py-2 pl-2 text-slate-600">Total</td>
            <td class="py-2 text-right pr-1">{{ formatEUR(totalBudgeted) }}</td>
            <td class="py-2 text-right pr-1">{{ formatEUR(totalActual) }}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <NewEntryModal
      :open="showAdd"
      :title="addLabel ?? `New ${title.toLowerCase().replace(/s$/, '')}`"
      @close="showAdd = false"
      @save="add"
    />
  </div>
</template>
