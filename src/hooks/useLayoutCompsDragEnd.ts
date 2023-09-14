import { useComponentsStore } from "@/stores/components";
import { Direction } from "@/stores/types";
import type Sortable from "sortablejs";

/**
 * @description layout 组件拖拽结束逻辑 hooks
 */
function useLayoutCompsDragEnd(e: Sortable.SortableEvent) {
  const componentsStore = useComponentsStore();

  /**
   * oldIndex 在布局容器里的 index
   * newIndex 在画布里的 index
   * item 被拖拽的元素
   */
  const { oldIndex = 0, newIndex = 0, item: dragged } = e;

  const { dataset = {} } = e.from;

  // 以下两行代码，为了去掉画布里产生的多余的控件
  // 获取父级元素
  const parentElement = dragged.parentNode;
  // 删除 DOM 元素
  parentElement!.removeChild(dragged);

  // 分组的索引
  let groupIndex;
  if (dataset.groupIndex) {
    groupIndex = parseInt(dataset.groupIndex);
  }

  // 从一个布局组件拖到另一个布局组件时，拖到的目的地分组的索引
  let toGroupIndex;
  const { dataset: toDataSet = {}, className: toClassName = "" } = e.to;
  if (toDataSet.groupIndex) {
    toGroupIndex = parseInt(toDataSet.groupIndex);
  }

  // 列的索引
  let colIndex;
  if (dataset.colIndex) {
    colIndex = parseInt(dataset.colIndex);
  }

  // 目的地分组的索引
  let toColIndex;
  if (toDataSet.colIndex) {
    toColIndex = parseInt(toDataSet.colIndex);
  }

  // 选项卡的索引
  let tabIndex;
  if (dataset.tabIndex) {
    tabIndex = parseInt(dataset.tabIndex);
  }

  // 目的地选项卡的索引
  let toTabIndex;
  if (toDataSet.tabIndex) {
    toTabIndex = parseInt(toDataSet.tabIndex);
  }

  componentsStore.moveComponent({
    oldIndex,
    newIndex,
    groupIndex,
    toGroupIndex,
    colIndex,
    toColIndex,
    tabIndex,
    toTabIndex,
    toClassName,
    direction:
      e.to.className === "main-edit-canvas-wrapper"
        ? Direction.Out
        : Direction.InToIn,
  });
}

export default useLayoutCompsDragEnd;
