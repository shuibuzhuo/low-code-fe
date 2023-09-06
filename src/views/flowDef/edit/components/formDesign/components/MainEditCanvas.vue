<script lang="tsx">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import {
  useComponentsStore,
  type ComponentInfoType,
} from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

const { componentsList, selectedId } = useGetComponentInfo();
const componentsStore = useComponentsStore();

function generateComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return null;

  const { Component } = componentConfig;

  return <Component {...props} />;
}

export default defineComponent({
  components: { draggable },
  setup() {
    return () => {
      return (
        <draggable
          class="main-edit-canvas-wrapper"
          modelValue={componentsList.value}
          onUpdate:modelValue={(val) => {
            componentsStore.resetComponents({
              ...componentsStore.componentsState,
              componentsList: val,
            });
            componentsList.value = val;
          }}
          item-key="fe_id"
          group="componentList"
          v-slots={{
            item: ({ element: component }) => {
              const { fe_id } = component;
              return (
                <div
                  class={{
                    "component-wrapper": true,
                    selected: fe_id === selectedId.value,
                  }}
                >
                  <div>{generateComponent(component)}</div>
                </div>
              );
            },
          }}
        ></draggable>
      );
    };
  },
});
</script>

<style lang="scss" scoped>
.main-edit-canvas-wrapper {
  height: calc(100% - 30px);
}

.component-wrapper {
  margin: 12px;
  padding: 12px;
  border: 1px solid #fff;

  &:hover {
    border-color: #d9d9d9;
  }
}

.selected {
  border-color: #1890ff;
}
</style>
