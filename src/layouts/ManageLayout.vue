<template>
  <div class="manage-layout-wrapper">
    <div class="btn-wrapper">
      <a-button type="primary" @click="create">新增</a-button>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { createFlowDefService } from "@/api/flowDef";
import { useRouter } from "vue-router";

const router = useRouter();
// 新增
async function create() {
  const res = await createFlowDefService();
  router.push(`/flowDef/edit/${res.id}`);
}
</script>

<style lang="scss" scoped>
.btn-wrapper {
  padding: 15px 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
