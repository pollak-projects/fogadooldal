<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed } from "vue";

const route = useRoute();
const router = useRouter();

const INACTIVITY_TIMEOUT = 30 * 60 * 1000;
const WARNING_TIMEOUT = INACTIVITY_TIMEOUT - 60 * 1000;

let inactivityTimer = ref(null);
let warningTimer = ref(null);
const showWarning = ref(false);
const countdown = ref(60);
const isLoggedIn = ref(false);

const resetInactivityTimer = () => {
  if (!isLoggedIn.value) return; 

  if (inactivityTimer.value) {
    clearTimeout(inactivityTimer.value);
  }
  if (warningTimer.value) {
    clearTimeout(warningTimer.value);
  }
  showWarning.value = false;
  countdown.value = 60;
  inactivityTimer.value = setTimeout(logoutUser, INACTIVITY_TIMEOUT);
  warningTimer.value = setTimeout(showWarningMessage, WARNING_TIMEOUT);
};

const showWarningMessage = () => {
  showWarning.value = true;
  startCountdown();
};

const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const logoutUser = () => {
  console.log("Felhasználó kijelentkeztetve inaktivitás miatt.");
  showWarning.value = false;
  isLoggedIn.value = false; 
  router.push({ path: "/logout", query: { reason: "inactivity" } });
};

const setupInactivityListener = () => {
  window.addEventListener("mousemove", resetInactivityTimer);
  window.addEventListener("keydown", resetInactivityTimer);
  window.addEventListener("click", resetInactivityTimer);
  window.addEventListener("scroll", resetInactivityTimer);
};

const cleanupInactivityListener = () => {
  window.removeEventListener("mousemove", resetInactivityTimer);
  window.removeEventListener("keydown", resetInactivityTimer);
  window.removeEventListener("click", resetInactivityTimer);
  window.removeEventListener("scroll", resetInactivityTimer);
};

onMounted(() => {

  isLoggedIn.value = route.path !== "/login" && route.path !== "/register" && route.path !== "/logout";
  
  if (isLoggedIn.value) {
    resetInactivityTimer();
    setupInactivityListener();
  }
});

onUnmounted(() => {
  cleanupInactivityListener();
  if (inactivityTimer.value) {
    clearTimeout(inactivityTimer.value);
  }
  if (warningTimer.value) {
    clearTimeout(warningTimer.value);
  }
});
</script>

<template>
  <Navbar v-if="route.path != '/' && route.path != '/register' && route.path != '/logout'" />
  <RouterView />
  <Footer v-if="route.path != '/' && route.path != '/register' && route.path != '/logout'" />

  <div v-if="showWarning" class="warning-message">
    <p>Inaktivitás miatt {{ countdown }} másodperc múlva kijelentkeztetjük.</p>
  </div>

  <div v-if="route.query.reason === 'inactivity'" class="logout-message">
    <p>Inaktivitás miatt ki lettél jelentkeztetve.</p>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");

body {
  background-color: rgb(46, 40, 54);
  font-family: "Averia Serif Libre", serif;
}

.warning-message {
  position: fixed;
  top: 120px;
  right: 20px;
  background-color: #ffcc00;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logout-message {
  position: fixed;
  top: 40px;
  right: 20px;
  background-color: #ff4444;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
</style>