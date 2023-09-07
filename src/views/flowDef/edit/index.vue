<template>
  <FlowDefLayout>
    <div class="flow-def-edit-wrapper">
      <!-- 步骤条 -->
      <div class="steps-wrapper">
        <a-steps :current="current">
          <a-step>
            <template #title>基本信息</template>
          </a-step>
          <a-step>
            <template #title>表单设计</template>
          </a-step>
          <a-step>
            <template #title>流程设计</template>
          </a-step>
          <a-step>
            <template #title>高级配置</template>
          </a-step>
        </a-steps>
      </div>

      <!-- 内容 -->
      <div class="content-wrapper">
        <component :is="map[current]"></component>
      </div>

      <!-- footer -->
      <div class="footer">
        <a-button type="primary" style="margin-right: 20px" @click="nextStep"
          >下一步</a-button
        >
        <a-button>取消</a-button>
      </div>
    </div>
  </FlowDefLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import FlowDefLayout from "@/layouts/FlowDefLayout.vue";
import BaseSetting from "./components/BaseSetting.vue";
import FormDesign from "./components/formDesign/index.vue";
import FlowDesign from "./components/FlowDesign.vue";
import AdvancedSetting from "./components/AdvancedSetting.vue";
import { useRoute } from "vue-router";
import { getFlowDefService } from "@/api/flowDef";
import { useComponentsStore } from "@/stores/components";

const route = useRoute();

const componentsStore = useComponentsStore();

// 当前的步骤
const current = ref(1);

// 每一步组件的 map
const map = {
  0: BaseSetting,
  1: FormDesign,
  2: FlowDesign,
  3: AdvancedSetting,
};

// 下一步
function nextStep() {
  current.value++;
}

// 请求该流程设计的数据
async function loadFlowDefData() {
  const id = route.params.id as string;
  const { componentsList } = await getFlowDefService(id);

  let selectedId = "";
  if (componentsList.length > 0) {
    selectedId = componentsList[0].fe_id;
  }

  componentsStore.resetComponents({ componentsList, selectedId });
}

onMounted(() => {
  // 请求该流程设计的数据
  loadFlowDefData();
});
</script>

<style lang="scss" scoped>
.flow-def-edit-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.steps-wrapper {
  width: 100%;
  height: 100px;
  padding: 20px 80px;
}

.content-wrapper {
  width: 100%;
  flex: 1;
  border: 1px solid #ccc;
}

.footer {
  width: 100%;
  height: 100px;
  text-align: center;
  margin-top: 20px;
}
</style>
