<template>
  <FlowDefListLayout>
    <FlowDefListTable></FlowDefListTable>

    <!-- 可以扩展其他嵌套内容 -->
  </FlowDefListLayout>
</template>

<script setup lang="ts">
import FlowDefListLayout from "@/layouts/FlowDefListLayout.vue";
import FlowDefListTable from "./FlowDefListTable.vue";
</script>

<style scoped></style>
