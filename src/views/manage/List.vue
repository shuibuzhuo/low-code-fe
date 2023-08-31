<template>
  <div class="list">
    <div class="btn-wrapper">
      <a-button type="primary" @click="create">新增</a-button>
    </div>
    <div class="table-wrapper">
      <a-table :dataSource="list" :columns="columns" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, onMounted } from "vue";
import { getQuestionListService, createQuestionService } from "@/api/question";
import { LIST_PAGE_SIZE } from "@/constant/index";
import { query } from "@/utils/util";
import { useRouter } from "vue-router";

const router = useRouter();

const list = ref([]);
const page = ref(1);
const total = ref(0);
const keyword = query("keyword") || "";

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "操作",
    dataIndex: "age",
    key: "age",
    customRender: ({ record: any }) => {
      return (
        <div>
          <a-button type="primary" size="small" style="margin-right: 10px">
            编辑
          </a-button>
          <a-button size="small">删除</a-button>
        </div>
      );
    },
  },
];

// 获取列表数据
async function getQuestionList() {
  const res = await getQuestionListService({
    page: page.value,
    pageSize: LIST_PAGE_SIZE,
    keyword,
  });
  const { list: l = [], total: t = 0 } = res;
  list.value = l;
  total.value = t;
}

// 新增
async function create() {
  const res = await createQuestionService();
  router.push(`/question/edit/${res.id}`);
}

onMounted(() => {
  getQuestionList();
});
</script>

<style scoped lang="scss">
.btn-wrapper {
  padding: 15px 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
