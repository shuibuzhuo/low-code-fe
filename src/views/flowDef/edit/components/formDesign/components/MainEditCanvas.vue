<script lang="tsx">
import { defineComponent, onMounted, useSlots, type Ref, ref } from "vue";
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { type ComponentInfoType } from "@/stores/components";
import { getComponentConfigByType } from "@/views/components/FormComponents";

import Sortable from "sortablejs";
import { useComponentsStore } from "@/stores/components";
import {
  isGroup,
  isLayout,
  isTabs,
  isThreeCols,
  isTwoCols,
} from "@/stores/utils";

/**
 * 生成组件
 * @param componentInfo 组件信息
 * @param index 组件在画布里的索引，即 groupIndex
 */
function generateComponent(
  componentInfo: ComponentInfoType,
  index: number,
  selectedId: Ref<string>,
  handleClick: (e: MouseEvent, fe_id: string) => void
) {
  const {
    fe_id,
    type,
    props,
    children = [],
    cols = [],
    tabs = [],
  } = componentInfo;
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
  } else if (isGroup(type)) {
    // 分组组件
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
        {children && children.length > 0 ? (
          <Component {...props} groupIndex={index}>
            {children.map((child, childIndex) => {
              return generateComponent(
                child,
                childIndex,
                selectedId,
                handleClick
              );
            })}
          </Component>
        ) : (
          <Component {...props} groupIndex={index}></Component>
        )}
      </div>
    );
  } else if (isTwoCols(type) || isThreeCols(type)) {
    // 一行两列组件或者一行三列组件

    // 插槽的内容
    const slotContent = {};

    let n = 0; // 有几列
    if (isTwoCols(type)) n = 2;
    if (isThreeCols(type)) n = 3;

    // 【索引】-【插槽名字】的 map
    const map = {
      0: "first",
      1: "second",
      2: "third",
    };

    // 生成插槽内容
    for (let i = 0; i < n; i++) {
      const children = cols?.[i]?.children || [];

      if (children.length > 0) {
        slotContent[map[i]] = () => {
          return children.map((child, childIndex) => {
            return generateComponent(
              child,
              childIndex,
              selectedId,
              handleClick
            );
          });
        };
      }
    }

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
        <Component {...props} groupIndex={index}>
          {slotContent}
        </Component>
      </div>
    );
  } else if (isTabs(type)) {
    // 选项卡组件
    // 插槽的内容
    const slotContent = {};

    let n = 0; // 有几个 tab
    if (isTabs(type)) n = 2;

    // 【索引】-【插槽名字】的 map
    const map = {
      0: "first",
      1: "second",
    };

    // 生成插槽内容
    for (let i = 0; i < n; i++) {
      const children = tabs?.[i]?.children || [];

      if (children.length > 0) {
        slotContent[map[i]] = () => {
          return tabs?.[i]?.children?.map((child, childIndex) => {
            return generateComponent(
              child,
              childIndex,
              selectedId,
              handleClick
            );
          });
        };
      }
    }

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
        <Component {...props} groupIndex={index}>
          {slotContent}
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
        ghostClass: "sortable-ghost",
        dragClass: "sortable-drag",
        onEnd: function (e) {
          console.log("canvas e", e);
          const { oldIndex = 0, newIndex = 0 } = e;

          const { dataset = {} } = e.to;

          // 分组的索引
          let groupIndex;
          if (dataset.groupIndex) {
            groupIndex = parseInt(dataset.groupIndex);
          }

          // 列的索引
          let colIndex;
          if (dataset.colIndex) {
            colIndex = parseInt(dataset.colIndex);
          }

          // 选项卡的索引
          let tabIndex;
          if (dataset.tabIndex) {
            tabIndex = parseInt(dataset.tabIndex);
          }

          componentsStore.moveComponent(
            oldIndex,
            newIndex,
            groupIndex,
            colIndex,
            tabIndex
          );
        },
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
            return (
              <div key={c.fe_id}>
                {generateComponent(c, index, selectedId, handleClick)}
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

  :deep(.lib-component.sortable-ghost),
  :deep(.sortable-chosen.sortable-ghost) {
    width: calc(100% - 24px);
    height: 3px;
    background: rgb(89, 89, 223);
  }
}

.component-wrapper {
  margin: 12px;
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

:deep(.title-wrapper) {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    padding: 4px;
  }
  .del {
    padding-bottom: 2px;
  }
}
</style>
