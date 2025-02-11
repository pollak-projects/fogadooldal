<script setup>
import { Card, Button } from "primevue";
import { ref } from "vue";

const messages = ref([]);
const newMessage = ref("");
const errorMessage = ref("");

const forbiddenWords = [
  "fasz", "geci"
]; // Tiltott szavak listája

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    const containsForbiddenWord = forbiddenWords.some(word =>
      newMessage.value.toLowerCase().includes(word)
    );

    if (containsForbiddenWord) {
      errorMessage.value = "Tilos szót próbáltál beírni!";
    } else {
      messages.value.push({ text: newMessage.value, user: "Felhasználó" });
      newMessage.value = "";
      errorMessage.value = "";
    }
  }
};
</script>

<template>
  <div class="background-container"></div>

  <div class="home-container">
    <div class="chat-container">
      <div class="chat-header">Chat</div>
      <div class="chat-messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.user }}:</strong> {{ message.text }}
        </div>
      </div>
      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Írj üzenetet..."
        />
        <Button label="Küldés" @click="sendMessage" class="send-button" />
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>

    <div class="main-content">
      <div class="cards-container">
        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Coinflip" src="/coinflip.png" />
          </template>
          <template #title>Coinflip</template>
          <template #content>
            <p class="m-0">
              A coinflip egy egyszerű játék, ahol egy érme feldobásával döntünk,
              hogy fej vagy írás lesz-e. Az esélyek 50-50%-osak, és a végeredmény
              véletlenszerű.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/coinflip"
              />
            </div>
          </template>
        </Card>

        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Roulette" src="/roulette.png" />
          </template>
          <template #title>Roulette</template>
          <template #content>
            <p class="m-0">
              A roulette egy klasszikus kaszinó játék, ahol a szerencsén múlik,
              hogy a golyó melyik számra esik.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/roulette"
              />
            </div>
          </template>
        </Card>

        <Card style="overflow: hidden" class="kartya">
          <template #header>
            <img alt="Crash" src="/crash.png" />
          </template>
          <template #title>Crash</template>
          <template #content>
            <p class="m-0">
              A Crash egy olyan szerencsejáték, ahol a cél minél magasabb szorzónál kiszállni,
              mielőtt a szorzó összeomlik.
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Játék!"
                severity="danger"
                class="gomb"
                as="RouterLink"
                to="/crash"
              />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  position: relative;
  z-index: 1;
}

.chat-container {
  width: 350px;
  background-color: rgba(41, 32, 45, 0.9);
  border-radius: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  color: white;
  padding: 10px;
}

.chat-header {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.chat-input {
  display: flex;
  gap: 10px;
  padding: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.send-button {
  background-color: rgb(253, 32, 93);
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: rgb(255, 121, 159);
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
}

.kartya {
  background-color: rgb(41, 32, 45);
  color: white;
  width: 25rem;
  margin-top: 20px;
}

.gomb {
  background-color: rgb(253, 32, 93);
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.gomb:hover {
  background-color: rgb(255, 121, 159);
  border: 1px solid rgb(255, 121, 159);
}

.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 200vh;
  overflow: hidden;
  background: rgb(46, 40, 54);
  background: linear-gradient(
    140deg,
    rgba(46, 40, 54, 1) 0%,
    rgba(60, 50, 70, 1) 50%,
    rgba(46, 40, 54, 1) 100%
  );
  background-size: 200% 200%;
  animation: gradientAnimation 10s ease infinite;
  z-index: -1;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
