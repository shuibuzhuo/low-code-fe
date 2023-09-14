import { useComponentsStore } from "@/stores/components";
import { Direction } from "@/stores/types";
import type Sortable from "sortablejs";

/**
 * @description layout 组件拖拽结束逻辑 hooks
 */
function useCanvasDragEnd(e: Sortable.SortableEvent) {
  const componentsStore = useComponentsStore();

  /**
   * oldIndex 在布局容器里的 index
   * newIndex 在画布里的 index
   * item 被拖拽的元素
   */
  const { oldIndex = 0, newIndex = 0, item: dragged } = e;

  const { dataset = {}, className: fromClassName = "" } = e.from;

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

  const canvasClassName = "main-edit-canvas-wrapper";
  const layoutClassNames = [
    "form-group",
    "ant-col ant-col-12",
    "ant-col ant-col-8",
    "tab-content",
  ];

  let direction: Direction = Direction.In;

  if (
    layoutClassNames.includes(fromClassName) &&
    toClassName === canvasClassName
  ) {
    // 从布局组件里拖出来
    direction = Direction.Out;
  } else if (
    layoutClassNames.includes(fromClassName) &&
    layoutClassNames.includes(toClassName)
  ) {
    direction = Direction.InToIn;
  } else if (
    fromClassName === canvasClassName &&
    layoutClassNames.includes(toClassName)
  ) {
    direction = Direction.OutToIn;
  }

  console.log("useCanvasDragEnd e", e);
  console.log("useCanvasDragEnd oldIndex", oldIndex);
  console.log("useCanvasDragEnd newIndex", newIndex);
  console.log("useCanvasDragEnd groupIndex", groupIndex);
  console.log("useCanvasDragEnd toGroupIndex", toGroupIndex);
  console.log("useCanvasDragEnd colIndex", colIndex);
  console.log("useCanvasDragEnd toColIndex", toColIndex);
  console.log("useCanvasDragEnd tabIndex", tabIndex);
  console.log("useCanvasDragEnd toTabIndex", toTabIndex);
  console.log("useCanvasDragEnd fromClassName", fromClassName);
  console.log("useCanvasDragEnd toClassName", toClassName);
  console.log("useCanvasDragEnd direction", direction);

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
    direction,
  });
}

export default useCanvasDragEnd;
