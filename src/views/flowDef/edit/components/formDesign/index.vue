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
        <div class="canvas-wrapper">
          <div class="canvas-area">
            <MainEditCanvas></MainEditCanvas>
          </div>
        </div>
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

.main-wrapper {
  height: 100%;
}

.canvas-wrapper {
  width: 100%;
  height: calc(100% - 30px);
  position: relative;
}

.canvas-area {
  width: 300px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
  box-shadow: 0 2px 10px #0000001f;
}

.right {
  width: 300px;
}
</style>
