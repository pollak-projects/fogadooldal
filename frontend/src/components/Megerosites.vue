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
      message: "", // Sikeres üzenet
      error: "",   // Hibaüzenet
    };
  },
async created() {
  const token = this.$route.query.token;

  if (!token) {
    this.error = "Hiányzó token. Kérlek, ellenőrizd az emailt.";
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3000/verify-email?token=${token}`);
    this.message = response.data;

    // 3 másodperc várakozás után átirányítás a bejelentkezési oldalra
    setTimeout(() => {
      this.$router.push({ name: "Login" }); // A "Login" útvonal neve
    }, 3000);
  } catch (err) {
    this.error = err.response?.data || "Hiba történt a megerősítés során.";
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