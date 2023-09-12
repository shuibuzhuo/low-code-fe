import { type Ref } from "vue";
import type { ComponentInfoType } from "./components";
import { isEmpty, isGroup, isTabs, isThreeCols, isTwoCols } from "@/utils/util";
import lodash from "lodash";

/**
 * 插入组件
 * @param state store state
 * @param newComponent 新组件
 * @param index 新组件在画布的位置（用于直接放组件）
 * @param groupIndex 嵌套组件在画布的位置（用于放入嵌套组件）
 * @param colIndex 嵌套组件中列的位置（用于放入嵌套组件）
 * @param tabIndex 嵌套组件中选项卡的位置（用于放入嵌套组件）
 */
export function insertComponent(
  state: { componentsList: Ref<ComponentInfoType[]>; selectedId: Ref<string> },
  newComponent: ComponentInfoType,
  index: number,
  groupIndex: number,
  colIndex: number,
  tabIndex: number
) {
  const { componentsList, selectedId } = state;

  const componentInfo = lodash.cloneDeep(newComponent);

  if (!isEmpty(componentInfo.props.index)) delete componentInfo.props.index;

  if (!isEmpty(groupIndex)) {
    // 如果是嵌套组件
    const group = componentsList.value[groupIndex];

    const { type } = group;

    if (isGroup(type)) {
      // 是分组组件
      if (!group.children) group.children = [];
      group.children.splice(index, 0, componentInfo);
    } else if (isTwoCols(type) || isThreeCols(type)) {
      // 是一行两列组件或者一行三列组件

      let n = 0; // 有几列
      if (isTwoCols(type)) n = 2;
      if (isThreeCols(type)) n = 3;

      if (!group.cols) {
        group.cols = [];
        for (let i = 0; i < n; i++) {
          group.cols.push({ type: "col", children: [] });
        }
      }

      const col = group.cols[colIndex];
      if (!col.children) col.children = [];
      col.children.splice(index, 0, componentInfo);
    } else if (isTabs(type)) {
      let n = 2;

      if (!group.tabs) {
        group.tabs = [];
        for (let i = 0; i < n; i++) {
          group.tabs.push({ type: "tab-pane", children: [] });
        }
      }

      const tabPane = group.tabs[tabIndex];
      if (!tabPane.children) tabPane.children = [];
      tabPane.children.splice(index, 0, componentInfo);
    }
  } else {
    // 当前位置不存在组件，说明是要插入新的
    componentsList.value.splice(index, 0, componentInfo);
  }

  selectedId.value = componentInfo.fe_id;
}
