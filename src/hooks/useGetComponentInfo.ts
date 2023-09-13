import { useComponentsStore } from "@/stores/components";
import { findObjById } from "@/stores/utils";
import { storeToRefs } from "pinia";

// 获取组件信息
function useGetComponentInfo() {
  const componentsStore = useComponentsStore();
  const { componentsList, selectedId } = storeToRefs(componentsStore);

  // 选择的组件
  const selectedComponent = findObjById(componentsList.value, selectedId.value);

  return {
    componentsList,
    selectedId,
    selectedComponent,
  };
}

export default useGetComponentInfo;
