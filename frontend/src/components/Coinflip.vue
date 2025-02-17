<template>
  <div id="app" class="container">
    <div class="coin-container">
      <div 
        class="coin" 
        :class="{ flipping: isFlipping, [result]: true }"
        @animationend="onAnimationEnd"
      >
        <div class="side front">
          <img src="https://i.ibb.co/7TZ8C7p/image.png" alt="Eagle">
        </div>
        <div class="side back">
          <img src="https://i.ibb.co/VczsqXzc/image.png" alt="Wolf">
        </div>
      </div>
    </div>

    <div class="controls">
      <button 
        class="bet-button heads" 
        @click="chooseHeads" 
        :disabled="isDisabled"
      >
        FEJ
      </button>
      <button 
        class="bet-button tails" 
        @click="chooseTails" 
        :disabled="isDisabled"
      >
        ÍRÁS
      </button>
    </div>

    <div v-if="showResult" class="result">
      <p :class="['result-text', hasWon ? 'win' : 'lose']">
        {{ hasWon ? 'NYERTÉL!' : 'VESZTETTÉL' }}
      </p>
      <button class="play-again" @click="resetGame">ÚJ JÁTÉK</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userChoice: null,
      result: null,
      isDisabled: false,
      isFlipping: false,
      showResult: false
    };
  },
  methods: {
    chooseHeads() {
      this.startFlip('heads');
    },
    chooseTails() {
      this.startFlip('tails');
    },
    
    startFlip(choice) {
      this.userChoice = choice;
      this.isDisabled = true;
      this.isFlipping = true;
      this.showResult = false;
      
      // Determine result after animation
      setTimeout(() => {
        this.result = Math.random() < 0.5 ? 'heads' : 'tails';
      }, 200);
    },

    onAnimationEnd() {
      this.isFlipping = false;
      this.showResult = true;
    },

    resetGame() {
      this.userChoice = null;
      this.result = null;
      this.isDisabled = false;
      this.showResult = false;
    }
  },
  computed: {
    hasWon() {
      return this.userChoice === this.result;
    }
  }
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  background: #1A1D23;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.coin-container {
  perspective: 1000px;
  margin: 2rem auto;
}

.coin {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1s;
}

.coin.flipping {
  animation: flip 3s ease-out;
}

@keyframes flip {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(1800deg); }
  100% { transform: rotateY(2160deg); }
}

.coin.heads { transform: rotateY(0deg); }
.coin.tails { transform: rotateY(180deg); }

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
  background: linear-gradient(45deg, #FFD700, #FFA500);
}

.bet-button.tails {
  background: linear-gradient(45deg, #00B4D8, #0077B6);
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
  color: #00FF00;
}

.lose {
  color: #FF0000;
}

.play-again {
  background: #4CAF50;
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
</style>