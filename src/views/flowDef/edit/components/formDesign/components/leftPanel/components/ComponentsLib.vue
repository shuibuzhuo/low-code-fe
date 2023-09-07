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
          <div class="lib-component-body">
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
import { useComponentsStore } from "@/stores/components";
import { v4 as uuid } from "uuid";

const componentStore = useComponentsStore();

function initSortable() {
  const allGroup = document.querySelectorAll(".lib-components-wrapper");
  for (let i = 0; i < allGroup.length; i++) {
    const group = allGroup[i] as HTMLElement;
    Sortable.create(group, {
      draggable: ".lib-component",
      group: { name: "componentList", pull: "clone", put: false },
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      onEnd: function (e) {
        if (e.from !== e.to) {
          const clone = e.clone;
          const dragged = e.item;
          const config = JSON.parse(clone.dataset.info!) as ComponentConfigType;
          const { title, type, defaultProps } = config;
          console.log("config", config);
          // 获取父级元素
          const parentElement = dragged.parentNode;

          // 删除 DOM 元素
          parentElement!.removeChild(dragged);
          const newComponent = {
            fe_id: uuid(),
            title: title,
            type: type,
            props: defaultProps,
          };
          componentStore.addComponent(newComponent, e.newIndex!);
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
