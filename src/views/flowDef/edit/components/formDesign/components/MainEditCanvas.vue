<script lang="tsx">
import { defineComponent, onMounted } from "vue";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { type ComponentInfoType } from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";

function generateComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return null;

  const { Component } = componentConfig;

  return <Component {...props} />;
}

export default defineComponent({
  setup() {
    const componentsStore = useComponentsStore();

    function initSortable() {
      const canvasWrapper = document.querySelector(
        ".main-edit-canvas-wrapper"
      ) as HTMLElement;

      Sortable.create(canvasWrapper!, {
        group: "componentList",
      });
    }

    function handleClick(e: MouseEvent, fe_id: string) {
      e.stopPropagation();
      componentsStore.changeSelectedId(fe_id);
    }

    onMounted(() => {
      initSortable();
    });

    return () => {
      const { componentsList, selectedId } = useGetComponentInfo();
      return (
        <div class="main-edit-canvas-wrapper">
          {componentsList.value.map((c) => {
            const { fe_id } = c;
            return (
              <div
                key={fe_id}
                class={{
                  "component-wrapper": true,
                  selected: fe_id === selectedId.value,
                }}
                onClick={(e) => handleClick(e, fe_id)}
              >
                <div>{generateComponent(c)}</div>
              </div>
            );
          })}
        </div>
      );
    };
  },
});
</script>

<style lang="scss" scoped>
.main-edit-canvas-wrapper {
  min-height: 100%;
  padding-top: 12px;
  overflow: hidden;

  :deep(.lib-component-body) {
    font-size: 0;
  }

  :deep(.lib-component.sortable-ghost) {
    width: calc(100% - 24px);
    height: 3px;
    background: rgb(89, 89, 223);
  }
}

.component-wrapper {
  margin: 12px;
  padding: 12px;
  border: 1px solid #fff;

  &:first-child {
    margin-top: 0;
  }

  &:hover {
    border-color: #d9d9d9;
  }
}

.selected {
  border-color: #1890ff !important;
}
</style>
