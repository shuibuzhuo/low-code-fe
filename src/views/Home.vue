<template>
  <main>
    <a-button type="primary" size="large" @click="goList">去列表</a-button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goList() {
  router.push("/manage/list");
}
</script>
