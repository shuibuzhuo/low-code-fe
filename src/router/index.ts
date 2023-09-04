import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/manage/main",
      name: "ManageMain",
      component: () => import("@/views/manage/ManageMain.vue"),
    },
    {
      path: "/flow/edit/:id",
      name: "FlowEdit",
      component: () => import("@/views/flow/edit/index.vue"),
    },
  ],
});

export default router;
