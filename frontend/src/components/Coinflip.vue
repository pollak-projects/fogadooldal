<template>
  <div id="app" class="container">
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
        {{ hasWon ? `NYERTÉL! ${winAmount} Ft` : `VESZTETTÉL ${betAmount} Ft` }}
      </p>
      <button class="play-again" @click="resetGame">ÚJ JÁTÉK</button>
    </div>

    <div class="balance">
      <p>
        Egyenleg:
        <span class="balance-container">
          <span class="balance-amount">{{ balance }}</span>
          <img src="/coin.svg" alt="coin" class="coinkep" />
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { store } from "../config/store.js";
export default {
  data() {
    return {
      userChoice: null,
      result: null,
      isDisabled: false,
      isFlipping: false,
      showResult: false,
      betAmount: 0,
      winAmount: 0,
    };
  },

  computed: {
    balance() {
      return store.coins;
    },
    hasWon() {
      return this.userChoice === this.result;
    },
  },
  methods: {
    chooseHeads() {
      this.startFlip("heads");
    },
    chooseTails() {
      this.startFlip("tails");
    },
    startFlip(choice) {
      if (this.betAmount > store.coins) {
        alert("Nincs elég pénzed!");
        return;
      }
      // Reset coin rotation to initial state
      const coin = this.$refs.coin;
      coin.style.transform = "rotateY(0deg)";

      // Determine result immediately
      this.result = Math.random() < 0.5 ? "heads" : "tails";
      this.userChoice = choice;

      this.isDisabled = true;
      this.isFlipping = true;
      this.showResult = false;
    },
    onAnimationEnd() {
      this.isFlipping = false;
      this.showResult = true;

      if (this.hasWon) {
        this.winAmount = this.betAmount * 1.5;
        store.coins += this.winAmount;
      } else {
        store.coins -= this.betAmount;
      }

      // Set the final rotation of the coin based on the result
      const coin = this.$refs.coin;
      coin.style.transform =
        this.result === "heads" ? "rotateY(1980deg)" : "rotateY(1800deg)";
    },
    resetGame() {
      this.userChoice = null;
      this.result = null;
      this.isDisabled = false;
      this.showResult = false;
      this.betAmount = 0;

      // Reset coin rotation to initial state
      const coin = this.$refs.coin;
      coin.style.transform = "rotateY(0deg)";
    },
  },
};
</script>

<style>
.balance-container {
  display: inline-flex;
  align-items: center;
  gap: 5px; /* Térköz az ikon és a szöveg között */
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
  height: 60px; /* Fix magasság a navbar-nak */
}

.container {
  padding-top: 60px; /* A navbar magasságával megegyező padding */
  max-width: 600px;
  margin: 0 auto; /* Középre igazítás */
  text-align: center;
  background: #1a1d23;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.coin-container {
  perspective: 1000px;
  margin: 2rem auto;
  padding-top: 80px; /* Növelt padding a navbar miatt */
}

.coin {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s;
  z-index: 10; /* Biztosítja, hogy a coin a navbar felett legyen */
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
  } /* 1800 + 180 = 1980 (180deg) */
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
  } /* 0deg */
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
    padding-top: 100px; /* Nagyobb padding mobilon */
  }
}

.balance,
input {
  color: white;
}
</style>
