<template>
  <div class="roulette-container bg-gray-900 text-white min-h-screen flex flex-col items-center p-6 pt-24">
    <h1 class="text-4xl font-bold mb-6 animate-pulse">Vue Roulette</h1>
    
    <!-- Roulette Wheel -->
    <div class="relative mb-8">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div class="w-0 h-0 border-l-12 border-r-12 border-b-24 border-transparent border-b-yellow-400"></div>
      </div>
      <div class="roulette-wheel flex overflow-hidden border-4 border-yellow-500 rounded-lg w-[800px] h-32 relative bg-gray-800">
        <div class="flex" :style="wheelStyle">
          <div v-for="(item, index) in wheel" :key="index" 
               class="p-6 text-3xl w-40 text-center font-bold flex items-center justify-center"
               :class="getColorClass(item)">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Info Section -->
    <div class="info-container flex gap-8 mb-8">
      <div class="p-4 bg-gray-800 rounded-lg">
        <p class="text-xl">Time Left: <span class="font-mono">{{ timer }}</span></p>
      </div>
      <div class="p-4 bg-gray-800 rounded-lg">
        <p class="text-xl">Balance: <span class="font-mono text-green-400">${{ balance }}</span></p>
      </div>
    </div>

    <!-- Chip Selector -->
    <div class="chip-selector flex gap-4 mb-6">
      <button v-for="chip in chips" :key="chip" @click="selectChip(chip)"
              class="w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 border-yellow-500"
              :class="selectedChip === chip ? 'bg-yellow-500 text-black' : 'bg-gray-800 text-yellow-500'">
        {{ chip }}
      </button>
    </div>

    <!-- Betting Section -->
    <div class="betting-section grid grid-cols-3 gap-4 mb-8 w-[800px]">
      <div v-for="bet in betOptions" :key="bet.multiplier" 
           class="bet-card p-4 rounded-lg text-center cursor-pointer transform transition hover:scale-105"
           :class="[bet.color, { 'ring-4 ring-yellow-500': activeBets[bet.label] }, bet.hoverColor]"
           @click="placeBet(bet)">
        <p class="text-2xl font-bold mb-2">{{ bet.label }}</p>
        <p class="text-sm opacity-80">Pays {{ bet.multiplier }}x</p>
        <p class="mt-2 text-yellow-400">${{ activeBets[bet.label] || 0 }}</p>
      </div>
    </div>

    <!-- Current Bets -->
    <div class="current-bets bg-gray-800 p-4 rounded-lg mb-6 w-96" v-if="Object.values(activeBets).some(b => b > 0)">
      <h2 class="text-xl font-bold mb-2">Current Bets</h2>
      <div class="flex flex-wrap gap-2">
        <div v-for="(amount, type) in activeBets" :key="type" v-if="amount > 0"
             class="px-3 py-1 rounded-full text-sm" :class="getBetClass(type)">
          {{ type }}: ${{ amount }}
        </div>
      </div>
    </div>

    <!-- History Section -->
    <div class="history-section bg-gray-800 p-4 rounded-lg w-96 max-h-32 overflow-y-auto">
      <h2 class="text-xl font-bold mb-2">Previous Rolls</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="(item, index) in limitedHistory" :key="index" 
              class="px-3 py-1 rounded-full text-sm" :class="getColorClass(item)">
          {{ getSymbolLabel(item) }}
        </span>
      </div>
    </div>

    <!-- Audio Elements -->
    <audio ref="spinSound" src="https://assets.mixkit.co/sfx/preview/mixkit-wheel-spin-1027.mp3"></audio>
    <audio ref="winSound" src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Roulette wheel setup
const createWheel = () => {
  const baseWheel = ["🟢", ...Array(24).fill().flatMap(() => ["🔴", "⚫"])];
  return [...baseWheel, ...baseWheel, ...baseWheel, ...baseWheel]; // 4x duplikálva
};

const wheel = ref(createWheel());
const currentPosition = ref(0); // Kezdő pozíció
const bettingOpen = ref(true);
const timer = ref(15);
const history = ref([]);
const balance = ref(5000);
const activeBets = ref({ Red: 0, Green: 0, Black: 0 });
const selectedChip = ref(100);
const chips = [10, 50, 100, 500];
const spinSound = ref(null);
const winSound = ref(null);

