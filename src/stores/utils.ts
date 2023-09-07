import { type Ref } from "vue";
import type { ComponentInfoType } from "./components";

// 插入组件
export function insertComponent(
  state: { componentsList: Ref<ComponentInfoType[]>; selectedId: Ref<string> },
  newComponent: ComponentInfoType,
  index: number
) {
  const { componentsList, selectedId } = state;

  componentsList.value.splice(index, 0, newComponent);

  selectedId.value = newComponent.fe_id;
}
