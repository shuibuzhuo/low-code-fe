<template>
  <div class="left-panel-wrapper">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="表单控件">
        <ComponentsLib></ComponentsLib>
      </a-tab-pane>
      <a-tab-pane key="2" tab="内置表单模板">
        <FormTemplate></FormTemplate>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ComponentsLib from "./components/ComponentsLib.vue";
import FormTemplate from "./components/FormTemplate.vue";

const activeKey = ref("1");
</script>

<style scoped lang="scss">
.left-panel-wrapper {
  width: 100%;
  height: 100%;
  background-color: #eee;
  padding: 10px 15px;
}
</style>