const betOptions = ref([
  { 
    label: "Red", 
    multiplier: 2, 
    color: "bg-red-600", 
    hoverColor: "hover:bg-red-700" 
  },
  { 
    label: "Green", 
    multiplier: 14, 
    color: "bg-green-600", 
    hoverColor: "hover:bg-green-700" 
  },
  { 
    label: "Black", 
    multiplier: 2, 
    color: "bg-gray-900", 
    hoverColor: "hover:bg-gray-800" 
  }
]);

const wheelStyle = computed(() => ({
  transform: `translateX(-${currentPosition.value * 160}px)`,
  transition: bettingOpen.value ? 'none' : 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)',
  willChange: 'transform'
}));

const limitedHistory = computed(() => history.value.slice(0, 10));

const startTimer = () => {
  const countdown = setInterval(() => {
    timer.value--;
    if (timer.value === 0) {
      clearInterval(countdown);
      bettingOpen.value = false;
      spinWheel();
    }
  }, 1000);
};

const spinWheel = () => {
  spinSound.value.play();
  const targetIndex = Math.floor(Math.random() * 49); // Véletlenszerű célpozíció
  const fullSpins = 4; // Teljes körök száma
  const totalSteps = (fullSpins * wheel.value.length) + targetIndex;
  
  currentPosition.value = totalSteps;
  
  setTimeout(() => {
    const finalPosition = totalSteps % wheel.value.length;
    const winningColor = wheel.value[finalPosition % 49]; // Nyerőszín kiválasztása
    
    history.value.unshift(winningColor);
    if (history.value.length > 50) history.value.pop();
    
    resolveBets(winningColor);
    bettingOpen.value = true;
    timer.value = 15;
    resetBets();
    
    currentPosition.value = finalPosition + (4 * 49); // Pozíció visszaállítása
  }, 5000);
};

const selectChip = (chip) => {
  selectedChip.value = chip;
};

const placeBet = (bet) => {
  if (!bettingOpen.value || balance.value < selectedChip.value) return;
  
  balance.value -= selectedChip.value;
  activeBets.value[bet.label] += selectedChip.value;
};

const resolveBets = (winningColor) => {
  const winType = winningColor === "🔴" ? "Red" : 
                 winningColor === "⚫" ? "Black" : "Green";
  const multiplier = betOptions.value.find(b => b.label === winType).multiplier;
  const winAmount = activeBets.value[winType] * multiplier;
  
  if (winAmount > 0) {
    balance.value += winAmount;
    winSound.value.play();
  }
};

const resetBets = () => {
  activeBets.value = { Red: 0, Green: 0, Black: 0 };
};

const getColorClass = (symbol) => {
  return {
    'bg-red-600': symbol === "🔴",
    'bg-gray-900': symbol === "⚫",
    'bg-green-600': symbol === "🟢"
  };
};

const getBetClass = (type) => {
  return {
    'bg-red-600/30 text-red-400': type === 'Red',
    'bg-green-600/30 text-green-400': type === 'Green',
    'bg-gray-900/30 text-gray-400': type === 'Black'
  };
};

const getSymbolLabel = (symbol) => {
  return { "🔴": "Red", "⚫": "Black", "🟢": "Green" }[symbol];
};

onMounted(() => {
  startTimer();
});
</script>

<style>
.roulette-wheel {
  will-change: transform;
  overflow: hidden;
}

.roulette-wheel > div {
  display: flex;
  min-width: max-content;
}

.roulette-wheel div div {
  min-width: 160px;
  height: 128px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  backface-visibility: hidden;
  transform: translateZ(0);
  flex-shrink: 0;
}

/* Black hover fix */
.bg-gray-900:hover {
  background-color: #1a1a1a !important;
}

.history-section {
  scrollbar-width: thin;
  scrollbar-color: #6B7280 #374151;
}

.history-section::-webkit-scrollbar {
  width: 8px;
}

.history-section::-webkit-scrollbar-track {
  background: #374151;
}

.history-section::-webkit-scrollbar-thumb {
  background: #6B7280;
  border-radius: 4px;
}

.bet-card {
  transition: all 0.2s ease;
}

.current-bets div {
  transition: all 0.2s ease;
}

.history-section span {
  transition: all 0.2s ease;
}
</style>