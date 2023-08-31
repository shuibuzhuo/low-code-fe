<script setup lang="ts">
import { testApi } from '@/api/test.ts'

async function getTest() {
  const res = await testApi()
  console.log('res', res)
}

getTest()
</script>

<template>
</template>

<style scoped>

</style>
