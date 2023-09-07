import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormInputDefaultProps } from "./types";

export * from "./types";

export default {
  title: "单行输入框",
  type: "formInput",
  Component,
  PropComponent,
  defaultProps: FormInputDefaultProps,
};
