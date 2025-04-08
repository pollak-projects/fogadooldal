<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { store } from "../config/store";

const toast = useToast();
const user = ref();
const betAmount = ref(0);
const currentMultiplier = ref(1.0);
const isRunning = ref(false);
const crashed = ref(false);
const crashPoint = ref(0);
const history = ref([]);
const maxMultiplier = 100; // Maximális szorzó, amelynél a játék véget ér

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
  });
});

const crashGame = () => {
  if (!crashed.value) {
    isRunning.value = false;
    crashed.value = true;
    crashPoint.value = currentMultiplier.value;
    history.value.unshift(crashPoint.value.toFixed(2));
  }
};

const startGame = () => {
  // Ellenőrizzük, hogy a tét ne haladja meg a rendelkezésre álló érméket
  if (betAmount.value <= 0 || betAmount.value > store.coins) {
    toast.error("Nincs elég pénzed!", {
      position: "top-right",
    });
    return;
  }

  // Azonnal levonjuk a tétet a store.coins-ból
  store.coins -= Math.round(betAmount.value);

  fetch("http://localhost:3300/coins/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: user.value.id,
      mennyiseg: store.coins,
    }),
  }).then(async (res) => {
    const data = await res.json();
  });

  // Indítjuk a játékot
  isRunning.value = true;
  crashed.value = false;
  currentMultiplier.value = 1.0;

  const interval = setInterval(() => {
    if (isRunning.value) {
      currentMultiplier.value += 0.005; // Lassabb növekedés, hogy ne álljon meg túl hamar

      // Ha a szorzó meghaladja a maximális értéket, crash-eljük a játékot
      if (currentMultiplier.value >= maxMultiplier) {
        toast.error(
          `A szorzó túllépte a ${maxMultiplier}x értéket, a játék leáll!`,
          {
            position: "top-right",
          }
        );
        crashGame();
        clearInterval(interval);
      }

      // Véletlenszerű crash, most csökkentettük az esélyt, hogy ritkábban történjen
      if (Math.random() < 0.005) {
        // 0.5% esély, hogy véget ér a játék
        crashGame(); // Itt már egyszer hívjuk meg
        lost(); // Ha a játék véget ér, akkor a veszteséget is rögzítjük
        clearInterval(interval);
      }
    }
  }, 50); // Növelhetjük az időintervallumot is, hogy lassabban növekedjen a szorzó
};

const cashOut = () => {
  if (!crashed.value) {
    const winnings = betAmount.value * currentMultiplier.value;
    store.coins += Math.round(winnings); // Kerekítjük az nyereményt egész számra
    fetch("http://localhost:3300/coins/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user.value.id,
        mennyiseg: store.coins,
      }),
    }).then(async (res) => {
      const data = await res.json();
    });
    toast.success(
      `Sikeresen kivetted: ${Math.round(
        winnings
      )}, Aktuális egyenleg: ${Math.round(store.coins)}`
    );
    crashGame(); // Itt csak egyszer hívjuk meg a crashGame-t
  }
};

const lost = () => {
  const loss = betAmount.value;
  toast.error(
    `Veszítettél: ${Math.round(loss)}, Aktuális egyenleg: ${Math.round(
      store.coins
    )}`
  );
  crashGame(); // Itt is csak egyszer hívjuk meg a crashGame-t
  fetch("http://localhost:3300/coins/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userid: user.value.id,
      mennyiseg: store.coins,
    }),
  }).then(async (res) => {
    const data = await res.json();
  });
};
</script>

<template>
  <div class="game-container">
    <h1 class="cim">Crash</h1>
    <div class="bet-input">
      <label for="betAmount">Tét:</label>
      <input
        type="number"
        id="betAmount"
        v-model.number="betAmount"
        :disabled="isRunning"
      />
    </div>
    <div class="buttons">
      <button class="start-button" @click="startGame" :disabled="isRunning">
        Start
      </button>
      <button
        class="cash-out-button"
        @click="cashOut"
        :disabled="!isRunning || crashed"
      >
        Cash Out
      </button>
    </div>
    <div
      class="p-3 md:p-4 bg-gray-800 rounded-lg balance flex items-center justify-center"
    >
      <p class="text-lg md:text-xl mr-2">
        Egyenleg: <span>{{ store.coins }}</span>
      </p>
      <img src="/coin.svg" alt="Coin" class="coinkep" />
    </div>
    <div class="multiplier-display">
      <div
        class="multiplier-bar"
        :style="{ width: `${currentMultiplier * 1}%` }"
      ></div>
      <div class="multiplier-text">
        Szorzó: {{ currentMultiplier.toFixed(2) }}x
      </div>
    </div>

    <div v-if="crashed">
      <p>A játék leállt a {{ crashPoint.toFixed(2) }}x szorzónál.</p>
    </div>

    <div class="history">
      <h2>Korábbi Crash-ek:</h2>
      <ul>
        <li v-for="(point, index) in history" :key="index">{{ point }}x</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cim {
  text-align: center;
  font-size: 80px;
  font-weight: bold;
  color: #f39c12;
  text-shadow: 5px 5px 20px rgba(0, 0, 0, 0.6);
  letter-spacing: 3px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 40px;
}
.game-container {
  width: 100%;
  min-height: 85vh;
  padding: 20px;
  text-align: center;
  background-color: rgb(46, 40, 54);
  color: rgb(247, 233, 233);
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bet-input {
  margin-bottom: 20px;
}

.bet-input label {
  font-size: 1.1em;
  margin-right: 10px;
}

.bet-input input {
  padding: 10px;
  font-size: 1em;
  border: 2px solid rgb(253, 32, 93);
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
  margin-top: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-button {
  background-color: rgb(253, 32, 93);
  color: white;
}

.start-button:hover {
  background-color: rgb(206, 30, 80);
}

.start-button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

.cash-out-button {
  background-color: #f44336;
  color: white;
}

.cash-out-button:disabled {
  background-color: #ef9a9a;
  cursor: not-allowed;
}

.multiplier-display {
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  position: relative;
  margin-top: 20px;
  border-radius: 5px;
  overflow: hidden;
}

.multiplier-bar {
  height: 100%;
  background-color: rgb(253, 32, 93);
  transition: width 0.1s;
}

.multiplier-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2em;
  color: #000;
}

.history {
  margin-top: 20px;
}

.history ul {
  list-style-type: none;
  padding: 0;
}

.history li {
  margin: 5px 0;
  font-size: 1.1em;
}
</style>
