<script setup>
import {RouterLink} from "vue-router"
</script>


<template>
  <div class="background-container"></div>
  <div class="stars"></div>
  <div class="stars stars2"></div>
  <div class="stars stars3"></div>

  <div class="kartyakok">
    <div class="test">
      <img src="/welcome.png" alt="welcome" />
      <div class="text-overlay">
        Üdvözlünk a <br />
        BetWise oldalán!
      </div>
    </div>
    <div class="kartya-container">
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
          <img alt="Roulette" src="/roulette.jpg" />
        </template>
        <template #title>Roulette</template>
        <template #content>
          <p class="m-0">
            A roulette egy klasszikus kaszinó játék, ahol a szerencsén múlik,
            hogy a golyó melyik számra esik. <br /><br />
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
    </div>
  </div>
</template>

<style scoped>
.kartyakok {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

/* Alap háttér beállítások */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    140deg,
    rgb(67, 44, 77),
    rgb(102, 54, 67),
    rgb(76, 32, 85)
  );
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;
  z-index: -1; /* Az animált háttér a legalsó rétegen legyen */
}

/* Animációk a háttér változtatásához */
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

/* Csillagok animációja */
.stars,
.stars2,
.stars3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff'/%3E%3C/svg%3E");
  filter: blur(1px);
  z-index: -1; /* A csillagok is a háttérben */
}

.stars2 {
  animation: moveStars 80s linear infinite;
  filter: blur(2px);
}

.stars3 {
  animation: moveStars 120s linear infinite;
  filter: blur(3px);
}

@keyframes moveStars {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

/* A képet és szöveget tartalmazó div beállításai */
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 60vh; /* A kép és szöveg magasságának beállítása */
  z-index: 1; /* Kép és szöveg a kártyák előtt legyen */
  flex-direction: column;
}

.test img {
  max-width: 100%;
  height: auto;
  border-radius: 5%; /* A kép teljes kerekítése */
}

.text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  pointer-events: none;
  text-align: center;
}

/* A kártyák konténerének beállításai */
.kartya-container {
  top: 65%; /* Kártyák elhelyezése a háttér fölött */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 20px;
  z-index: 1; /* Kártyák a háttér előtt */
}

/* A kártyák stílusa */
.kartya {
  background-color: rgb(41, 32, 45);
  color: white;
  width: 25rem;
  z-index: 1;
  margin-top: 100px;
}

/* Gomb stílusa */
.gomb {
  background-color: rgb(253, 32, 93);
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.gomb:hover {
  background-color: rgb(255, 121, 159);
  border: 1px solid rgb(255, 121, 159);
}
</style>
