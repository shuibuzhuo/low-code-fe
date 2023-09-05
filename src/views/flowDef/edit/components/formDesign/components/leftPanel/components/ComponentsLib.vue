<template>
  <!-- 所有表单控件组的集合 -->
  <div class="lib-components-groups-wrapper">
    <div
      v-for="group in componentConfigGroup"
      :key="group.groupId"
      class="lib-group"
    >
      <!-- 每一组的标题 -->
      <a-typography-title :level="5">{{ group.groupTitle }}</a-typography-title>
      <!-- 每一组底下的所有组件的集合 -->
      <div class="lib-components-wrapper">
        <div v-for="c in group.components" :key="c.type" class="lib-component">
          {{ c.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { componentConfigGroup } from "@/views/components/FormComponents";

function onDragEnd(obj) {
  console.log("拖拽结束", obj);
}
</script>

<style scoped lang="scss">
.lib-group + .lib-group {
  margin-top: 20px;
}
.lib-component {
  padding: 5px 10px;
  background-color: #fff;
  display: inline-block;
  border-radius: 3px;
  color: #424242;
  font-size: 12px;
}
</style>
