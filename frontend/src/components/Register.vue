<template>
  <div class="background-container">
   
    <div class="stars"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>

    <div class="logo-container">
      <img src="/logo.png" alt="BetWise Logo" class="logo" />
      <h1 class="app-name">BetWise</h1>
    </div>



    <div class="register-container bold">
      <h2>Regisztráció</h2>
  <div class="background-container">
    <!-- Csillagok a háttérben -->
    <div class="stars"></div>
    <div class="stars stars2"></div>
    <div class="stars stars3"></div>

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
        <label for="email">Email cím</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Add meg az email címed"
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
          <img
            :src="showPassword ? '/eye.png' : '/hidden.png'"
            alt="Toggle Password Visibility"
            @click="showPassword = !showPassword"
            class="password-toggle-icon"
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

        <button type="submit" class="register-button bold">Regisztrálás</button>
      </form>
        <button type="submit" class="register-button bold">Regisztrálás</button>
      </form>

            <RouterLink to="/login" class="text-center float-right login-link">
        Van már fiókod? Jelentkezz be!
      </RouterLink>

      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
    </div>
      <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
      <p class="success-message" v-if="successMessage">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref(""); 
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const showPassword = ref(false);

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "A jelszavak nem egyeznek!";
    successMessage.value = "";
  } else if (username.value === "" || password.value === "" || email.value === "") {
    errorMessage.value = "Kérlek töltsd ki az összes mezőt!";
    successMessage.value = "";
  } else {

    successMessage.value = "Sikeres regisztráció!";
    errorMessage.value = "";
  }
};


</script>

<style scoped>

.login-link {
  display: block;
  margin-top: 15px;
  color: rgb(253, 32, 93);
  text-decoration: none;
  font-size: 14px;
}

.login-link:hover {
  text-decoration: underline;
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

.background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(140deg, rgb(67, 44, 77), rgb(102, 54, 67), rgb(76, 32, 85));
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;
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


.background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(140deg, rgb(67, 44, 77), rgb(102, 54, 67), rgb(76, 32, 85));
  background-size: 400% 400%;
  animation: gradientAnimation 5s ease infinite;
}

.register-container {
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

input#username,
input#password,
input#confirmPassword,
input#email {
  color: rgb(255, 121, 159);
}

.password-toggle-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>