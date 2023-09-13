<template>
  <div class="wrapper">
    <div class="title-wrapper">{{ title }}</div>
    <div class="line"></div>
    <a-row>
      <a-col :span="12" :data-group-index="groupIndex" :data-col-index="0">
        <p v-if="!$slots.first" class="col-placeholder">拖拽左侧控件至此处</p>
        <slot name="first"></slot>
      </a-col>
      <a-col :span="12" :data-group-index="groupIndex" :data-col-index="1">
        <p v-if="!$slots.second" class="col-placeholder">拖拽左侧控件至此处</p>
        <slot name="second"></slot>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { FormTwoColsDefaultProps, type FormTwoColsPropsType } from "./types";
import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";
import { Direction } from "@/stores/types";

withDefaults(defineProps<FormTwoColsPropsType>(), FormTwoColsDefaultProps);

const componentsStore = useComponentsStore();

function initSortable() {
  const colsDom = document.querySelectorAll(
    ".ant-col"
  ) as NodeListOf<HTMLElement>;

  colsDom.forEach((colDom) => {
    Sortable.create(colDom!, {
      group: "componentList",
      onEnd: function (e) {
        /**
         * oldIndex 在布局容器里的 index
         * newIndex 在画布里的 index
         * item 被拖拽的元素
         */
        const { oldIndex = 0, newIndex = 0, item: dragged } = e;

        const { dataset = {} } = e.from;

        // 以下两行代码，为了去掉画布里产生的多余的控件
        // 获取父级元素
        const parentElement = dragged.parentNode;
        // 删除 DOM 元素
        parentElement!.removeChild(dragged);

        // 分组的索引
        let groupIndex;
        if (dataset.groupIndex) {
          groupIndex = parseInt(dataset.groupIndex);
        }

        // 列的索引
        let colIndex;
        if (dataset.colIndex) {
          colIndex = parseInt(dataset.colIndex);
        }

        // 从一个布局组件拖到另一个布局组件时，拖到的目的地分组的索引
        let toGroupIndex;
        const { dataset: toDataSet = {} } = e.to;
        if (toDataSet.groupIndex) {
          toGroupIndex = parseInt(toDataSet.groupIndex);
        }

        // 目的地分组的索引
        let toColIndex;
        if (toDataSet.colIndex) {
          toColIndex = parseInt(toDataSet.colIndex);
        }

        // 选项卡的索引
        let tabIndex;
        if (dataset.tabIndex) {
          tabIndex = parseInt(dataset.tabIndex);
        }

        componentsStore.moveComponent({
          oldIndex,
          newIndex,
          groupIndex,
          toGroupIndex,
          colIndex,
          toColIndex,
          tabIndex,
          direction:
            e.to.className === "main-edit-canvas-wrapper"
              ? Direction.Out
              : Direction.InToIn,
        });
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
