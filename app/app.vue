<script setup lang="ts">
const { init } = usePayPeriods()
onMounted(() => init())
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
