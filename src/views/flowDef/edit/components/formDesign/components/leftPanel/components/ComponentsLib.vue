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
      <draggable
        class="lib-components-wrapper"
        :group="{ name: 'componentList', pull: 'clone', put: false }"
        :clone="cloneComponent"
        animation="300"
        draggable=".lib-component"
        v-model="group.components"
        item-key="type"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <div class="lib-component">{{ element.title }}</div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { componentConfigGroup } from "@/views/components/FormComponents";
import draggable from "vuedraggable";

function onDragEnd(obj) {
  console.log("拖拽结束", obj);
}

function cloneComponent(e) {
  console.log("克隆", e);
  return e;
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
