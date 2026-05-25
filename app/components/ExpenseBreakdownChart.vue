<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { formatEUR } from '~/utils/format'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const { breakdown } = usePeriodTotals()

const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const palette = [
  '#f0a6d2', '#c7dbf9', '#dffff2', '#e9d1dd', '#f0a6d2',
  '#c7dbf9', '#dffff2', '#e9d1dd', '#f0a6d2', '#c7dbf9',
]

function buildData() {
  return {
    labels: breakdown.value.map((b) => b.label),
    datasets: [
      {
        data: breakdown.value.map((b) => b.value),
        backgroundColor: breakdown.value.map((_, i) => palette[i % palette.length]),
        borderWidth: 0,
      },
    ],
  }
}

onMounted(() => {
  if (!canvas.value) return
  chart = new Chart(canvas.value, {
    type: 'doughnut',
    data: buildData(),
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 10, font: { size: 11 } },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${formatEUR(Number(ctx.parsed))}`,
          },
        },
      },
    },
  })
})

watch(
  breakdown,
  () => {
    if (!chart) return
    chart.data = buildData()
    chart.update()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  chart?.destroy()
  chart = null
})
</script>

<template>
  <div class="rounded-lg bg-white border border-secondary p-4">
    <div class="text-sm font-semibold text-slate-800 mb-2">Total expense breakdown</div>
    <div v-if="breakdown.length === 0" class="text-center text-xs text-slate-400 py-8">
      Add some expenses to see the breakdown.
    </div>
    <div class="relative h-64">
      <canvas ref="canvas" />
    </div>
  </div>
</template>
