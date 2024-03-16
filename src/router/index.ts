import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../views/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home page",
      meta: { layout: MainLayout, title: "Cocktail wizard" },
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/sign-in",
      meta: { layout: MainLayout, title: "Login" },
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/favourites",
      meta: { layout: MainLayout, title: "Favourites" },
      component: () => import("../views/Favourites.vue"),
    },
    {
      path: "/my-ingredients",
      meta: { layout: MainLayout, title: "My ingredients" },
      component: () => import("../views/MyIngredients.vue"),
    },
    {
      path: "/cocktail/:id",
      meta: { layout: MainLayout, title: "Cocktail" },
      component: () => import("../views/Cocktail.vue"),
    },
  ],
});

export default router;

