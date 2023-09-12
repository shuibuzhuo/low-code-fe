import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormTwoColsDefaultProps } from "./types";

export * from "./types";

export default {
  title: "一行两列",
  type: "formTwoCols",
  Component,
  PropComponent,
  defaultProps: FormTwoColsDefaultProps,
};
