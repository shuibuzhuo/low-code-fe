import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormDescDefaultProps } from "./types";

export * from "./types";

export default {
  title: "描述文字",
  type: "formDesc",
  Component,
  PropComponent,
  defaultProps: FormDescDefaultProps,
};
