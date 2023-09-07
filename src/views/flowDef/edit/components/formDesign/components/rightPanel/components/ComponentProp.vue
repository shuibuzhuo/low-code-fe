<script lang="tsx">
import useGetComponentInfo from "@/hooks/useGetComponentInfo";
import { getComponentConfigByType } from "@/views/components/FormComponents";
import { defineComponent } from "vue";

const NoConfig = () => <div>请选择组件</div>;

export default defineComponent({
  setup() {
    return () => {
      const { selectedComponent } = useGetComponentInfo();

      if (selectedComponent == null) return <NoConfig />;

      const { type, props } = selectedComponent;

      const selectedComponentConfig = getComponentConfigByType(type);

      if (selectedComponentConfig == null) return <NoConfig />;

      const { PropComponent } = selectedComponentConfig;

      return <PropComponent {...props} />;
    };
  },
});
</script>

<style lang="scss" scoped></style>
