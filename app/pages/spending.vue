<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatEUR, todayISO } from '~/utils/format'
import { newId } from '~/utils/id'

const { active } = usePayPeriods()
const { spending } = usePeriodTotals()

const entries = computed(() => active.value?.spendingEntries ?? [])
const categories = computed(() => active.value?.spendingCategories ?? [])

const totalCatBudgeted = computed(() =>
  categories.value.reduce((t, c) => t + (Number(c.budgeted) || 0), 0)
)

const showEntry = ref(false)
const showCategory = ref(false)

const newEntry = ref({ date: todayISO(), expense: '', category: '', cost: 0 })
const newCategory = ref({ name: '', budgeted: 0 })

function openEntry() {
  newEntry.value = { date: todayISO(), expense: '', category: '', cost: 0 }
  showEntry.value = true
}

function saveEntry() {
  if (!active.value || !newEntry.value.expense.trim()) return
  active.value.spendingEntries.push({
    id: newId(),
    date: newEntry.value.date,
    expense: newEntry.value.expense.trim(),
    category: newEntry.value.category.trim(),
    cost: Number(newEntry.value.cost) || 0,
    checked: false,
  })
  showEntry.value = false
}

function removeEntry(id: string) {
  if (!active.value) return
  const idx = active.value.spendingEntries.findIndex((e) => e.id === id)
  if (idx >= 0) active.value.spendingEntries.splice(idx, 1)
}

function openCategory() {
  newCategory.value = { name: '', budgeted: 0 }
  showCategory.value = true
}

function saveCategory() {
  if (!active.value || !newCategory.value.name.trim()) return
  active.value.spendingCategories.push({
    id: newId(),
    name: newCategory.value.name.trim(),
    budgeted: Number(newCategory.value.budgeted) || 0,
    checked: false,
  })
  showCategory.value = false
}

function removeCategory(id: string) {
  if (!active.value) return
  const idx = active.value.spendingCategories.findIndex((c) => c.id === id)
  if (idx >= 0) active.value.spendingCategories.splice(idx, 1)
}
</script>

<template>
  <div class="space-y-6">
    <datalist id="spending-categories">
      <option v-for="c in categories" :key="c.id" :value="c.name" />
    </datalist>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">Spending</h1>
        <button
          type="button"
          class="min-h-[44px] rounded-xl bg-emerald-600 text-white px-4 font-semibold"
          @click="openEntry"
        >
          + Add
        </button>
      </div>

      <div class="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50">
            <tr>
              <th class="w-8 py-2"></th>
              <th class="py-2 text-left">Date</th>
              <th class="py-2 text-left pl-2">Expense</th>
              <th class="py-2 text-left">Category</th>
              <th class="py-2 text-right pr-1">Cost</th>
              <th class="w-8 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <SpendingEntryRow
              v-for="e in entries"
              :key="e.id"
              :item="e"
              :categories="categories"
              @remove="removeEntry(e.id)"
            />
            <tr v-if="entries.length === 0">
              <td colspan="6" class="py-6 text-center text-xs text-slate-400">
                No spending entries yet.
              </td>
            </tr>
          </tbody>
          <tfoot v-if="entries.length" class="bg-slate-50 font-semibold text-sm">
            <tr>
              <td colspan="4" class="py-2 pl-2 text-slate-600">Total</td>
              <td class="py-2 text-right pr-1">{{ formatEUR(spending) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <section class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold">Categories</h2>
        <button
          type="button"
          class="min-h-[44px] rounded-xl bg-slate-900 text-white px-4 font-semibold"
          @click="openCategory"
        >
          + Category
        </button>
      </div>

      <div class="rounded-2xl bg-white border border-slate-200 overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50">
            <tr>
              <th class="w-8 py-2"></th>
              <th class="py-2 text-left pl-2">Category</th>
              <th class="py-2 text-right pr-1">Budget</th>
              <th class="py-2 text-right pr-1">Actual</th>
              <th class="w-8 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <CategoryRow
              v-for="c in categories"
              :key="c.id"
              :item="c"
              @remove="removeCategory(c.id)"
            />
            <tr v-if="categories.length === 0">
              <td colspan="5" class="py-6 text-center text-xs text-slate-400">
                No categories yet.
              </td>
            </tr>
          </tbody>
          <tfoot v-if="categories.length" class="bg-slate-50 font-semibold text-sm">
            <tr>
              <td colspan="2" class="py-2 pl-2 text-slate-600">Total</td>
              <td class="py-2 text-right pr-1">{{ formatEUR(totalCatBudgeted) }}</td>
              <td class="py-2 text-right pr-1">{{ formatEUR(spending) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>

    <!-- Add spending entry modal -->
    <div
      v-if="showEntry"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-end sm:items-center justify-center"
      @click.self="showEntry = false"
    >
      <div class="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl p-5 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">New spending entry</h2>
          <button
            type="button"
            class="min-h-[44px] min-w-[44px] rounded-full text-slate-500 text-2xl"
            @click="showEntry = false"
          >
            ×
          </button>
        </div>

        <label class="block">
          <span class="text-sm text-slate-600">Date</span>
          <input
            v-model="newEntry.date"
            type="date"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <label class="block">
          <span class="text-sm text-slate-600">Expense</span>
          <input
            v-model="newEntry.expense"
            type="text"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <label class="block">
          <span class="text-sm text-slate-600">Category</span>
          <input
            v-model="newEntry.category"
            list="spending-categories"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <label class="block">
          <span class="text-sm text-slate-600">Cost (€)</span>
          <input
            v-model.number="newEntry.cost"
            type="number"
            step="0.01"
            inputmode="decimal"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <div class="flex gap-2 pt-2">
          <button
            type="button"
            class="flex-1 min-h-[44px] rounded-xl bg-slate-200 text-slate-700 font-medium"
            @click="showEntry = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="flex-1 min-h-[44px] rounded-xl bg-emerald-600 text-white font-semibold"
            @click="saveEntry"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Add category modal -->
    <div
      v-if="showCategory"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-end sm:items-center justify-center"
      @click.self="showCategory = false"
    >
      <div class="w-full max-w-[430px] bg-white rounded-t-2xl sm:rounded-2xl p-5 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">New category</h2>
          <button
            type="button"
            class="min-h-[44px] min-w-[44px] rounded-full text-slate-500 text-2xl"
            @click="showCategory = false"
          >
            ×
          </button>
        </div>

        <label class="block">
          <span class="text-sm text-slate-600">Name</span>
          <input
            v-model="newCategory.name"
            type="text"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <label class="block">
          <span class="text-sm text-slate-600">Budgeted (€)</span>
          <input
            v-model.number="newCategory.budgeted"
            type="number"
            step="0.01"
            inputmode="decimal"
            class="mt-1 block w-full min-h-[44px] rounded-lg border border-slate-300 px-3"
          />
        </label>

        <div class="flex gap-2 pt-2">
          <button
            type="button"
            class="flex-1 min-h-[44px] rounded-xl bg-slate-200 text-slate-700 font-medium"
            @click="showCategory = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="flex-1 min-h-[44px] rounded-xl bg-slate-900 text-white font-semibold"
            @click="saveCategory"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
