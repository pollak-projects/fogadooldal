<script setup>
import { Card, Button } from "primevue";
import Chat from '../components/Chat.vue'; 
</script>

<template>
  <div class="home-container">
    <div class="sidebar">
      <Chat />
    </div>
    <div class="main-content">
      <div class="background-container"></div>
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
A játékos a gép ellen játszik. Véletlenszerűen dől el
hogy a "fej" vagy "írás" oldal lesz a nyertes. A játékosnak helyesen kell tippelnie hogy nyerjen
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
A játék egy forgó kerekére épül, ahol a játékosok színekre fogadnak. 
A pörgetés végén egy nyilazott jelző mutatja meg, melyik szín lett a nyertes. 

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
          A játékosok egy folyamatosan gyorsuló grafikonon próbálnak időben kiszállni, mielőtt az összeomlik.
           Minél magasabbra emelkedik a grafikon, annál nagyobb a potenciális nyeremény, de a kockázat is nő.
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.szoveg {
  margin-top: 15px;
  flex-grow: 1; 
}

.cimke {
  text-align: center; 
  font-size: 1.5rem; 
  margin-bottom: 10px;
}

.home-container {
  display: flex;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.cards-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  overflow-x: auto; /* Ha a képernyő túl kicsi, legyen görgethető */
}

.kartya {
  background-color: rgb(41, 32, 45);
  color: white;
  width: 25rem;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 400px; /* Állítsd be a kártya minimális magasságát */
  flex-shrink: 0; /* Ne zsugorodjon össze a kártya */
}

.gomb {
  background-color: rgb(253, 32, 93);
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}

.gomb:hover {
  background-color: rgb(206, 30, 80);
  border: 1px solid rgb(255, 121, 159);
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
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

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.footer-buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>