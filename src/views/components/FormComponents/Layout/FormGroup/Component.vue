<template>
  <div class="wrapper">
    <a-typography-paragraph>{{ title }}</a-typography-paragraph>
    <div class="line"></div>
    <div id="form-group" :data-index="index">
      <p v-if="!$slots.default" class="form-group-placeholder">
        拖拽左侧控件至此处
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { FormGroupDefaultProps, type FormGroupPropsType } from "./types";
import Sortable from "sortablejs";

withDefaults(defineProps<FormGroupPropsType>(), FormGroupDefaultProps);

function initSortable() {
  const formGroupDom = document.getElementById("form-group");

  Sortable.create(formGroupDom!, {
    group: "componentList",
  });
}

onMounted(() => {
  initSortable();
});
</script>

<style scoped lang="scss">
.line {
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
}

#form-group {
  min-height: 58px;
  color: #a4a4a4;
  position: relative;
}

.form-group-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
