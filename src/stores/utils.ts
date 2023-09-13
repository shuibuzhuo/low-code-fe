import { type Ref } from "vue";
import type { ComponentInfoType } from "./components";
import { isEmpty } from "@/utils/util";
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

  if (!isEmpty(componentInfo.props.groupIndex))
    delete componentInfo.props.groupIndex;

  if (!isEmpty(groupIndex)) {
    // 如果是嵌套组件
    const group = componentsList.value[groupIndex];

    // 获取这个嵌套组件的类型
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

/**
 * 判断组件是否是布局组件
 * @param type 组件类型
 */
export function isLayout(type: string) {
  if (
    type === "formGroup" ||
    type === "formTwoCols" ||
    type === "formThreeCols" ||
    type === "formTabs"
  )
    return true;

  return false;
}

/**
 * 判断组件是否是分组
 * @param type 组件类型
 */
export function isGroup(type: string) {
  if (type === "formGroup") return true;

  return false;
}

/**
 * 判断组件是否是一行两列
 * @param type 组件类型
 */
export function isTwoCols(type: string) {
  if (type === "formTwoCols") return true;

  return false;
}

/**
 * 判断组件是否是一行三列
 * @param type 组件类型
 */
export function isThreeCols(type: string) {
  if (type === "formThreeCols") return true;

  return false;
}

/**
 * 判断组件是否是选项卡
 * @param type 组件类型
 */
export function isTabs(type: string) {
  if (type === "formTabs") return true;

  return false;
}

/**
 * 根据id，在数组里面查找，包含 cols tabs children
 * @param arr 数组
 * @param id id
 */
export function findObjById(arr, id) {
  for (const item of arr) {
    if (item.fe_id === id) {
      return item;
    }

    if (item.children && item.children.length > 0) {
      const res = findObjById(item.children, id);
      if (res) {
        return res;
      }
    }

    if (item.cols && item.cols.length > 0) {
      for (const col of item.cols) {
        if (col.children) {
          const res = findObjById(col.children, id);
          if (res) {
            return res;
          }
        }
      }
    }

    if (item.tabs && item.tabs.length > 0) {
      for (const tab of item.tabs) {
        if (tab.children) {
          const res = findObjById(tab.children, id);
          if (res) {
            return res;
          }
        }
      }
    }
  }

  return null;
}

/**
 * 将数组中的某个元素进行移动
 * @param arr 数组
 * @param oldIndex 移动的元素的 oldIndex（用于获取移动的元素）
 * @param newIndex 移动的元素的 newIndex
 * @param groupIndex 嵌套组件在画布的位置（用于放入嵌套组件）
 * @param colIndex 嵌套组件中列的位置（用于放入嵌套组件）
 * @param tabIndex 嵌套组件中选项卡的位置（用于放入嵌套组件）
 * @returns
 */
export function arrayMove(
  componentsList: ComponentInfoType[],
  oldIndex: number,
  newIndex: number,
  groupIndex: number,
  colIndex: number,
  tabIndex: number
) {
  console.log("arrayMove oldIndex", oldIndex);
  console.log("arrayMove newIndex", newIndex);
  console.log("arrayMove groupIndex", groupIndex);
  console.log("arrayMove colIndex", colIndex);
  console.log("arrayMove tabIndex", tabIndex);
  const copy = lodash.cloneDeep(componentsList);

  // 在新位置插入移动的元素
  if (!isEmpty(groupIndex)) {
    // 移动到布局组件里去

    // 先获取出在画布里的那个布局元素，因为下面要 splice
    const group = copy[groupIndex];
    console.log("group", group);

    // 获取要移动的元素
    const movedElement = copy.splice(oldIndex, 1)[0];

    // 获取这个嵌套组件的类型
    const { type } = group;

    if (isGroup(type)) {
      // 是分组组件
      if (!group.children) group.children = [];
      group.children.splice(newIndex, 0, movedElement);
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
      col.children.splice(newIndex, 0, movedElement);
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
      tabPane.children.splice(newIndex, 0, movedElement);
    }
  } else {
    // 普通移动
    if (oldIndex === newIndex) {
      // 如果 oldIndex 和 newIndex 相同，无需移动，直接返回原数组
      return copy;
    }
    // 获取要移动的元素
    const movedElement = copy.splice(oldIndex, 1)[0];
    copy.splice(newIndex, 0, movedElement);
  }

  return copy;
}
