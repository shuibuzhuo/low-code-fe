import type { ComponentInfoType, StateType } from "./components";

// 插入组件
export function insertComponent(
  state: StateType,
  newComponent: ComponentInfoType,
  index: number
) {
  const { componentsList } = state;

  componentsList.splice(index, 0, newComponent);

  state.selectedId = newComponent.fe_id;
}
