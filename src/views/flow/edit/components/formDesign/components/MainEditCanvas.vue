<template>
  <div class="main-edit-canvas-wrapper">
    <draggable group="componentsGroup">
      <template #item="{ element }">
        <div>中间画布</div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
</script>

<style lang="scss" scoped>
.main-edit-canvas-wrapper {
  height: calc(100% - 30px);
  background-color: lightpink;
}
</style>
