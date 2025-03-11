<template>
  <div class="megerosites-container">
    <h1>Email megerősítés</h1>
    <div v-if="message" class="message-box success">
      <p>{{ message }}</p>
    </div>
    <div v-if="error" class="message-box error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Megerosites",
  data() {
    return {
      message: "", 
      error: "",   
    };
  },
  async created() {
    const token = this.$route.query.token;

    if (!token) {
      this.error = "Hiányzó token. Kérlek, ellenőrizd az emailt.";
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3300/auth/verify-email?token=${token}`);
      this.message = response.data.message; 
      setTimeout(() => {
        this.$router.push({ name: "Login" });
      }, 3000);
    } catch (err) {
      console.error("Error during email verification:", err); 
      this.error = err.response?.data?.message || "Hiba történt a megerősítés során.";
    }
  }
};
</script>

<style scoped>
.megerosites-container {
  text-align: center;
  padding: 50px;
  font-family: 'Arial', sans-serif;
  background-color: rgb(41, 32, 45);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #eef7ff;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.message-box {
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.message-box.success {
  background-color: #4caf50;
  color: white;
}

.message-box.error {
  background-color: #f44336;
  color: white;
}

p {
  font-size: 1.2rem;
  margin: 0;
}
</style>