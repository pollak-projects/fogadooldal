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
   <div class="home-container">
    <div class="main-content">
      <div class="cards-container">
        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Coinflip" src="/coinflip.png" />
          </template>
          <template #title>Coinflip</template>
          <template #content>
            <p class="m-0">
              A coinflip egy egyszerű játék, ahol egy érme feldobásával döntünk,
              hogy fej vagy írás lesz-e. Az esélyek 50-50%-osak, és a végeredmény
              véletlenszerű.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
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
          <template #title>Roulette</template>
          <template #content>
            <p class="m-0">
              A roulette egy klasszikus kaszinó játék, ahol a szerencsén múlik,
              hogy a golyó melyik számra esik.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
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
            <img alt="Crash" src="/crash.png" />
          </template>
          <template #title>Crash</template>
          <template #content>
            <p class="m-0">
              A Crash egy olyan szerencsejáték, ahol a cél minél magasabb szorzónál kiszállni,
              mielőtt a szorzó összeomlik.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
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
    </div>
  </div>



 
</template>

<style scoped>



.main-content {
  flex-grow: 1;
}

.username {
  font-weight: 900;
  margin-right: 8px;
}

.message-text {
  font-weight: 100;
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
  margin-left: 50px;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.kartya {
  background-color: rgb(41, 32, 45);
  color: white;
  width: 25rem;
  margin-top: 20px;
}

.gomb {
  background-color: rgb(253, 32, 93);
  width: 100%;
  margin-top: 10px;
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
</style>
