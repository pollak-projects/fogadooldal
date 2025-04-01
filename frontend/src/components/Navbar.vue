<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <!-- Mobile menu button (only visible on small screens) -->
        <Button
          v-if="isMobile"
          icon="pi pi-bars"
          @click="toggleMobileMenu"
          class="mobile-menu-button"
          text
        >
          <img src="/logo.png" alt="Logo" />
        </Button>
        <!-- Navigation links -->
        <div class="nav-links" :class="{ 'mobile-visible': mobileMenuOpen }">
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
            <img
              src="/roulette1.png"
              class="roulette-icon"
              alt="Roulette Icon"
            />
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
        </div>
      </template>

      <template #end>
        <div class="user-section">
          <img src="/coin.svg" class="coinkep" />
          <div class="coin-balance">
            {{ store.coins }}
          </div>
          <img
            :src="userStore.profileImage"
            class="profile-image rounded-full cursor-pointer profile-border"
            @click="toggleMenu"
          />
          <Menu ref="menu" :model="menuItems" :popup="true" />
        </div>
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Toolbar, Menu } from "primevue";
import { store } from "../config/store.js";
import { useUserStore } from "../config/store.js";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const menu = ref(null);
const user = ref();
const isMobile = ref(false);
const mobileMenuOpen = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 992;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

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
    user.value = data;
    store.coins = data.coin[0].mennyiseg;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

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
    icon: "pi pi-info-circle",
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
/* Alapstílusok */
.card {
  position: fixed;
  z-index: 1001;
  width: 100%;
  top: 0;
}

.p-toolbar {
  background-color: rgb(41, 32, 45) !important;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Navigációs gombok */
.home-button,
.coinflip-button,
.roulette-button,
.crash-button,
.slot-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(247, 233, 233);
  transition: all 0.3s ease;
}

.home-text {
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.coinflip-text,
.roulette-text,
.crash-text,
.slot-text {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.logo {
  width: 65px;
  height: 65px;
  transition: transform 0.3s ease;
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

.crash-icon,
.slot-icon {
  width: 35px;
  height: 35px;
  transition: transform 0.3s ease;
}

/* Aktív/hover állapotok */
.active-button {
  color: rgb(253, 32, 93) !important;
}

.current-page {
  color: rgb(255, 121, 159);
}

.fixszin {
  color: rgb(239, 233, 247) !important;
}

.home-button:hover .logo,
.coinflip-button:hover .coinflip-icon,
.roulette-button:hover .roulette-icon,
.crash-button:hover .crash-icon,
.slot-button:hover .slot-icon {
  transform: scale(1.1);
}

.home-button:hover .home-text,
.coinflip-button:hover .coinflip-text,
.roulette-button:hover .roulette-text,
.crash-button:hover .crash-text,
.slot-button:hover .slot-text {
  color: rgb(253, 32, 93) !important;
}

/* Felhasználói rész */
.user-section {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.coinkep {
  width: 25px;
  height: 25px;
}

.coin-balance {
  font-size: 1.25rem;
  color: gold;
  font-weight: bold;
}

.profile-border {
  border: 2px solid rgb(255, 121, 159);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.profile-border:hover {
  opacity: 0.8;
  cursor: pointer;
}

/* Mobil menü */
.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  padding: 0;
  margin-right: 1rem;
}

.mobile-logo {
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.mobile-menu-button:hover .mobile-logo {
  transform: scale(1.1);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Reszponzív stílusok */
@media (max-width: 1199px) {
  .home-text {
    font-size: 1.5rem;
  }

  .coinflip-text,
  .roulette-text,
  .crash-text,
  .slot-text {
    font-size: 1.1rem;
  }

  .logo {
    width: 50px;
    height: 50px;
  }

  .coinflip-icon {
    width: 35px;
    height: 35px;
  }

  .profile-border {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 991px) {
  .mobile-menu-button {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: rgb(41, 32, 45);
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
  }

  .nav-links.mobile-visible {
    display: flex;
  }

  .home-button,
  .coinflip-button,
  .roulette-button,
  .crash-button,
  .slot-button {
    width: 100%;
    justify-content: flex-start;
    padding: 0.8rem 1rem;
  }

  .user-section {
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .home-text {
    font-size: 1.3rem;
  }

  .coinflip-text,
  .roulette-text,
  .crash-text,
  .slot-text {
    font-size: 1rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .coinflip-icon {
    width: 30px;
    height: 30px;
  }

  .roulette-icon,
  .crash-icon,
  .slot-icon {
    width: 25px;
    height: 25px;
  }

  .coin-balance {
    font-size: 1rem;
  }

  .profile-border {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 575px) {
  .p-toolbar {
    padding: 0.5rem;
  }

  .home-text {
    font-size: 1.1rem;
  }

  .coinflip-text,
  .roulette-text,
  .crash-text,
  .slot-text {
    font-size: 0.9rem;
  }

  .logo {
    width: 35px;
    height: 35px;
  }

  .coinflip-icon {
    width: 25px;
    height: 25px;
  }

  .user-section {
    gap: 0.5rem;
  }
}

/* Menü stílusok */
.p-menu {
  background-color: rgb(41, 32, 45) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.p-menuitem-link {
  color: rgb(247, 233, 233);
  transition: all 0.3s ease;
}

.p-menuitem-link:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: rgb(253, 32, 93) !important;
}
</style>
