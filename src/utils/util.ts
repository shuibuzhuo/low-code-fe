/**
 * 获取 query 参数里的某个参数的值
 * @param name 要获取的参数名
 * @returns 参数的值
 */
export function query(name: string): string | null {
  const search = location.search.substr(1);
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, "i");
  const res = search.match(reg);
  if (res === null) {
    return null;
  }
  return res[2] || "";
}

/**
 * 判断值是否为空
 * @param val 值
 */
export function isEmpty(val: unknown) {
  if (val === "") return true;
  if (val === null) return true;
  if (val === undefined) return true;
  return false;
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
