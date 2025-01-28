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
    {
      path: "/register",
      name: "Register",
      component:import( "../components/Register.vue"),
    },

    {
      path: "/",
      name: "Openpage",
      component:import( "../components/Home.vue"),
    },

        
    {
      path: "/login",
      name: "Login",
      component:import( "../components/Login.vue"),
    },
    ],
});

export default router;