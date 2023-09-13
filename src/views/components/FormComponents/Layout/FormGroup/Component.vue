<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <div class="title">{{ title }}</div>
      <div class="del">删除</div>
    </div>
    <div class="line"></div>
    <div id="form-group" :data-group-index="groupIndex" ref="formGroupRef">
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
import { useComponentsStore } from "@/stores/components";

withDefaults(defineProps<FormGroupPropsType>(), FormGroupDefaultProps);

const componentsStore = useComponentsStore();

const formGroupRef = ref(null);

function initSortable() {
  Sortable.create(formGroupRef.value!, {
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

      // 选项卡的索引
      let tabIndex;
      if (dataset.tabIndex) {
        tabIndex = parseInt(dataset.tabIndex);
      }

      componentsStore.moveComponent({
        oldIndex,
        newIndex,
        groupIndex,
        colIndex,
        tabIndex,
        direction: "out",
      });
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
