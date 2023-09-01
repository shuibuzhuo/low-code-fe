<template>
  <main>
    <a-button type="primary" size="large" @click="goManage">去列表</a-button>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goManage() {
  router.push("/manage/main");
}
</script>
