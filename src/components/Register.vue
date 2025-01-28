<template>
  <div class="register-container bold">
    <h2>Regisztráció</h2>

    <form @submit.prevent="handleRegister">
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

      <div class="input-group bold">
        <label for="confirmPassword">Jelszó megerősítése</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Add meg a jelszavad újra"
          required
        />
      </div>

      <div class="show-password float-right">
        <input
          type="checkbox"
          id="showPassword"
          v-model="showPassword"
        />
        <label for="showPassword" class="jelszomegjelenites">Jelszavak megjelenítése</label>
      </div>

      <button type="submit" class="register-button bold">Regisztrálás</button>
    </form>

    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
    <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "A jelszavak nem egyeznek!";
    successMessage.value = "";
  } else if (username.value === "" || password.value === "") {
    errorMessage.value = "Kérlek töltsd ki az összes mezőt!";
    successMessage.value = "";
  } else {
    // Simulálhatjuk a regisztráció sikerét
    successMessage.value = "Sikeres regisztráció!";
    errorMessage.value = "";
  }
};

</script>

<style scoped>
.jelszomegjelenites {
  color: white;
  font-weight: 200;
}

.float-right {
  float: right
}

.bold {
  font-weight: bold;
}

.register-container {
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

.register-button {
  width: 100%;
  padding: 10px;
  background-color: rgb(253, 32, 93);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.register-button:hover {
  background-color: rgb(255, 121, 159);
  color: rgb(41, 32, 45);
}

.error-message {
  margin-top: 10px;
  color: #e74c3c;
  font-size: 14px;
}

.success-message {
  margin-top: 10px;
  color: #2ecc71;
  font-size: 14px;
}

input#username, input#password, input#confirmPassword {
  color: rgb(255, 121, 159);
}
</style>
