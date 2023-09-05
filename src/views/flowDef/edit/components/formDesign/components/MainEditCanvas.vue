<template>
  <draggable
    class="main-edit-canvas-wrapper"
    v-model="componentsList"
    item-key="fe_id"
    group="componentList"
  >
    <template #item="{ element }">
      {{ element.title }}
    </template>
  </draggable>
</template>

<script setup lang="ts">
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import draggable from "vuedraggable";

const { componentsList, selectedId } = useGetComponentInfo();
</script>

<style lang="scss" scoped>
.main-edit-canvas-wrapper {
  height: calc(100% - 30px);
  background-color: lightpink;
}
</style>
