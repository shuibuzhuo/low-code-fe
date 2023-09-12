<template>
  <div class="form-desc-wrapper">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { FormDescDefaultProps, type FormDescPropsType } from "./types";

withDefaults(defineProps<FormDescPropsType>(), FormDescDefaultProps);
</script>

<style scoped>
.form-desc-wrapper {
  padding: 20px 12px;
}
</style>
