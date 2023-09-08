import Component from "../../Layout/FormDesc/Component.vue";
import PropComponent from "../../Layout/FormDesc/PropComponent.vue";
import { FormGroupDefaultProps } from "./types";

export * from "./types";

export default {
  title: "分组",
  type: "formGroup",
  Component,
  PropComponent,
  defaultProps: FormGroupDefaultProps,
};
