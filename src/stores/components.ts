import { ref } from "vue";
import { defineStore } from "pinia";
import type { ComponentPropsType } from "@/views/components/FormComponents";
import { insertComponent } from "./utils";
import { arrayMove } from "./utils";
import type { Direction, moveComponentParams } from "./types";

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
   * @param groupIndex 嵌套组件在画布的位置（用于放入嵌套组件）
   * @param toGroupIndex 目的地嵌套组件在画布的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地分组的索引）
   * @param colIndex 嵌套组件中列的位置（用于放入嵌套组件）
   * @param toColIndex 目的地嵌套组件的列的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地列的索引）
   * @param tabIndex 嵌套组件中选项卡的位置（用于放入嵌套组件）
   * @param toTabIndex 目的地嵌套组件的 tab 的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地 tab 的索引）
   */
  function moveComponent(params: moveComponentParams) {
    componentsList.value = arrayMove({
      componentsList: componentsList.value,
      ...params,
    });
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
