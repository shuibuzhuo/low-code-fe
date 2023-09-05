<template>
  <a-typography-paragraph>
    {{ text }}
  </a-typography-paragraph>
</template>

<script setup lang="ts">
import { FormDescDefaultProps, type FormDescPropsType } from "./types";

withDefaults(defineProps<FormDescPropsType>(), FormDescDefaultProps);
</script>

<style scoped></style>
