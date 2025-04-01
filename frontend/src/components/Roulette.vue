<template>
  <div
    class="roulette-container text-white min-h-screen flex flex-col items-center p-4 pt-20 md:pt-24 overflow-y-auto"
  >
    <h1 class="text-3xl md:text-4xl font-bold mb-4 md:mb-6 cim">Roulette</h1>

    <!-- Roulette Wheel -->
    <div class="relative mb-6 md:mb-8 w-full max-w-[800px] px-2">
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div
          class="w-0 h-0 border-l-8 md:border-l-12 border-r-8 md:border-r-12 border-b-16 md:border-b-24 border-transparent border-b-yellow-400"
        ></div>
      </div>
      <div
        class="roulette-wheel flex overflow-hidden border-4 border-yellow-500 rounded-lg w-full h-24 md:h-32 relative bg-gray-800 mx-auto"
      >
        <div class="flex" :style="wheelStyle">
          <div
            v-for="(item, index) in wheel"
            :key="index"
            class="p-4 md:p-6 w-32 md:w-40 h-full flex items-center justify-center"
            :class="getColorClass(item)"
          ></div>
        </div>
      </div>
    </div>

    <!-- Info Section - Now always stacked vertically -->
    <div
      class="info-container flex flex-col gap-2 mb-6 w-full max-w-[800px] px-2"
    >
      <div class="p-3 md:p-4 bg-gray-800 rounded-lg text-center">
        <p class="text-lg md:text-xl">
          Hátralévő idő: <span>{{ timer }}mp</span>
        </p>
      </div>

      <div
        class="p-3 md:p-4 bg-gray-800 rounded-lg balance flex items-center justify-center"
      >
        <p class="text-lg md:text-xl mr-2">
          Egyenleg: <span>{{ store.coins }}</span>
        </p>
        <img src="/coin.svg" alt="Coin" class="coinkep" />
      </div>
    </div>

    <!-- Rest of the template remains the same -->
    <!-- Chip Selector -->
    <div
      class="chip-selector flex gap-3 md:gap-4 mb-6 flex-wrap justify-center"
    >
      <button
        v-for="chip in chips"
        :key="chip"
        @click="selectChip(chip)"
        class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold border-2 border-yellow-500 text-sm md:text-base"
        :class="
          selectedChip === chip
            ? 'bg-yellow-500 text-black'
            : 'bg-gray-800 text-yellow-500'
        "
      >
        {{ chip }}
      </button>
    </div>

    <!-- Betting Section -->
    <div
      class="betting-section grid grid-cols-3 gap-3 md:gap-4 mb-6 w-full max-w-[800px] px-2"
    >
      <div
        v-for="bet in betOptions"
        :key="bet.multiplier"
        class="bet-card p-3 md:p-4 rounded-lg text-center cursor-pointer transform transition hover:scale-105"
        :class="[
          bet.color,
          { 'ring-2 md:ring-4 ring-yellow-500': activeBets[bet.label] },
          bet.hoverColor,
        ]"
        @click="placeBet(bet)"
      >
        <p class="text-xl md:text-2xl font-bold mb-1 md:mb-2"></p>
        <p class="text-xs md:text-sm opacity-80">{{ bet.multiplier }}x</p>
        <p class="mt-1 md:mt-2 text-yellow-400 text-sm md:text-base">
          {{ activeBets[bet.label] || 0 }}
        </p>
      </div>
    </div>

    <!-- History Section -->
    <div
      class="history-section bg-gray-800 p-3 md:p-4 rounded-lg w-full md:w-96 max-h-32 overflow-y-auto max-w-[800px]"
    >
      <h2 class="text-lg md:text-xl font-bold mb-2">Előző körök:</h2>
      <div class="flex flex-wrap gap-1 md:gap-2">
        <span
          v-for="(item, index) in limitedHistory"
          :key="index"
          class="px-2 py-1 rounded-full text-xs md:text-sm"
          :class="getColorClass(item)"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script section remains exactly the same
import { store } from "../config/store";
import { ref, computed, onMounted } from "vue";

// Roulette wheel setup
const createWheel = () => {
  const baseWheel = [
    "🟢", // Green
    ...Array(24)
      .fill()
      .flatMap(() => ["🔴", "⚫"]), // Red and Black
  ];
  return [...baseWheel, ...baseWheel, ...baseWheel, ...baseWheel]; // 4x duplikálva
};

const wheel = ref(createWheel());
const currentPosition = ref(0); // Kezdő pozíció
const bettingOpen = ref(true);
const timer = ref(15);
const history = ref([]);
const activeBets = ref({ Red: 0, Green: 0, Black: 0 });
const selectedChip = ref(100);
const chips = [10, 50, 100, 500];
const user = ref();
const roundCounter = ref(1); // Track which round the wheel is on

