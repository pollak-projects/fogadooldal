<script setup>
import { Card, Button } from "primevue";
import Chat from "../components/Chat.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const isChatOpen = ref(true);
const isMobile = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <div class="home-container">
    <div class="sidebar" :class="{ 'mobile-hidden': !isChatOpen && isMobile }">
      <transition name="fade">
        <Button
          v-if="!isChatOpen || isMobile"
          @click="toggleChat"
          class="chat-toggle-button"
          :class="{ 'mobile-button': isMobile }"
          icon="pi pi-arrow-right"
          rounded
          raised
        />
      </transition>
      <transition name="slide-fade">
        <Chat v-if="isChatOpen" @close-chat="toggleChat" />
      </transition>
    </div>
    <div class="main-content">
      <div class="background-container"></div>

      <div class="marquee-wrapper">
        <div class="marquee-container">
          <div class="marquee-content">
            <div class="marquee-text">
              Üdvözöllek a játékok világában! Próbáld ki a Coinflip, Roulette,
              Crash és Slot játékokat, és éld át az izgalmakat! 🎲🎰🚀🎡🍀
            </div>
          </div>
        </div>
      </div>

      <div class="cards-container">
        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Coinflip" src="/coinflip.png" />
          </template>
          <template #title>
            <div class="cimke">Coinflip</div>
          </template>
          <template #content>
            <div class="szoveg">
              <p class="m-0">
                A játékos a gép ellen játszik. Véletlenszerűen dől el hogy a
                "fej" vagy "írás" oldal lesz a nyertes. A játékosnak helyesen
                kell tippelnie hogy nyerjen
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 footer-buttons">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/coinflip"
              />
            </div>
          </template>
        </Card>

        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Roulette" src="/roulette.png" />
          </template>
          <template #title>
            <div class="cimke">Roulette</div>
          </template>
          <template #content>
            <div class="szoveg">
              <p class="m-0">
                A játék egy forgó kerekére épül, ahol a játékosok színekre
                fogadnak. A pörgetés végén egy nyilazott jelző mutatja meg,
                melyik szín lett a nyertes.
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 footer-buttons">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/roulette"
              />
            </div>
          </template>
        </Card>

        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Coinflip" src="/crash.png" />
          </template>
          <template #title>
            <div class="cimke">Crash</div>
          </template>
          <template #content>
            <div class="szoveg">
              <p class="m-0">
                A Crash egy kaszinó játék, ahol a szorzó folyamatosan nő. A cél,
                hogy időben kivegyük a tétet, mielőtt a szorzó lezuhan. Ha
                lezuhan, vesztettél!
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 footer-buttons">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/crash"
              />
            </div>
          </template>
        </Card>

        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Coinflip" src="/slotkep.png" />
          </template>
          <template #title>
            <div class="cimke">Slot</div>
          </template>
          <template #content>
            <div class="szoveg">
              <p class="m-0">
                A slot játék során a játékos pénzt tesz fel, majd pörgetést
                indít. A gép véletlenszerű szimbólumokat mutat, és ha azok
                nyerőt adnak, kifizetést biztosítanak.
              </p>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 footer-buttons">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/slot"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.chat-toggle-button {
  position: fixed;
  top: 50%;
  left: 310px;
  transform: translateY(-50%);
  z-index: 1100;
  background-color: var(--primary-color) !important;
  color: white !important;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.chat-toggle-button:hover {
  background-color: var(--primary-600) !important;
  transform: translateY(-50%) scale(1.1);
}

.chat-toggle-button:deep(.pi) {
  font-size: 1.5rem;
}

.chat-toggle-button.mobile-button {
  left: 10px !important;
  top: 20px !important;
  transform: none !important;
  background-color: var(--primary-600) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 80%;
  }

  .sidebar:not(.mobile-hidden) {
    transform: translateX(0);
  }

  .home-container {
    padding-left: 0;
  }

  .main-content {
    width: 100%;
  }

  .chat-toggle-button.mobile-button {
    display: block !important;
  }
}

.szoveg {
  margin-top: 15px;
  flex-grow: 1;
}

.cimke {
  font-size: 1.5rem;
  margin-bottom: 10px;
  flex-grow: 1;
  text-align: center;
}

.home-container {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  padding-left: 300px;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: calc(100% - 300px);
}

.cards-container {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}

.kartya {
  width: 100%;
  background-color: rgb(41, 32, 45);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 350px;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 8px;
  overflow: hidden;
}

.kartya:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(253, 32, 93, 0.3);
  z-index: 10;
}

.kartya img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.gomb {
  background-color: rgb(253, 32, 93);
  width: 100%;
  margin-top: 20px;
  border: none;
}

.gomb:hover {
  background-color: rgb(206, 30, 80) !important;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgb(46, 40, 54);
  background: linear-gradient(
    140deg,
    rgba(46, 40, 54, 1) 0%,
    rgba(60, 50, 70, 1) 50%,
    rgba(46, 40, 54, 1) 100%
  );
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;
  z-index: -1;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.footer-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}

.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
  padding: 0 20px;
}

.marquee-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.marquee-content {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}

.marquee-text {
  display: inline-block;
  padding-right: 100%;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Responsive styles */
@media (max-width: 1024px) {
  .sidebar {
    width: 250px;
  }

  .home-container {
    padding-left: 250px;
  }

  .main-content {
    width: calc(100% - 250px);
  }

  .cards-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 250px;
    transform: translateX(-100%);
  }

  .sidebar.mobile-hidden {
    transform: translateX(-100%);
  }

  .sidebar:not(.mobile-hidden) {
    transform: translateX(0);
  }

  .home-container {
    padding-left: 0;
  }

  .main-content {
    width: 100%;
    padding: 10px;
  }

  .chat-toggle-button {
    left: 10px !important;
    background-color: var(--primary-600) !important;
  }

  .marquee-wrapper {
    margin-top: 60px;
  }

  .cards-container {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 100%;
  }

  .chat-toggle-button {
    left: calc(100% - 50px);
  }

  .marquee-text {
    font-size: 0.9rem;
  }

  .kartya {
    min-height: 320px;
  }

  .cimke {
    font-size: 1.3rem;
  }

  .szoveg p {
    font-size: 0.9rem;
  }

  .kartya img {
    height: 150px;
  }
}
</style>
