import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../views/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home page",
      meta: { layout: MainLayout, title: "Fridge recepies" },
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/sign-in",
      meta: { layout: MainLayout, title: "Login" },
      component: () => import("../views/SignIn.vue"),
    },
  ],
});

export default router;

