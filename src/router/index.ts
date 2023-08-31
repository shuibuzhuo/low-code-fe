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
      path: "/manage",
      name: "Manage",
      children: [
        {
          path: "list",
          name: "ManageList",
          component: () => import("@/views/manage/List.vue"),
        },
      ],
    },
    {
      path: "/question",
      name: "Question",
      children: [
        {
          path: "edit/:id",
          component: () => import("@/views/question/edit/index.vue"),
        },
      ],
    },
  ],
});

export default router;
