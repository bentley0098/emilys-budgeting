<script setup lang="ts">
import { ref, watch } from 'vue'
import { addMonthsISO, todayISO } from '~/utils/format'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const { createPeriod } = usePayPeriods()

const payDate = ref(todayISO())
const nextPayDate = ref(addMonthsISO(todayISO(), 1))
const inAccount = ref(0)

watch(
  () => props.open,
  (v) => {
    if (v) {
      payDate.value = todayISO()
      nextPayDate.value = addMonthsISO(todayISO(), 1)
      inAccount.value = 0
    }
  }
)

watch(payDate, (v) => {
  if (v && nextPayDate.value <= v) nextPayDate.value = addMonthsISO(v, 1)
})

function save() {
  if (!payDate.value || !nextPayDate.value) return
  createPeriod({
    payDate: payDate.value,
    nextPayDate: nextPayDate.value,
    inAccount: Number(inAccount.value) || 0,
  })
  emit('close')
}
</script>

<template>
  <div
    v-if="props.open"
    class="fixed inset-0 z-50 bg-primary/40 flex items-end sm:items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-[430px] bg-white rounded-t-lg sm:rounded-lg p-5 space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">New pay period</h2>
        <button
          type="button"
          class="min-h-[44px] min-w-[44px] rounded-lg text-slate-500 text-2xl"
          aria-label="Close"
          @click="emit('close')"
        >
          ×
        </button>
      </div>

      <label class="block">
        <span class="text-sm text-slate-600">Pay date</span>
        <input
          v-model="payDate"
          type="date"
          class="mt-1 block w-full min-h-[44px] rounded-lg border border-secondary px-3"
        />
      </label>

      <label class="block">
        <span class="text-sm text-slate-600">Next pay date</span>
        <input
          v-model="nextPayDate"
          type="date"
          class="mt-1 block w-full min-h-[44px] rounded-lg border border-secondary px-3"
        />
      </label>

      <label class="block">
        <span class="text-sm text-slate-600">In account (€)</span>
        <input
          v-model.number="inAccount"
          type="number"
          step="0.01"
          inputmode="decimal"
          class="mt-1 block w-full min-h-[44px] rounded-lg border border-secondary px-3"
        />
      </label>

      <div class="flex gap-2 pt-2">
        <button
          type="button"
          class="flex-1 min-h-[44px] rounded-lg bg-secondary text-slate-700 font-medium"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="button"
          class="flex-1 min-h-[44px] rounded-lg bg-primary text-white font-semibold"
          @click="save"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>
