<template>
  <div class="login-container bold">
    <h2>Bejelentkezés</h2>

    <form @submit.prevent="handleLogin">
      <div class="input-group bold">
        <label for="username">Felhasználónév</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Add meg a felhasználóneved"
          required
        />
      </div>

      <div class="input-group bold">
        <label for="password">Jelszó</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          placeholder="Add meg a jelszavad"
          required
        />
      </div>

      <div class="show-password float-right">
        <img
          :src="showPassword ? '/eye.png' : '/hidden.png'"
          alt="Toggle Password Visibility"
          @click="showPassword = !showPassword"
          class="password-toggle-icon"
        />
      </div>
      

      <button type="submit" class="login-button bold">Bejelentkezés</button>
    </form>

    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const showPassword = ref(false);

const handleLogin = () => {
  if (username.value === "admin" && password.value === "1234") {
    alert("Sikeres bejelentkezés!");
  } else {
    errorMessage.value = "Hibás felhasználónév vagy jelszó!";
  }
};
</script>

<style scoped>
.float-right {
  float: right;
}

.bold {
  font-weight: bold;
}

.login-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: rgb(41, 32, 45);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: rgb(253, 32, 93);
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
  margin-right: auto;
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
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: rgb(253, 32, 93);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: rgb(255, 121, 159);
  color: rgb(41, 32, 45);
}

.error-message {
  margin-top: 10px;
  color: #e74c3c;
  font-size: 14px;
}

input#username,
input#password {
  color: rgb(255, 121, 159);
}

.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  right: 10px;
  margin-bottom: 10px;
}
</style>