import type { ComponentInfoType } from "./components";

/**
 * 拖动的方向
 * In 从组件库拖入布局组件
 * Out 从布局组件拖出来
 * InToIn 从一个布局组件拖到另一个布局组件
 * OutToIn 从画布拖入布局组件
 */
export enum Direction {
  In,
  Out,
  InToIn,
  OutToIn,
}

export interface moveComponentParams {
  /** 移动的组件的 oldIndex */
  oldIndex: number;
  /** 移动的组件的 newIndex */
  newIndex: number;
  /** 嵌套组件在画布的位置（用于放入嵌套组件） */
  groupIndex: number;
  /** 目的地嵌套组件在画布的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地分组的索引） */
  toGroupIndex: number;
  /** 嵌套组件中列的位置（用于放入嵌套组件） */
  colIndex: number;
  /** 目的地嵌套组件的列的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地列的索引） */
  toColIndex: number;
  /** 嵌套组件中选项卡的位置（用于放入嵌套组件） */
  tabIndex: number;
  /** 目的地嵌套组件的 tab 的位置（用于从一个布局组件拖到另一个布局组件时，拖到的目的地 tab 的索引） */
  toTabIndex: number;
  /** 嵌套组件之间拖拽时，目的地嵌套组件的 className */
  toClassName: string;
  /** 拖动的方向 */
  direction: Direction;
}

export interface arrayMoveParams extends moveComponentParams {
  componentsList: ComponentInfoType[];
}
