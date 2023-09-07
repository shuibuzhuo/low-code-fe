import { useComponentsStore } from "@/stores/components";
import { storeToRefs } from "pinia";
import { computed } from "vue";

// 获取组件信息
function useGetComponentInfo() {
  const componentsStore = useComponentsStore();
  const { componentsList, selectedId } = storeToRefs(componentsStore);

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
