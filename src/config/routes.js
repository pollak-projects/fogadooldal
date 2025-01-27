import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/coinflip",
      name: "Coinflip",
      component: import("../components/Coinflip.vue"),
    },
    {
      path: "/",
      name: "Home",
      component: import("../components/Home.vue"),
    },
    {
        path: "/roulette",
        name: "Roulette",
        component: import("../components/Roulette.vue"),
      },
  ],
});

export default router;