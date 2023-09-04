import FlowInputConfig from "./Basic/FlowInput";
import FlowDescConfig from "./Layout/FlowDesc";

// 组件的配置列表
export const componentConfigList = [FlowInputConfig, FlowDescConfig];

// 组件按照组区分的配置列表
export const componentConfigGroup = [
  {
    groupId: "layout",
    groupTitle: "布局类型",
    components: [FlowDescConfig],
  },
  {
    groupId: "basic",
    groupTitle: "基本类型",
    components: [FlowInputConfig],
  },
];

/**
 * 根据组件的类型，获取组件的配置
 * @param type 组件的类型
 */
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((c) => c.type === type);
}
