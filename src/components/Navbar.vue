<template>
  <div class="card">
    <Toolbar>
      <template #start>
        <Button
          class="mr-2 home-button"
          :class="{ 'active-button': isActive('/'), 'current-page': isActive('/'), 'fixszin': !isActive('/') }"
          severity="secondary"
          as="RouterLink"
          to="/"
          text
        >
          <img src="/logo.png" class="logo" alt="Logo" />
          <span class="home-text">Home</span>
        </Button>

        <Button
          class="mr-2 coinflip-button"
          :class="{ 'active-button': isActive('/coinflip'), 'current-page': isActive('/coinflip'), 'fixszin': !isActive('/coinflip') }"
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
          :class="{ 'active-button': isActive('/roulette'), 'current-page': isActive('/roulette'), 'fixszin': !isActive('/roulette') }"
          severity="secondary"
          as="RouterLink"
          to="/roulette"
          text
        >
          <img src="/roulette1.png" class="roulette-icon" alt="Roulette Icon" />
          <span class="roulette-text">Roulette</span>
        </Button>
      </template>

      <template #end>
        <img src="/pfp.png" class="w-15 rounded-full cursor-pointer" @click="toggleMenu" />
        <Menu ref="menu" :model="menuItems" :popup="true" />
      </template>
    </Toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, Toolbar, Menu } from 'primevue';

const route = useRoute();
const router = useRouter();
const menu = ref(null);

const menuItems = ref([
  {
    label: 'Segítség',
    icon: 'pi pi-question-circle',
    command: () => {
      router.push('/help');
    },
  },
  {
    label: 'Fiók adatok',
    icon: 'pi pi-user',
    command: () => {
      router.push('/account');
    },
  },
  {
    label: 'Beállítások',
    icon: 'pi pi-cog',
    command: () => {
      router.push('/settings');
    },
  },
  {
    label: 'Kijelentkezés',
    icon: 'pi pi-sign-out',
    command: () => {
      
      router.push('/logout');
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

.fixszin {
  color: rgb(247, 233, 233) !important;
}

.p-toolbar {
  background-color: rgb(41, 32, 45) !important;
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
.roulette-button {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgb(247, 233, 233); 
}

.home-text {
  font-weight: bold;
  font-size: 1.25rem;
}

.coinflip-text,
.roulette-text {
  font-size: 1rem; 
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
  color: rgb(253, 32, 93) !important; 
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
</style>