const betOptions = ref([
  {
    label: "Red",
    multiplier: 2,
    color: "bg-red-600",
    hoverColor: "hover:bg-red-700",
  },
  {
    label: "Green",
    multiplier: 14,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
  },
  {
    label: "Black",
    multiplier: 2,
    color: "bg-gray-900",
    hoverColor: "hover:bg-gray-800",
  },
]);
const wheelStyle = computed(() => {
  const rotation =
    (currentPosition.value % wheel.value.length) *
    (window.innerWidth < 768 ? 128 : 160);
  const isSpinning = !bettingOpen.value;

  // Set transition speed based on round counter
  const transitionDuration = roundCounter.value <= 1 ? "5s" : "2s"; // Faster spin for rounds 2 and 3

  return {
    transform: `translateX(-${rotation}px)`,
    transition: isSpinning
      ? `transform ${transitionDuration} cubic-bezier(0.25, 0.1, 0.25, 1)`
      : "none",
    willChange: "transform",
  };
});

const limitedHistory = computed(() => history.value.slice(0, 10));

const startTimer = () => {
  const countdown = setInterval(() => {
    timer.value--;
    if (timer.value === 0) {
      clearInterval(countdown);
      bettingOpen.value = false; // Bezárjuk a fogadást
      spinWheel(); // Elindítjuk a kört
    }
  }, 1000);
};

const spinWheel = () => {
  const targetIndex = Math.floor(Math.random() * wheel.value.length);
  const fullSpins = 4;
  const totalSteps = fullSpins * wheel.value.length + targetIndex;

  currentPosition.value = totalSteps;

  setTimeout(() => {
    const finalPosition = totalSteps % wheel.value.length;
    const winningColor = wheel.value[finalPosition];
    history.value.unshift(winningColor);
    if (history.value.length > 50) history.value.pop();

    resolveBets(winningColor);

    bettingOpen.value = true;
    timer.value = 15;
    resetBets();

    currentPosition.value = finalPosition + 4 * wheel.value.length;

    roundCounter.value++; // Increment the round count

    startTimer();
  }, 5000);
};

const selectChip = (chip) => {
  selectedChip.value = chip;
};

const placeBet = (bet) => {
  if (!bettingOpen.value || store.coins < selectedChip.value) return;

  store.coins -= selectedChip.value;
  activeBets.value[bet.label] += selectedChip.value;

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

const resolveBets = (winningColor) => {
  const winType =
    winningColor === "🔴" ? "Red" : winningColor === "⚫" ? "Black" : "Green";
  const multiplier = betOptions.value.find(
    (b) => b.label === winType
  ).multiplier;
  const winAmount = activeBets.value[winType] * multiplier;

  if (winAmount > 0) {
    store.coins += winAmount;

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
  }
};

const resetBets = () => {
  activeBets.value = { Red: 0, Green: 0, Black: 0 }; // Minden fogadást törlünk
};

const getColorClass = (symbol) => {
  return (
    {
      "🔴": "bg-red-600",
      "⚫": "bg-gray-900",
      "🟢": "bg-green-600",
    }[symbol] || "bg-gray-800"
  );
};

onMounted(() => {
  startTimer();
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
</script>

<style scoped>
/* Updated styles for the stacked info section */
.info-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: center;
}

.info-container > div {
  width: 100%;
  max-width: 300px;
}

/* Rest of the styles remain the same */
.roulette-container {
  max-height: 100vh !important;
  overflow-y: auto !important;
}

.balance {
  display: flex;
  align-items: center;
  justify-content: center;
}

.coinkep {
  width: 18px;
  height: 18px;
  margin-left: 4px;
}

@media (min-width: 768px) {
  .coinkep {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
}

.cim {
  margin-top: 30px;
}

@media (min-width: 768px) {
  .cim {
    margin-top: 50px;
  }
}

.roulette-wheel {
  will-change: transform;
  overflow: hidden;
}

.roulette-wheel > div {
  display: flex;
  min-width: max-content;
}

.roulette-wheel div div {
  height: 96px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  backface-visibility: hidden;
  transform: translateZ(0);
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .roulette-wheel div div {
    height: 128px;
  }
}

/* Black hover fix */
.bg-gray-900:hover {
  background-color: #1a1a1a !important;
}

.history-section {
  scrollbar-width: thin;
  scrollbar-color: #6b7280 #374151;
}

.history-section::-webkit-scrollbar {
  width: 6px;
}

.history-section::-webkit-scrollbar-track {
  background: #374151;
}

.history-section::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

@media (min-width: 768px) {
  .history-section::-webkit-scrollbar {
    width: 8px;
  }

  .history-section::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
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
