<template>
  <div class="background-container">
    <div class="stars"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>

    <div class="logo-container">
      <img src="/logo.png" alt="BetWise Logo" class="logo" />
      <h1 class="app-name">BetWise</h1>
    </div>

    <div class="reset-container">
      <h2>Jelszó visszaállítása</h2>

      <form @submit.prevent="handlePasswordReset">
        <div class="input-group">
          <label for="email">Add meg az e-mail címed:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="pelda@pelda.com"
            required
            :class="{ 'input-error': hasError }"
          />
        </div>

        <button type="submit" :disabled="isLoading" class="reset-button">
          {{ isLoading ? 'Küldés folyamatban...' : 'Küldés' }}
        </button>
      </form>

      <p class="message-success" v-if="message">{{ message }}</p>
      <p class="message-error" v-if="error">{{ error }}</p>

      <RouterLink to="/login" class="back-to-login-link">
        Vissza a bejelentkezéshez
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const message = ref("");
const error = ref("");
const isLoading = ref(false);
const timeoutId = ref(null);

const hasError = computed(() => error.value !== "");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handlePasswordReset = async () => {
  try {
    // Reset állapotok
    error.value = "";
    message.value = "";
    isLoading.value = true;

    // Validációk
    if (!email.value) {
      throw new Error("Az email cím kötelező!");
    }

    if (!validateEmail(email.value)) {
      throw new Error("Érvénytelen email formátum!");
    }

    // API hívás
    const response = await fetch("http://localhost:3300/auth/jelszoVisszaallitas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });

    // HTTP hibák kezelése
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP hiba: ${response.status} ${response.statusText}`,
      }));
      throw new Error(errorData.message || "Ismeretlen hiba történt");
    }

    // Sikeres válasz kezelése
    message.value = "Elküldtük az emailt! A bejelentkezési oldalra irányítunk...";
    timeoutId.value = setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    error.value = err.message;
    console.error("Hiba történt:", err);

    // Extra hibaüzenetek specifikus hibákra
    if (err.name === "AbortError") {
      error.value = "A kérés időtúllépés miatt megszakadt";
    } else if (err instanceof TypeError) {
      error.value = "Hálózati hiba - ellenőrizd az internetkapcsolatot";
    }
  } finally {
    isLoading.value = false;
    if (timeoutId.value) clearTimeout(timeoutId.value);
  }
};
</script>

<style scoped>
.background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    140deg,
    rgb(136, 84, 143),
    rgb(102, 54, 67),
    rgb(76, 32, 85)
  );
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;
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

.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff'/%3E%3C/svg%3E");
  animation: moveStars 50s linear infinite;
  filter: blur(1px);
  z-index: 0;
}

.stars2 {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff'/%3E%3C/svg%3E");
  animation: moveStars 80s linear infinite;
  filter: blur(2px);
}

.stars3 {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='1' fill='%23ffffff'/%3E%3C/svg%3E");
  animation: moveStars 120s linear infinite;
  filter: blur(3px);
}

@keyframes moveStars {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  z-index: 1;
}

.logo {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.app-name {
  font-size: 64px;
  color: rgb(253, 32, 93);
  margin: 0;
  font-weight: bold;
  letter-spacing: 10px;
}

.reset-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: rgba(41, 32, 45, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 1;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: rgb(253, 32, 93);
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: rgb(253, 32, 93);
}

.input-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid rgb(41, 32, 45);
  background-color: rgb(58, 45, 64);
  border-radius: 4px;
  font-size: 16px;
  color: rgb(255, 121, 159);
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.input-error {
  border-color: #dc3545;
  background-color: #fff5f5;
}

.reset-button {
  width: 100%;
  padding: 10px;
  background-color: rgb(253, 32, 93);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: rgb(255, 121, 159);
  color: rgb(41, 32, 45);
}

.reset-button:disabled {
  background-color: #85d3ac;
  opacity: 0.7;
  cursor: not-allowed;
}

.message-success {
  margin-top: 10px;
  color: #d4edda;
  font-size: 14px;
}

.message-error {
  margin-top: 10px;
  color: #f8d7da;
  font-size: 14px;
}

.back-to-login-link {
  display: block;
  margin-top: 15px;
  color: rgb(253, 32, 93);
  text-decoration: none;
  font-size: 14px;
  float: right;
}

.back-to-login-link:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .app-name {
    font-size: 48px;
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  .reset-container {
    max-width: 90%;
    padding: 15px;
  }

  .input-group input {
    padding: 12px;
  }

  h2 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .app-name {
    font-size: 36px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .reset-container {
    max-width: 95%;
    padding: 10px;
  }

  h2 {
    font-size: 18px;
  }

  .input-group input {
    padding: 14px;
    font-size: 14px;
  }

  .reset-button {
    font-size: 14px;
    padding: 12px;
  }
}
</style>