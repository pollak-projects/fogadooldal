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
      path: "/slot",
      name: "Slot",
      component: import("../components/Slot.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: import("../components/Home.vue"),
    },

    {
      path: "/rolunk",
      name: "Rolunk",
      component: import("../components/Rolunk.vue"),
    },


    {
      path: "/roulette",
      name: "Roulette",
      component: import("../components/Roulette.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: import("../components/Register.vue"),
    },

    {
      path: "/",
      name: "Openpage",
      component: import("../components/Login.vue"),
    },


    {
      path: "/help",
      name: "Help",
      component: import("../components/Help.vue"),
    },

    {
      path: "/settings",
      name: "Settings",
      component: import("../components/Settings.vue"),
    },

    {
      path: "/profile",
      name: "Profile",
      component: import("../components/Profile.vue"),
    },

    {
      path: "/crash",
      name: "Crash",
      component: import("../components/Crash.vue"),
    },
    
    {
      path: "/logout",
      name: "Logout",
      component: import("../components/Login.vue"),
    },
  {
    path: "/login",
      name: "Login",
      component: import("../components/Login.vue"),
    },
    {
      path: "/jelszovisszaallitas",
      name: "Jelszovisszaallitas",
      component: import("../components/ResetPass.vue"),
    },
    {
      path: "/jelszoHandle",
      name: "jelszoHandle",
      component: import("../components/PassHandle.vue"),
    },

        {
      path: "/megerosites",
      name: "Megerősítés",
      component: import("../components/Megerosites.vue"),
    },
  ],
});

export default router;
