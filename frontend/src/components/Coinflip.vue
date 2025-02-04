<script setup>
import { ref } from "vue";
import Button from "primevue/button";

const result = ref(null); // Az eredmény tárolása változóban
const flipping = ref(false); // Állapot, hogy éppen forog az érem

const flipCoin = () => {
  flipping.value = true; // Kezdődik a forgatás
  setTimeout(() => {
    // Véletlenszerű eredmény kiválasztása
    result.value = Math.random() < 0.5 ? "Fej" : "Írás";
    console.log(result.value); // Az eredmény kiíratása a konzolra
    flipping.value = false; // Leállítjuk a forgatást
  }, 2000); // A forgatás 2 másodpercig tartson
};
</script>

<template>
  <div id="app">
    <Button
      label="Dobjuk fel az érmét!"
      severity="success"
      rounded
      @click="flipCoin"
      class="gombocska"
    />

    <!-- Érme megjelenítése és animáció -->
    <div v-if="flipping" class="coin-container">
      <div class="coin">
        <div class="coin-side coin-front">Fej</div>
        <!-- Elülső oldal -->
        <div class="coin-side coin-back">Írás</div>
        <!-- Hátsó oldal -->
      </div>
    </div>

    <!-- Az érem a forgatás után itt marad -->
    <div v-if="!flipping" class="coin-container">
      <div class="coin">
        <div class="coin-side coin-front" v-show="result === 'Fej'">Fej</div>
        <!-- Fej oldal -->
        <div class="coin-side coin-back" v-show="result === 'Írás'">Írás</div>
        <!-- Írás oldal -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.gombocska {
  background-color: rgb(253, 32, 93);
  border: 1px solid black;
}

.gombocska:hover {
  background-color: rgb(255, 145, 178);
  border: 1px solid black;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}

.coin-container {
  width: 100px;
  height: 100px;
  margin: 20px auto;
  perspective: 1000px; /* 3D hatás */
}

.coin {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: gold;
  border: 5px solid #917507;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  line-height: 100px;
  transform-style: preserve-3d;
  animation: flip 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  /* Az animáció 2 másodpercig tartson és a végén álljon meg */
}

.coin-side {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: white;
  backface-visibility: hidden; /* Elrejtjük a hátoldalt, amikor nem látszik */
}

.coin-front {
  transform: rotateY(0deg); /* Elülső oldal */
}

.coin-back {
  transform: rotateY(180deg); /* Hátsó oldal */
}

@keyframes flip {
  0% {
    transform: rotateY(0deg); /* Kezdő forgás */
  }
  50% {
    transform: rotateY(180deg); /* Középső fordulás */
  }
  100% {
    transform: rotateY(360deg); /* Végső forgás */
  }
}
</style>
