<script setup>
import { ref } from "vue";
import Button from "primevue/button";

const eredmeny = ref(null); // Az eredmény tárolása változóban
const forog = ref(false); // Állapot, hogy éppen forog az érem

const ermeKlikk = () => {
  forog.value = true; // Kezdődik a forgatás
  setTimeout(() => {
    // Véletlenszerű eredmény kiválasztása
    eredmeny.value = Math.random() < 0.5 ? "Fej" : "Írás";
    console.log(eredmeny.value); // Az eredmény kiíratása a konzolra
    forog.value = false; // Leállítjuk a forgatást
  }, 2000); // A forgatás 2 másodpercig tartson
};
</script>

<template>
  <h1 class="cim">Coinflip</h1>
  <div id="app">
    <Button
      label="Dobjuk fel az érmét!"
      severity="success"
      rounded
      @click="ermeKlikk"
      class="gomb"
    />
    <!-- Érme megjelenítése és animáció -->
    <div v-if="forog" class="ermetarto">
      <div class="erme">
        <div class="erme-oldal erme-elso">Fej</div>
        <!-- Elülső oldal -->
        <div class="erme-oldal erme-hatso">Írás</div>
        <!-- Hátsó oldal -->
      </div>
    </div>

    <!-- Az érem a forgatás után itt marad -->
    <div v-if="!forog" class="ermetarto">
      <div class="erme">
        <!-- A végső eredmény oldalának megjelenítése -->
        <div class="erme-oldal erme-elso" v-if="eredmeny === 'Fej'">Fej</div>
        <!-- Fej oldal -->
        <div class="erme-oldal erme-elso" v-if="eredmeny === 'Írás'">Írás</div>
        <!-- Írás oldal -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.cim {
  text-align: center;
  font-size: 80px;
}

.gomb {
  background-color: #1abc9c;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.gomb:hover {
  background-color: #16a085;
}

#app {
  text-align: center;
  margin-top: 60px;
}

button {
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
}

.ermetarto {
  width: 220px;
  height: 220px;
  margin: 20px auto;
  perspective: 1000px; /* 3D hatás */
}

.erme {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    145deg,
    #f1c40f,
    #f39c12
  ); /* Arany szín gradiens */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: bold;
  color: white;
  text-align: center;
  transform-style: preserve-3d;
  animation: flip 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  position: absolute;
}

.erme-oldal {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: white;
  backface-visibility: hidden; /* Elrejtjük a hátoldalt, amikor nem látszik */
}

.erme-elso {
  transform: rotateY(0deg); /* Elülső oldal */
}

.erme-hatso {
  transform: rotateY(180deg); /* Hátsó oldal */
}

@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
