<script lang="tsx">
import { defineComponent, onMounted } from "vue";
// import draggable from "vuedraggable";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import {
  useComponentsStore,
  type ComponentInfoType,
} from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

const { componentsList, selectedId } = useGetComponentInfo();
// import Sortable from "sortablejs";
import draggable from "vuedraggable";

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
    // function initSortable() {
    //   const canvasWrapper = document.querySelector(".main-edit-canvas-wrapper");

    //   Sortable.create(canvasWrapper, {
    //     group: "componentList",
    //   });
    // }

    // onMounted(() => {
    //   initSortable();
    // });

    return () => {
      return (
        <draggable
          class="main-edit-canvas-wrapper"
          v-model={componentsList}
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
