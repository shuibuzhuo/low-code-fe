<template>
  <div>
    <a-typography-paragraph>{{ title }}</a-typography-paragraph>
    <div>
      <a-input></a-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FlowInputPropsType, FlowInputDefaultProps } from "./types";

withDefaults(defineProps<FlowInputPropsType>(), FlowInputDefaultProps);
</script>

<style scoped></style>
