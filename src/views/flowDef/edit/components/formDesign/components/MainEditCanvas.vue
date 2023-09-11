<script lang="tsx">
import { defineComponent, onMounted, useSlots, type Ref } from "vue";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { type ComponentInfoType } from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";

function isLayout(type: string) {
  if (type === "formGroup") return true;

  return false;
}

/**
 * 生成组件
 * @param componentInfo 组件信息
 * @param index 组件在画布里的索引
 */
function generateComponent(
  componentInfo: ComponentInfoType,
  index: number,
  selectedId: Ref<string>,
  handleClick: (e: MouseEvent, fe_id: string) => void
) {
  const { fe_id, type, props, children = [] } = componentInfo;

  const componentConfig = getComponentConfigByType(type);
  if (componentConfig == null) return null;

  const { Component } = componentConfig;

  if (!isLayout(type)) {
    // 普通组件
    return (
      <div
        key={fe_id}
        class={{
          "component-wrapper": true,
          group: isLayout(type),
          selected: fe_id === selectedId.value,
        }}
        onClick={(e) => handleClick(e, fe_id)}
      >
        <Component {...props}></Component>
      </div>
    );
  } else {
    // 布局组件
    return (
      <div
        key={fe_id}
        class={{
          "component-wrapper": true,
          group: isLayout(type),
          selected: fe_id === selectedId.value,
        }}
        onClick={(e) => handleClick(e, fe_id)}
      >
        <Component {...props} index={index}>
          {children.map((child, childIndex) => {
            return generateComponent(
              child,
              childIndex,
              selectedId,
              handleClick
            );
          })}
        </Component>
      </div>
    );
  }
}

export default defineComponent({
  setup() {
    const componentsStore = useComponentsStore();

    function initSortable() {
      const canvasWrapper = document.querySelector(
        ".main-edit-canvas-wrapper"
      ) as HTMLElement;

      Sortable.create(canvasWrapper!, {
        animation: 340,
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
          {componentsList.value.map((c, index) => {
            {
              /* return (
              <div
                key={fe_id}
                class={{
                  "component-wrapper": true,
                  group: isLayout(type),
                  selected: fe_id === selectedId.value,
                }}
                onClick={(e) => handleClick(e, fe_id)}
              >
                <div>{generateComponent(c, index)}</div>
              </div>
            ); */
            }

            return (
              <div>{generateComponent(c, index, selectedId, handleClick)}</div>
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
  border: 1px dashed #fff;

  &:first-child {
    margin-top: 0;
  }

  &.group {
    border-color: #ddd;
  }

  &:hover {
    border-color: #e4e4e4;
  }
}

.selected {
  border-color: #2d67ef !important;
}
</style>
