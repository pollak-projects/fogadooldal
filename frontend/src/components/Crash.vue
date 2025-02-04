<script setup>
import { ref, onMounted } from 'vue';

const betAmount = ref(0);
const currentMultiplier = ref(1.0);
const isRunning = ref(false);
const crashed = ref(false);
const crashPoint = ref(0);
const history = ref([]);

const startGame = () => {
  if (betAmount.value <= 0) {
    alert('Kérlek adj meg egy érvényes tétet!');
    return;
  }

  isRunning.value = true;
  crashed.value = false;
  currentMultiplier.value = 1.0;

  const interval = setInterval(() => {
    if (isRunning.value) {
      currentMultiplier.value += 0.1;
      if (Math.random() < 0.02) {
        crashGame();
        clearInterval(interval);
      }
    }
  }, 100);
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
    alert(`Sikeresen kivetted: ${winnings.toFixed(2)}`);
    crashGame();
  }
};
</script>

<template>
  <div>
    <h1>Crash Játék</h1>
    <div>
      <label for="betAmount">Tét:</label>
      <input type="number" id="betAmount" v-model.number="betAmount" :disabled="isRunning" />
    </div>
    <button @click="startGame" :disabled="isRunning">Start</button>
    <button @click="cashOut" :disabled="!isRunning || crashed">Cash Out</button>

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
.multiplier-display {
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  position: relative;
  margin-top: 20px;
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
}
</style>