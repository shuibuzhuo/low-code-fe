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

export type StateType = {
  componentsList: ComponentInfoType[];
  selectedId: string;
};

export const useComponentsStore = defineStore("components", () => {
  const componentsState = ref<StateType>({
    componentsList: [],
    selectedId: "",
  });

  // 重置组件信息
  function resetComponents(newState: StateType) {
    console.log("newState", newState);
    componentsState.value = newState;
  }

  // 添加新组件
  function addComponent(newComponent: ComponentInfoType, index: number) {
    insertComponent(componentsState.value, newComponent, index);
  }

  return {
    componentsState,
    resetComponents,
    addComponent,
  };
});
