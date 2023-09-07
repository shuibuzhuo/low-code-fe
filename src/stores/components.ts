import { ref } from "vue";
import { defineStore } from "pinia";
import type { ComponentPropsType } from "@/views/components/FormComponents";
import { insertComponent } from "./utils";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
};

export const useComponentsStore = defineStore("components", () => {
  const componentsList = ref<ComponentInfoType[]>([]);
  const selectedId = ref<string>("");

  // 重置组件信息
  function resetComponents(newState: {
    componentsList: ComponentInfoType[];
    selectedId: string;
  }) {
    componentsList.value = newState.componentsList;
    selectedId.value = newState.selectedId;
  }

  // 添加新组件
  function addComponent(newComponent: ComponentInfoType, index: number) {
    insertComponent({ componentsList, selectedId }, newComponent, index);
  }

  // 设置选中的组件
  function changeSelectedId(newId: string) {
    selectedId.value = newId;
  }

  return {
    componentsList,
    selectedId,
    resetComponents,
    addComponent,
    changeSelectedId,
  };
});
