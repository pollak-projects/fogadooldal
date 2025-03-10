<template>
  <div id="app" class="app">
    <form @submit.prevent="handlePasswordReset">
      <label for="email">Add meg az e-mail címed, hogy segítsunk:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="pelda@pelda.com"
        required
        :class="{ 'input-error': hasError }"
      />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Küldés folyamatban...' : 'Küldés' }}
      </button>
    </form>

    <div v-if="message" class="message-success" role="alert">{{ message }}</div>
    <div v-if="error" class="message-error" role="alert">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const message = ref('');
const error = ref('');
const isLoading = ref(false);
const timeoutId = ref(null);

const hasError = computed(() => error.value !== '');

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handlePasswordReset = async () => {
  try {
    // Reset állapotok
    error.value = '';
    message.value = '';
    isLoading.value = true;
    
    // Validációk
    if (!email.value) {
      throw new Error('Az email cím kötelező!');
    }
    
    if (!validateEmail(email.value)) {
      throw new Error('Érvénytelen email formátum!');
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
        message: `HTTP hiba: ${response.status} ${response.statusText}`
      }));
      throw new Error(errorData.message || 'Ismeretlen hiba történt');
    }

    // Sikeres válasz kezelése
    message.value = 'Elküldtük az emailt! A bejelentkezési oldalra irányítunk...';
    timeoutId.value = setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (err) {
    error.value = err.message;
    console.error('Hiba történt:', err);
    
    // Extra hibaüzenetek specifikus hibákra
    if (err.name === 'AbortError') {
      error.value = 'A kérés időtúllépés miatt megszakadt';
    } else if (err instanceof TypeError) {
      error.value = 'Hálózati hiba - ellenőrizd az internetkapcsolatot';
    }
    
  } finally {
    isLoading.value = false;
    if (timeoutId.value) clearTimeout(timeoutId.value);
  }
};
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
}

form {
  width: 100%;
  max-width: 400px;
  background: grey;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

.input-error {
  border-color: #dc3545;
  background-color: #fff5f5;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 
    background-color 0.3s ease,
    opacity 0.3s ease;
}

button:disabled {
  background-color: #85d3ac;
  opacity: 0.7;
  cursor: not-allowed;
}

.message-success {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #d4edda;
  color: #155724;
  border-radius: 4px;
}

.message-error {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8d7da;
  color: #721c24;
  border-radius: 4px;
}
</style>