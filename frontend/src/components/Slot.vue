<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { store } from "../config/store";

const toast = useToast();
const fruits = ["🍒", "🍋", "🍊", "🍇", "🍉"]; // 5 gyümölcs
const bells = ["🔔"]; // 1 csengő
const goldBars = ["🧈"]; // 1 aranyrúd
const sevens = ["7️⃣"]; // 1 hetes

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

// Szimbólumok súlyozva, hogy nagyobb legyen a nyerési esély
const symbols = [
  ...fruits, // 25 gyümölcs (legtöbb esély)
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits,
  ...fruits, // 25 gyümölcs
  ...bells,
  ...bells,
  ...bells,
  ...bells,
  ...bells,
  ...bells,
  ...bells,
  ...bells, // 8 csengő (növeltük az arányát)
  ...goldBars,
  ...goldBars,
  ...goldBars,
  ...goldBars, // 4 aranyrúd (növeltük az arányát)
  ...sevens, // 2 hetes (még mindig ritka, de több esély)
  ...sevens,
];

// Az alap slot szimbólumok
const slots = ref([null, null, null]);
const spinning = ref(false);
const bet = ref(1);
const user = ref();

const spin = () => {
  if (spinning.value) return;
  if (bet.value < 1 || !Number.isInteger(bet.value)) {
    toast.error("Nincs elég pénzed.");
    return;
  }
  if (store.coins < bet.value) {
    toast.error("Nincs elég egyenleged a pörgetéshez!");
    return;
  }

  store.coins -= bet.value; // Levonja a tétet
  console.log(store.coins);
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
  spinning.value = true;
  let spinCount = 0;

  const spinInterval = setInterval(() => {
    slots.value = slots.value.map(
      () => symbols[Math.floor(Math.random() * symbols.length)]
    );
    spinCount++;

    if (spinCount > 10) {
      clearInterval(spinInterval);
      spinning.value = false;
      checkWin();
    }
  }, 100);
};

const checkWin = () => {
  if (slots.value.every((slot) => slot === slots.value[0])) {
    const symbol = slots.value[0];
    let multiplier = 0;
    let message = "";

    if (fruits.includes(symbol)) {
      multiplier = 2;
      message = `Győzelem! ${multiplier}x szorzó!`;
    } else if (bells.includes(symbol)) {
      multiplier = 3;
      message = `Harangok! ${multiplier}x szorzó!`;
    } else if (goldBars.includes(symbol)) {
      multiplier = 5;
      message = `Arany! ${multiplier}x szorzó!`;
    } else if (sevens.includes(symbol)) {
      multiplier = 1000;
      message = "JACKPOT! 1000x SZORZÓ! 🎉";
    }

    const winAmount = bet.value * multiplier;
    user.value.coin[0].mennyiseg += winAmount; // Hozzáadja a nyereményt az egyenleghez

    toast.success(`${message} Nyertél ${winAmount} pontot!`, {
      timeout: 5000,
      hideProgressBar: true,
      icon: false,
    });
  } else {
    toast.error(
      `Sajnos most nem nyertél. Próbáld újra! Vesztettél ${bet.value} pontot.`,
      {
        timeout: 3000,
        hideProgressBar: true,
        icon: false,
      }
    );
  }
};
</script>

<template>
  <div class="slot-machine">
    <h1 class="cim">Slots</h1>
    <div class="slots">
      <div v-for="(slot, index) in slots" :key="index" class="slot">
        {{ slot }}
      </div>
    </div>

    <div class="controls">
      <div class="bet-input">
        <label>Tét:</label>
        <input
          type="number"
          v-model.number="bet"
          min="1"
          step="1"
          :disabled="spinning"
        />
      </div>
      <div
        class="p-3 md:p-4 bg-gray-800 rounded-lg balance flex items-center justify-center"
      >
        <p class="text-lg md:text-xl mr-2">
          Egyenleg: <span>{{ store.coins }}</span>
        </p>
        <img src="/coin.svg" alt="Coin" class="coinkep" />
      </div>
      <button @click="spin" :disabled="spinning">
        {{ spinning ? "Pörgetés..." : "Pörgetés" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.egyenlegSzoveg {
  color: white;
  margin-bottom: -15px;
}
.egyenleg {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
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
  margin-top: -170px;
}

.slot-machine {
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

.slots {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.slot {
  font-size: 3rem;
  padding: 10px;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 121, 159);
  transition: transform 0.1s ease-in-out;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.bet-input {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.bet-input input {
  padding: 8px;
  border-radius: 5px;
  border: 2px solid rgb(253, 32, 93);
  width: 80px;
  text-align: center;
  width: 100%;
}

button {
  padding: 12px 25px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background-color: rgb(253, 32, 93);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #666;
  cursor: not-allowed;
}

button:not(:disabled):hover {
  background-color: rgb(200, 0, 60);
}
</style>
