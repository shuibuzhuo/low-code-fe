<template>
  <ManageLayout>
    <ManageTable></ManageTable>

    <!-- 可以扩展其他嵌套内容 -->
  </ManageLayout>
</template>

<script setup lang="ts">
import ManageLayout from "@/layouts/ManageLayout.vue";
import ManageTable from "@/views/manage/ManageTable.vue";
</script>

<style scoped></style>
