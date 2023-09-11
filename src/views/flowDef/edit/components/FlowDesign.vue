<template>
  <div class="flow-design-wrapper">
    <h1>流程</h1>
    <div ref="containerRef" class="container"></div>
  </div>
</template>

<script setup lang="ts">
import { Graph } from "@antv/x6";
import { onMounted, ref } from "vue";

const containerRef = ref(null);

const data = {
  nodes: [
    {
      id: "node1",
      shape: "rect",
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: "hello",
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: "world",
      attrs: {
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: "edge",
      source: "node1",
      target: "node2",
      label: "x6",
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ],
};

function init() {
  if (!containerRef.value) return;

  const graph = new Graph({
    container: containerRef.value,
    // 设置画布背景颜色
    background: {
      color: "#F2F7FA",
    },
  });

  graph.fromJSON(data); // 渲染元素
  graph.centerContent(); // 居中显示
}

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss">
.container {
  width: 800px;
  height: 500px;
}
</style>
