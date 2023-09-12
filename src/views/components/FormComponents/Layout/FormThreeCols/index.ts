import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormThreeColsDefaultProps } from "./types";

export * from "./types";

export default {
  title: "一行三列",
  type: "formThreeCols",
  Component,
  PropComponent,
  defaultProps: FormThreeColsDefaultProps,
};
