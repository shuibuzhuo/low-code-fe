import type { ComponentInfoType } from "./components";

/**
 * In 拖入到布局组件
 * Out 从布局组件拖出来
 * InToIn 从一个布局组件拖到另一个布局组件
 */
export enum Direction {
  In,
  Out,
  InToIn,
}

export interface moveComponentParams {
  oldIndex: number;
  newIndex: number;
  groupIndex: number;
  toGroupIndex: number;
  colIndex: number;
  toColIndex: number;
  tabIndex: number;
  direction: Direction;
}

export interface arrayMoveParams extends moveComponentParams {
  componentsList: ComponentInfoType[];
}
