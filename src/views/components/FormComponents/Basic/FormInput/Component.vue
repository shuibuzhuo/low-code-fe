<template>
  <div>
    <a-typography-paragraph>{{ title }}</a-typography-paragraph>
    <div>
      <a-input></a-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormInputPropsType, FormInputDefaultProps } from "./types";

withDefaults(defineProps<FormInputPropsType>(), FormInputDefaultProps);
</script>

<style scoped></style>
