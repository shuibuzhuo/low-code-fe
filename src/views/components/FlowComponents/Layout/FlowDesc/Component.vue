<template>
  <a-typography-paragraph>
    {{ text }}
  </a-typography-paragraph>
</template>

<script setup lang="ts">
import { FlowDescDefaultProps, type FlowDescPropsType } from "./types";

withDefaults(defineProps<FlowDescPropsType>(), FlowDescDefaultProps);
</script>

<style scoped></style>
