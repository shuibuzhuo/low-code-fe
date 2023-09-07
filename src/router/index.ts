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
      path: "/flowDef/list",
      name: "FlowDefList",
      component: () => import("@/views/flowDefList/FlowDefListMain.vue"),
    },
    {
      path: "/flowDef/edit/:id",
      name: "FlowDefEdit",
      component: () => import("@/views/flowDef/edit/index.vue"),
    },
  ],
});

export default router;
