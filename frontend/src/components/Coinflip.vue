<template>
  <div id="app" class="container">
    <h1 class="cim">Coinflip</h1>
    <div class="coin-container">
      <div
        class="coin"
        :class="{ flipping: isFlipping, [result]: true }"
        @animationend="onAnimationEnd"
        ref="coin"
      >
        <div class="side front">
          <img src="/iras.png" alt="Iras" />
        </div>
        <div class="side back">
          <img src="/fej.png" alt="Fej" />
        </div>
      </div>
    </div>

    <div class="controls">
      <input
        type="number"
        v-model="betAmount"
        placeholder="Tét összege"
        :disabled="isDisabled"
        class="bevittCoin"
      />
      <button
        class="bet-button heads"
        @click="chooseHeads"
        :disabled="isDisabled || betAmount <= 0"
      >
        FEJ
      </button>
      <button
        class="bet-button tails"
        @click="chooseTails"
        :disabled="isDisabled || betAmount <= 0"
      >
        ÍRÁS
      </button>
    </div>

    <div v-if="showResult" class="result">
      <p :class="['result-text', hasWon ? 'win' : 'lose']">
        {{
          hasWon
            ? `NYERTÉL ${Math.round(winAmount)} COINT!`
            : `VESZTETTÉL ${Math.round(betAmount)} COINT! `
        }}
      </p>
      <button class="play-again" @click="resetGame">ÚJ JÁTÉK</button>
    </div>

    <div class="balance-container">
      <div class="balance">
        <p>
          Egyenleg:
          <span class="balance-amount-container">
            <span class="balance-amount">{{ store.coins }}</span>
            <img src="/coin.svg" alt="coin" class="coinkep" />
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { store } from "../config/store.js";
import { useToast } from "vue-toastification";

const toast = useToast();

// Refs
const userChoice = ref(null);
const result = ref(null);
const isDisabled = ref(false);
const isFlipping = ref(false);
const showResult = ref(false);
const betAmount = ref(0);
const winAmount = ref(0);
const coin = ref(null);
const user = ref();
const userData = ref(null);

// Computed
const hasWon = computed(() => userChoice.value === result.value);

// Methods
const chooseHeads = () => {
  startFlip("heads");
};

const chooseTails = () => {
  startFlip("tails");
};

const startFlip = (choice) => {
  if (betAmount.value > store.coins) {
    toast.error("Nincs elég pénzed!");
    return;
  }

  // Reset coin rotation to initial state
  coin.value.style.transform = "rotateY(0deg)";

  // Determine result immediately
  result.value = Math.random() < 0.5 ? "heads" : "tails";
  userChoice.value = choice;

  isDisabled.value = true;
  isFlipping.value = true;
  showResult.value = false;
};

const onAnimationEnd = () => {
  isFlipping.value = false;
  showResult.value = true;

  if (hasWon.value) {
    winAmount.value = betAmount.value * 0.9;
    store.coins += winAmount.value;
    toast.success(`NYERTÉL ${winAmount.value} COINT!`);
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
  } else {
    store.coins -= betAmount.value;
    toast.error(`VESZTETTÉL ${betAmount.value} COINT!`);
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

  // Set the final rotation of the coin based on the result
  coin.value.style.transform =
    result.value === "heads" ? "rotateY(1980deg)" : "rotateY(1800deg)";
};

const resetGame = () => {
  userChoice.value = null;
  result.value = null;
  isDisabled.value = false;
  showResult.value = false;
  betAmount.value = 0;

  // Reset coin rotation to initial state
  coin.value.style.transform = "rotateY(0deg)";
};

// Lifecycle hooks
onMounted(async () => {
  try {
    const response = await fetch(
      `http://localhost:3300/user/getAllById/${localStorage.getItem(
        "user_id"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    userData.value = await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

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

<style>
/* Your existing styles remain unchanged */
.bevittCoin {
  background-color: rgb(41, 32, 45);
  border-radius: 5px;
  border: solid rgb(57, 46, 61) 2px;
}

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

.balance-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.balance {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
}

.balance-amount-container {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.coinkep {
  width: 20px;
  height: 20px;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  height: 60px;
}

.container {
  padding-top: 80px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  background-color: rgb(46, 40, 54);
  padding: 2rem;
  border-radius: 12px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.coin-container {
  perspective: 1000px;
  margin: 2rem auto;
  padding-top: 0;
}

.coin {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s;
  z-index: 10;
}

.coin.flipping.heads {
  animation: flip-heads 3s ease-out;
}

.coin.flipping.tails {
  animation: flip-tails 3s ease-out;
}

@keyframes flip-heads {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
  }
  100% {
    transform: rotateY(1980deg);
  }
}

@keyframes flip-tails {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
  }
  100% {
    transform: rotateY(1800deg);
  }
}

.side {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #555, #333);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.side img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.back {
  transform: rotateY(180deg);
}

.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.bet-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bet-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bet-button.heads {
  background: linear-gradient(45deg, #ffd700, #ffa500);
}

.bet-button.tails {
  background: linear-gradient(45deg, #00b4d8, #0077b6);
}

.result {
  margin-top: 2rem;
}

.result-text {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 1rem 0;
}

.win {
  color: #00ff00;
}

.lose {
  color: #ff0000;
}

.play-again {
  background: #4caf50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.play-again:hover {
  background: #45a049;
}

@media (max-width: 768px) {
  .navbar {
    padding: 10px;
  }

  .coin-container {
    padding-top: 0;
  }
}

.balance,
input {
  color: white;
}
</style>
