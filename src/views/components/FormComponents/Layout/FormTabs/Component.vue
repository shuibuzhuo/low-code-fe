<template>
  <div class="form-tabs-wrapper">
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="tab1">
        <div
          class="tab-content"
          :data-group-index="groupIndex"
          :data-tab-index="0"
        >
          <p v-if="!$slots.first" class="col-placeholder">拖拽左侧控件至此处</p>
          <slot name="first"></slot>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="tab2" force-render>
        <div
          class="tab-content"
          :data-group-index="groupIndex"
          :data-tab-index="1"
        >
          <p v-if="!$slots.second" class="col-placeholder">
            拖拽左侧控件至此处
          </p>
          <slot name="second"></slot>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FormTabsDefaultProps, type FormTabsPropsType } from "./types";
import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";
import { Direction } from "@/stores/types";

withDefaults(defineProps<FormTabsPropsType>(), FormTabsDefaultProps);

const activeKey = ref("1");

const componentsStore = useComponentsStore();

function initSortable() {
  const tabsDom = document.querySelectorAll(
    ".tab-content"
  ) as NodeListOf<HTMLElement>;

  tabsDom.forEach((tabDom) => {
    Sortable.create(tabDom!, {
      group: "componentList",
      onEnd: function (e) {
        console.log("e", e);
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
          direction: Direction.Out,
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
.col-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  white-space: nowrap;
  color: #a4a4a4;
}

.form-tabs-wrapper {
  :deep(.ant-tabs-content) {
    min-height: 60px;
  }

  .tab-content {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
