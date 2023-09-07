<script lang="tsx">
import { defineComponent, onMounted } from "vue";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { type ComponentInfoType } from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

const { componentsList, selectedId } = useGetComponentInfo();
import Sortable from "sortablejs";

function generateComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return null;

  const { Component } = componentConfig;

  return <Component {...props} />;
}

export default defineComponent({
  setup() {
    function initSortable() {
      const canvasWrapper = document.querySelector(
        ".main-edit-canvas-wrapper"
      ) as HTMLElement;

      Sortable.create(canvasWrapper!, {
        group: "componentList",
      });
    }

    onMounted(() => {
      initSortable();
    });

    return () => {
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
  height: calc(100% - 30px);

  :deep(.sortable-ghost) {
    position: relative;
    display: block;
    overflow: hidden;
    &::before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 20px;
      background: rgb(89, 89, 223);
      z-index: 2;
    }
  }
  :deep(.lib-component.sortable-ghost) {
    width: 100%;
    height: 0;
    background-color: red;
  }
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
