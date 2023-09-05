import type { DefineComponent } from "vue";
import FormInputConfig, { type FormInputPropsType } from "./Basic/FormInput";
import FormDescConfig, { type FormDescPropsType } from "./Layout/FormDesc";

// 组件的配置列表
export const componentConfigList = [FormInputConfig, FormDescConfig];

export type ComponentPropsType = FormInputPropsType & FormDescPropsType;

export type ComponentConfigType = {
  title: string;
  type: string;
  PropComponent: DefineComponent<ComponentPropsType>;
  Component: DefineComponent<ComponentPropsType>;
};

// 组件按照组区分的配置列表
export const componentConfigGroup = [
  {
    groupId: "layout",
    groupTitle: "布局类型",
    components: [FormInputConfig],
  },
  {
    groupId: "basic",
    groupTitle: "基本类型",
    components: [FormDescConfig],
  },
];

/**
 * 根据组件的类型，获取组件的配置
 * @param type 组件的类型
 */
export function getComponentConfigByType(type: string) {
  return componentConfigList.find((c) => c.type === type);
}