import Component from "../../Layout/FormGroup/Component.vue";
import PropComponent from "../../Layout/FormGroup/PropComponent.vue";
import { FormGroupDefaultProps } from "./types";

export * from "./types";

export default {
  title: "分组",
  type: "formGroup",
  Component,
  PropComponent,
  defaultProps: FormGroupDefaultProps,
};
