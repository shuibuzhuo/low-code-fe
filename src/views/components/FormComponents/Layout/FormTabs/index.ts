import Component from "./Component.vue";
import PropComponent from "./PropComponent.vue";
import { FormTabsDefaultProps } from "./types";

export * from "./types";

export default {
  title: "选项卡",
  type: "formTabs",
  Component,
  PropComponent,
  defaultProps: FormTabsDefaultProps,
};
