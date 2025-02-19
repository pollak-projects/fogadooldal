<template>
  <div>
    <!-- Navbar -->
    <div class="navbar">
      <!-- Navbar tartalom -->
    </div>

    <!-- Roulette tartalom -->
    <div class="roulette-container">
      <div class="casino-ui">
        <!-- Betting Interface -->
        <div class="betting-section">
          <div class="balance-box">
            <span class="balance-container">
              Egyenleg: <span class="balance-amount">{{ balance }}</span>
              <img src="/coin.svg" alt="coin" class="coinkep" />
            </span>
          </div>
          <div class="bets-container">
            <div
              v-for="(multiplier, color) in multipliers"
              :key="color"
              class="bet-card"
              :class="color"
              @click="placeBet(color)"
            >
              <div class="bet-header">{{ color.toUpperCase() }}</div>
              <div class="bet-multiplier">{{ multiplier }}x</div>
              <input
                type="number"
                v-model.number="bets[color]"
                min="0"
                :disabled="!isBettingTime"
              />
              <div class="bet-controls">
                <button @click.stop="adjustBet(color, 5)">+5</button>
                <button @click.stop="adjustBet(color, -5)">-5</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Roulette Wheel -->
        <div class="wheel-container">
          <div class="wheel-mask">
            <div class="wheel" :style="{ transform: `rotate(${rotation}deg)` }">
              <div
                v-for="(segment, index) in segments"
                :key="index"
                class="segment"
                :class="segment.color"
              ></div>
            </div>
          </div>
          <div class="pointer"></div>
        </div>

        <!-- Game Controls -->
        <div class="game-controls">
          <div class="timer">Hátralévő idő: {{ timer }}mp</div>
          <div class="history">
            <div
              v-for="(result, index) in resultHistory"
              :key="index"
              class="history-item"
              :class="result.color"
            >
              {{ result.color.charAt(0).toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../config/store.js";
export default {
  data() {
    return {
      timer: 15,
      isBettingTime: true,
      rotation: 0, // This will control the rotation of the wheel
      resultHistory: [],
      bets: { red: 0, green: 0, black: 0 },
      multipliers: { red: 2, black: 2, green: 14 },
      segments: this.generateSegments(),
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    balance() {
      return store.coins;
    },
    generateSegments() {
      const segments = [];
      // Add green segment (1 green)
      segments.push({ color: "green" });
      // Add 24 black and 24 red segments
      for (let i = 0; i < 24; i++) segments.push({ color: "red" });
      for (let i = 0; i < 24; i++) segments.push({ color: "black" });
      return segments;
    },

    startTimer() {
      const timerInterval = setInterval(() => {
        if (this.timer > 0) this.timer--;
        else {
          this.timer = 15; // Reset timer after countdown
          this.isBettingTime = !this.isBettingTime;
          if (!this.isBettingTime) {
            this.spinWheel();
          } else {
            this.resetRound();
          }
        }
      }, 1000);
    },

    adjustBet(color, amount) {
      if (!this.isBettingTime) return;
      const newBet = Math.max(0, this.bets[color] + amount);
      const totalBets =
        Object.values(this.bets).reduce((a, b) => a + b) -
        this.bets[color] +
        newBet;

      if (totalBets <= this.balance) {
        this.bets[color] = newBet;
        this.balance -= amount;
      }
    },

    placeBet(color) {
      if (this.isBettingTime && this.balance >= this.bets[color] + 5) {
        this.bets[color] += 5;
        this.balance -= 5;
      }
    },

    spinWheel() {
      const result = this.calculateResult();
      const totalRotation = 360 * 5 + Math.random() * 360; // 5 full rotations plus a random angle
      this.rotation = totalRotation;

      setTimeout(() => {
        this.processResult(result.color);
        this.resetRound();
      }, 5000);
    },

    calculateResult() {
      const random = Math.random();
      let color;

      if (random < 0.02)
        color = "green"; // Green segment is 2% of total segments
      else if (random < 0.51) color = "red"; // Red segment covers ~49%
      else color = "black"; // Black segment covers ~49%

      return { color };
    },

    processResult(resultColor) {
      const winnings = this.bets[resultColor] * this.multipliers[resultColor];
      this.balance += winnings;
      this.resultHistory.unshift({ color: resultColor });
      if (this.resultHistory.length > 8) this.resultHistory.pop();
    },

    resetRound() {
      this.bets = { red: 0, green: 0, black: 0 };
      this.timer = 15;
      this.isBettingTime = true;
      this.rotation = 0;
    },
  },
};
</script>

<style scoped>
.balance-container {
  display: inline-flex;
  align-items: center;
  gap: 5px; /* Kis térköz az ikon és az egyenleg között */
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
}

.roulette-container {
  background: rgb(46, 40, 54);
  min-height: 100vh;
  padding: 20px;
  padding-top: 100px; /* Navbar magassága + egy kis tér */
  margin-top: 0;
}

.casino-ui {
  max-width: 1000px;
  margin: 0 auto;
}

.betting-section {
  margin-top: 50px;
  background: rgb(46, 40, 54);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
}

.balance-box {
  background: rgb(76, 67, 88);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
}

.bets-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.bet-card {
  padding: 15px;
  border-radius: 8px;
  color: white;
  text-align: center;
  transition: transform 0.2s;
}

.bet-card:hover {
  transform: scale(1.03);
}

.bet-card input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  text-align: center;
  font-weight: bold;
  color: black;
}

.bet-controls button {
  background: #34495e;
  border: none;
  color: white;
  padding: 5px 10px;
  margin: 0 2px;
  border-radius: 3px;
  cursor: pointer;
}

.bet-controls button:hover {
  background: #3b5166;
}

.red {
  background: #e74c3c;
}
.green {
  background: #2ecc71;
}
.black {
  background: #2c3e50;
}

.wheel-container {
  position: relative;
  height: 200px;
  margin: 30px 0;
  overflow: hidden;
}

.wheel-mask {
  width: 100%;
  height: 100%;
  position: relative;
}

.wheel {
  display: flex;
  transition: transform 5s ease-in-out; /* Smooth transition for rotation */
}

.segment {
  width: 100px;
  height: 100%;
  border-radius: 50%;
  margin: 0 5px;
}

.segment.red {
  background: #e74c3c;
}
.segment.green {
  background: #2ecc71;
}
.segment.black {
  background: #2c3e50;
}

.pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: 100%;
  background: gold;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.game-controls {
  background: rgb(76, 67, 88);
  padding: 15px;
  border-radius: 10px;
}

.timer {
  color: #fff;
  font-size: 1.2em;
  margin-bottom: 15px;
  text-align: center;
}

.history {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.history-item {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.history-item.red {
  background: #e74c3c;
}
.history-item.green {
  background: #2ecc71;
}
.history-item.black {
  background: #2c3e50;
}
</style>
