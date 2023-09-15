<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="title">{{ title }}</div>
      <div class="del">删除</div>
    </div>
    <div class="line"></div>
    <div class="form-group" :data-group-index="groupIndex" ref="formGroupRef">
      <p v-if="!$slots.default" class="form-group-placeholder">
        拖拽左侧控件至此处
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FormGroupDefaultProps, type FormGroupPropsType } from "./types";
import Sortable from "sortablejs";
import useCanvasDragEnd from "@/hooks/useCanvasDragEnd";

withDefaults(defineProps<FormGroupPropsType>(), FormGroupDefaultProps);

const formGroupRef = ref(null);

function initSortable() {
  Sortable.create(formGroupRef.value!, {
    group: "componentList",
    onEnd: function (e) {
      useCanvasDragEnd(e);
    },
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

.form-group {
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
