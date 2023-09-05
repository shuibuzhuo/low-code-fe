<template>
  <div class="right-panel-wrapper">
    <ComponentProp></ComponentProp>
  </div>
</template>

<script setup lang="ts">
import ComponentProp from "./components/ComponentProp.vue";
</script>

<style lang="scss" scoped>
.right-panel-wrapper {
  height: 100%;
  border-left: 1px solid #ccc;
}
</style>
