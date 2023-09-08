<template>
  <div>分组</div>
</template>

<script setup lang="ts">
import { FormGroupDefaultProps, type FormGroupPropsType } from "./types";

withDefaults(defineProps<FormGroupPropsType>(), FormGroupDefaultProps);
</script>

<style scoped></style>
