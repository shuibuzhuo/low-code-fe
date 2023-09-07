import { useComponentsStore } from "@/stores/components";
import { storeToRefs } from "pinia";
import { computed } from "vue";

// 获取组件信息
function useGetComponentInfo() {
  const componentsStore = useComponentsStore();
  const { componentsState } = storeToRefs(componentsStore);

  // 组件列表
  const componentsList = computed(() => componentsState.value.componentsList);
  // 选择的组件 id
  const selectedId = computed(() => componentsState.value.selectedId);
  // 选择的组件
  const selectedComponent = componentsList.value.find(
    (c) => c.fe_id === selectedId.value
  );

  return {
    componentsList,
    selectedId,
    selectedComponent,
  };
}

export default useGetComponentInfo;
