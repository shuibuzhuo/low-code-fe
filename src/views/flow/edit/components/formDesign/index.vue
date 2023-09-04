<template>
  <div class="form-design-wrapper">
    <div class="left">
      <!-- 左侧面板 -->
      <LeftPanel></LeftPanel>
    </div>
    <div class="main">
      <div class="main-wrapper">
        <!-- 工具栏 -->
        <Toolbar></Toolbar>
        <!-- 中间画布 -->
        <MainEditCanvas></MainEditCanvas>
      </div>
    </div>
    <div class="right">
      <!-- 右侧面板 -->
      <RightPanel></RightPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toolbar from "./components/Toolbar.vue";
import LeftPanel from "./components/leftPanel/index.vue";
import RightPanel from "./components/rightPanel/index.vue";
import MainEditCanvas from "./components/MainEditCanvas.vue";
</script>

<style lang="scss" scoped>
.form-design-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.left {
  width: 295px;
}

.main {
  flex: 1;
}

.right {
  width: 300px;
}
</style>
