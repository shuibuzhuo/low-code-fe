<template>
  <div>
    <div class="title-wrapper">{{ title }}</div>
    <div class="input-wrapper">
      <a-input></a-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type FormInputPropsType, FormInputDefaultProps } from "./types";

withDefaults(defineProps<FormInputPropsType>(), FormInputDefaultProps);
</script>

<style scoped>
.input-wrapper {
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
}
</style>
