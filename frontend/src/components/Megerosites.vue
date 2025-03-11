<template>
  <div class="megerosites-container">
    <h1>Email megerősítés</h1>
    <p v-if="message">{{ message }}</p>
    <p v-if="error">{{ error }}</p>
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
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #ffffff;
}

p {
  font-size: 18px;
  color: #ffb1b1;
}
</style>