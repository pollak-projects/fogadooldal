<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const betAmount = ref(0);
const currentMultiplier = ref(1.0);
const isRunning = ref(false);
const crashed = ref(false);
const crashPoint = ref(0);
const history = ref([]);

const startGame = () => {
  if (betAmount.value <= 0) {
    toast.error('Kérlek adj meg egy érvényes tétet!', {
      position: "top-right" 
    });
    return;
  }

  isRunning.value = true;
  crashed.value = false;
  currentMultiplier.value = 1.0;

  const interval = setInterval(() => {
    if (isRunning.value) {
      currentMultiplier.value += 0.01;
      if (Math.random() < 0.02) {
        crashGame();
        clearInterval(interval);
      }
    }
  }, 40);
};

const crashGame = () => {
  isRunning.value = false;
  crashed.value = true;
  crashPoint.value = currentMultiplier.value;
  history.value.unshift(crashPoint.value.toFixed(2));
};

const cashOut = () => {
  if (!crashed.value) {
    const winnings = betAmount.value * currentMultiplier.value;
    toast.success(`Sikeresen kivetted: ${winnings.toFixed(2)}`);
    crashGame();
  }
};
</script>

<template>
  <div class="game-container">
    <h1>Crash Játék</h1>
    <div class="bet-input">
      <label for="betAmount">Tét:</label>
      <input type="number" id="betAmount" v-model.number="betAmount" :disabled="isRunning" />
    </div>
    <div class="buttons">
      <button class="start-button" @click="startGame" :disabled="isRunning">Start</button>
      <button class="cash-out-button" @click="cashOut" :disabled="!isRunning || crashed">Cash Out</button>
    </div>

    <div class="multiplier-display">
      <div class="multiplier-bar" :style="{ width: `${currentMultiplier * 10}%` }"></div>
      <div class="multiplier-text">Szorzó: {{ currentMultiplier.toFixed(2) }}x</div>
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
  border: 2px solid #4caf50;
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
  background-color: #4caf50;
  color: white;
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
  background-color: #4caf50;
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