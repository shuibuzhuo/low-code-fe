import { type Ref } from "vue";
import type { ComponentInfoType } from "./components";
import { isEmpty } from "@/utils/util";

/**
 * 插入组件
 * @param state store state
 * @param newComponent 新组件
 * @param index 新组件在画布的位置
 * @param groupIndex 嵌套组件在画布的位置
 */
export function insertComponent(
  state: { componentsList: Ref<ComponentInfoType[]>; selectedId: Ref<string> },
  newComponent: ComponentInfoType,
  index: number,
  groupIndex: number
) {
  const { componentsList, selectedId } = state;

  console.log("groupIndex", groupIndex);

  if (!isEmpty(groupIndex)) {
    // 如果是嵌套组件
    const group = componentsList.value[groupIndex];
    if (!group.children) group.children = [];
    group.children.splice(index, 0, newComponent);
  } else {
    // 当前位置不存在组件，说明是要插入新的
    componentsList.value.splice(index, 0, newComponent);
  }

  selectedId.value = newComponent.fe_id;
}
