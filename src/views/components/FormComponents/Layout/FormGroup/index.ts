import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormGroupDefaultProps } from "./types";

export * from "./types";

export default {
  title: "分组",
  type: "formGroup",
  Component,
  PropComponent,
  defaultProps: FormGroupDefaultProps,
};
