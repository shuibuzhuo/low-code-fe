<template>
  <div class="wrapper">
    <div class="title-wrapper">{{ title }}</div>
    <div class="line"></div>
    <a-row>
      <a-col :span="8" :data-group-index="groupIndex" :data-col-index="0">
        <p v-if="!$slots.first" class="col-placeholder">拖拽左侧控件至此处</p>
        <slot name="first"></slot>
      </a-col>
      <a-col :span="8" :data-group-index="groupIndex" :data-col-index="1">
        <p v-if="!$slots.second" class="col-placeholder">拖拽左侧控件至此处</p>
        <slot name="second"></slot>
      </a-col>
      <a-col :span="8" :data-group-index="groupIndex" :data-col-index="2">
        <p v-if="!$slots.third" class="col-placeholder">拖拽左侧控件至此处</p>
        <slot name="third"></slot>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {
  FormThreeColsDefaultProps,
  type FormThreeColsPropsType,
} from "./types";
import Sortable from "sortablejs";
import useCanvasDragEnd from "@/hooks/useCanvasDragEnd";

withDefaults(defineProps<FormThreeColsPropsType>(), FormThreeColsDefaultProps);

function initSortable() {
  const colsDom = document.querySelectorAll(
    ".ant-col"
  ) as NodeListOf<HTMLElement>;

  colsDom.forEach((colDom) => {
    Sortable.create(colDom!, {
      group: "componentList",
      onEnd: function (e) {
        useCanvasDragEnd(e);
      },
    });
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

.ant-col + .ant-col {
  border-left: 1px solid #e4e4e4;
  position: relative;
}

.ant-col {
  min-height: 58px;
}

.col-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  white-space: nowrap;
  color: #a4a4a4;
}
</style>
@/hooks/useCanvasDragEnd
