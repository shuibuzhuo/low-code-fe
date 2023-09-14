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
        <div
          class="lib-component"
          v-for="c in group.components"
          :key="c.type"
          :data-info="JSON.stringify(c)"
        >
          <div class="lib-component-body" :data-info="JSON.stringify(c)">
            {{ c.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  componentConfigGroup,
  type ComponentConfigType,
} from "@/views/components/FormComponents";
import { onMounted } from "vue";
import Sortable from "sortablejs";
import {
  useComponentsStore,
  type ComponentInfoType,
} from "@/stores/components";
import { v4 as uuid } from "uuid";
import { isGroup, isTabs, isThreeCols, isTwoCols } from "@/stores/utils";

const componentsStore = useComponentsStore();

function initSortable() {
  const allGroup = document.querySelectorAll(".lib-components-wrapper");
  for (let i = 0; i < allGroup.length; i++) {
    const group = allGroup[i] as HTMLElement;
    Sortable.create(group, {
      draggable: ".lib-component",
      group: { name: "componentList", pull: "clone", put: false },
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      sort: false,
      onEnd: function (e) {
        if (e.from !== e.to) {
          const clone = e.clone;
          const dragged = e.item;
          const config = JSON.parse(clone.dataset.info!) as ComponentConfigType;
          const { title, type, defaultProps } = config;
          const { dataset = {} } = e.to;

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

          // 更新 store，增加新组件
          const newComponent: ComponentInfoType = {
            fe_id: uuid(),
            title: title,
            type: type,
            props: defaultProps,
          };

          // 是分组组件
          if (isGroup(type)) {
            newComponent.children = [];
          }

          // 是一行两列组件或者一行三列组件
          if (isTwoCols(type) || isThreeCols(type)) {
            let n = 0; // 有几列
            if (isTwoCols(type)) n = 2;
            if (isThreeCols(type)) n = 3;

            newComponent.cols = [];
            for (let i = 0; i < n; i++) {
              newComponent.cols.push({ type: "col", children: [] });
            }
          }

          // 是选项卡组件
          if (isTabs(type)) {
            let n = 2; // 暂时是 2 个 tab，预留后面扩展

            if (newComponent.tabs == null) {
              newComponent.tabs = [];
              for (let i = 0; i < n; i++) {
                newComponent.tabs.push({ type: "tab-pane", children: [] });
              }
            }
          }

          componentsStore.addComponent(
            newComponent,
            e.newIndex!,
            groupIndex,
            colIndex,
            tabIndex
          );
        }
      },
    });
  }
}

onMounted(() => {
  initSortable();
});
</script>

<style scoped lang="scss">
.lib-group + .lib-group {
  margin-top: 20px;
}
.lib-component {
  width: 48%;
  margin: 1%;
  background-color: #fff;
  display: inline-block;
  border-radius: 3px;
  color: #424242;
  font-size: 12px;
}

.lib-component-body {
  padding: 8px 10px;
  cursor: move;
}
</style>
