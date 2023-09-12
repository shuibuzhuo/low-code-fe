import { ref } from "vue";
import { defineStore } from "pinia";
import type { ComponentPropsType } from "@/views/components/FormComponents";
import { insertComponent } from "./utils";
import { arrayMove } from "@/utils/util";

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
  children?: ComponentInfoType[];
  cols?: { type: string; children?: ComponentInfoType[] }[];
  tabs?: { type: string; children?: ComponentInfoType[] }[];
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

  /**
   * 添加新组件
   * @param newComponent 新组件
   * @param index 新组件在画布的位置
   */
  function addComponent(
    newComponent: ComponentInfoType,
    index: number,
    groupIndex: number,
    colIndex: number,
    tabIndex: number
  ) {
    insertComponent(
      { componentsList, selectedId },
      newComponent,
      index,
      groupIndex,
      colIndex,
      tabIndex
    );
  }

  // 设置选中的组件
  function changeSelectedId(newId: string) {
    selectedId.value = newId;
  }

  /**
   * 移动组件
   * @param oldIndex 移动的组件的 oldIndex
   * @param newIndex 移动的组件的 newIndex
   */
  function moveComponent(oldIndex: number, newIndex: number) {
    componentsList.value = arrayMove(componentsList.value, oldIndex, newIndex);
  }

  return {
    componentsList,
    selectedId,
    resetComponents,
    addComponent,
    changeSelectedId,
    moveComponent,
  };
});
