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
          {{ c.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { componentConfigGroup } from "@/views/components/FormComponents";
import { onMounted } from "vue";
import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";

const componentStore = useComponentsStore();

function initSortable() {
  const allGroup = document.querySelectorAll(".lib-components-wrapper");
  for (let i = 0; i < allGroup.length; i++) {
    const group = allGroup[i];
    Sortable.create(group, {
      draggable: ".lib-component",
      group: { name: "componentList", pull: "clone", put: false },
      ghostClass: "sortable-ghost",
      dragClass: "sortable-drag",
      onEnd: function (e) {
        console.log("onEnd e", e);
        if (e.from !== e.to) {
          const clone = e.clone;
          const dragged = e.item;
          const config = JSON.parse(clone.dataset.info);
          console.log("dragged", dragged);
          // 获取父级元素
          const parentElement = dragged.parentNode;

          // 删除 DOM 元素
          parentElement.removeChild(dragged);
          const newComponent = {
            fe_id: "100",
            title: config.title,
            type: config.type,
            props: {},
          };
          componentStore.addComponent(newComponent, e.newIndex);
        }
      },
      onClone: function (e) {
        console.log("onClone e", e);
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
  padding: 5px 10px;
  background-color: #fff;
  display: inline-block;
  border-radius: 3px;
  color: #424242;
  font-size: 12px;
}
</style>
