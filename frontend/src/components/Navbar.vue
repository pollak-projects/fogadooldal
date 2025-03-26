<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button
          class="mr-2 home-button"
          :class="{
            'active-button': isActive('/'),
            'current-page': isActive('/'),
            fixszin: !isActive('/'),
          }"
          severity="secondary"
          as="RouterLink"
          to="/home"
          text
        >
          <img src="/logo.png" class="logo" alt="Logo" />
          <span class="home-text">Home</span>
        </Button>

        <Button
          class="mr-2 coinflip-button"
          :class="{
            'active-button': isActive('/coinflip'),
            'current-page': isActive('/coinflip'),
            fixszin: !isActive('/coinflip'),
          }"
          severity="secondary"
          as="RouterLink"
          to="/coinflip"
          text
        >
          <img src="/pink.png" class="coinflip-icon" alt="Coinflip Icon" />
          <span class="coinflip-text">Coinflip</span>
        </Button>

        <Button
          class="mr-2 roulette-button"
          :class="{
            'active-button': isActive('/roulette'),
            'current-page': isActive('/roulette'),
            fixszin: !isActive('/roulette'),
          }"
          severity="secondary"
          as="RouterLink"
          to="/roulette"
          text
        >
          <img src="/roulette1.png" class="roulette-icon" alt="Roulette Icon" />
          <span class="roulette-text">Roulette</span>
        </Button>

        <Button
          class="mr-2 crash-button"
          :class="{
            'active-button': isActive('/crash'),
            'current-page': isActive('/crash'),
            fixszin: !isActive('/crash'),
          }"
          severity="secondary"
          as="RouterLink"
          to="/crash"
          text
        >
          <img src="/cr4sh.png" class="crash-icon" alt="Crash Icon" />
          <span class="crash-text">Crash</span>
        </Button>

        <!-- Új Slot gomb -->
        <Button
          class="mr-2 slot-button"
          :class="{
            'active-button': isActive('/slot'),
            'current-page': isActive('/slot'),
            fixszin: !isActive('/slot'),
          }"
          severity="secondary"
          as="RouterLink"
          to="/slot"
          text
        >
          <img src="/slot.png" class="slot-icon" alt="Slot Icon" />
          <span class="slot-text">Slot</span>
        </Button>
      </template>

      <template #end>
        <img src="/coin.svg" class="coinkep" />
        <div class="coin-balance">
          {{ store.coins }}
        </div>
        <img
          :src="userStore.profileImage"
          class="w-15 rounded-full cursor-pointer profile-border"
          @click="toggleMenu"
        />
        <Menu ref="menu" :model="menuItems" :popup="true" />
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Toolbar, Menu } from "primevue";
import { store } from "../config/store.js";
import { useUserStore } from "../config/store.js";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const menu = ref(null);
const user = ref();

onMounted(() => {
  fetch(
    `http://localhost:3300/user/getAllById/${localStorage.getItem("user_id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    console.log(data);
    user.value = data;
    store.coins = data.coin[0].mennyiseg;
  });

  fetch("url-to-image")
    .then(function (response) {
      return response.blob();
    })
    .then(function (blob) {
      // here the image is a blob
    });
    fetch("http://localhost:3300/user/")
});

const menuItems = ref([
  {
    label: "Segítség",
    icon: "pi pi-question-circle",
    command: () => {
      router.push("/help");
    },
  },
  {
    label: "Fiók adatok",
    icon: "pi pi-user",
    command: () => {
      router.push("/profile");
    },
  },
  {
    label: "Beállítások",
    icon: "pi pi-cog",
    command: () => {
      router.push("/settings");
    },
  },
  {
    label: "Rólunk",
    icon: "pi pi-rolunk",
    command: () => {
      router.push("/rolunk");
    },
  },
  {
    label: "Kijelentkezés",
    icon: "pi pi-sign-out",
    command: () => {
      localStorage.clear();
      router.push("/logout");
    },
  },
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.coinkep {
  width: 25px;
  height: 25px;
}

.coin-balance {
  font-size: 1.25rem;
  color: gold;
  margin-right: 10px;
  font-weight: bold;
}

.card {
  position: fixed;
  z-index: 1001;
  width: 100%;
}

.profile-border {
  border: 2px solid rgb(255, 121, 159);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-border:hover {
  cursor: pointer;
  opacity: 0.8;
}

.crash-button,
.slot-button {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(247, 233, 233);
}

.crash-text,
.slot-text {
  font-size: 1rem;
}

.crash-icon,
.slot-icon {
  width: 35px;
  height: 35px;
  transition: transform 0.3s ease;
}

.crash-button:hover .crash-icon,
.slot-button:hover .slot-icon {
  transform: scale(1.1);
}

.fixszin {
  color: rgb(239, 233, 247) !important;
}

.p-toolbar {
  background-color: rgb(41, 32, 45) !important;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cursor-pointer {
  cursor: pointer;
}

.active-button {
  color: rgb(253, 32, 93) !important;
  transition: color 0.3s ease;
}

.current-page {
  color: rgb(255, 121, 159);
}

.home-button,
.coinflip-button,
.roulette-button,
.crash-button,
.slot-button {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(247, 233, 233);
}

.home-button:hover .home-text,
.coinflip-button:hover .coinflip-text,
.roulette-button:hover .roulette-text,
.crash-button:hover .crash-text,
.slot-button:hover .slot-text {
  color: rgb(253, 32, 93) !important;
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.home-text {
  font-size: 30px;
  transition: transform 0.3s ease;
}

.coinflip-text,
.roulette-text,
.crash-text,
.slot-text {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.logo {
  width: 65px;
  height: 65px;
  transition: transform 0.3s ease;
}

.home-button:hover .logo {
  transform: scale(1.1);
}

.coinflip-icon {
  width: 45px;
  height: 45px;
  transition: transform 0.3s ease;
}

.roulette-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease;
}

.coinflip-button:hover .coinflip-icon,
.roulette-button:hover .roulette-icon {
  transform: scale(1.1);
}

.p-button:hover {
  color: white !important;
  transition: color 0.3s ease;
}

.p-button:active {
  color: rgb(200, 20, 70) !important;
  transition: color 0.3s ease;
}

.p-menu {
  background-color: rgb(41, 32, 45) !important;
}

.p-menuitem-link {
  color: rgb(247, 233, 233);
}

.p-menuitem-link:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: rgb(253, 32, 93) !important;
}

.home-button:hover .logo,
.coinflip-button:hover .coinflip-icon,
.roulette-button:hover .roulette-icon,
.slot-button:hover .slot-icon {
  transform: scale(1.1);
}

.home-button:hover,
.coinflip-button:hover,
.roulette-button:hover,
.crash-button:hover,
.slot-button:hover {
  color: rgb(253, 32, 93);
}
</style>
