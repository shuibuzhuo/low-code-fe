import {
  useComponentsStore,
  type ComponentInfoType,
} from "@/stores/components";
import { watch, ref } from "vue";

// 获取组件信息
function useGetComponentInfo() {
  const componentsStore = useComponentsStore();

  const componentsList = ref<ComponentInfoType[]>([]);
  const selectedId = ref("");
  const selectedComponent = ref<ComponentInfoType | null>(null);

  // 监听 store 变化，重新计算
  watch(
    () => componentsStore.componentsState,
    (newComponentsState) => {
      const {
        componentsList: newComponentsListVal,
        selectedId: newSelectedIdVal,
      } = newComponentsState;
      componentsList.value = newComponentsListVal;
      selectedId.value = newSelectedIdVal;
      console.log("selectedId.value", selectedId.value);
      selectedComponent.value =
        newComponentsListVal.find(
          (component) => component.fe_id === newSelectedIdVal
        ) || null;
    }
  );

  return {
    componentsList,
    selectedId,
    selectedComponent,
  };
}

export default useGetComponentInfo;
