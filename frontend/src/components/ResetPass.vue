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
        />
        <button type="submit">Küldés</button>
      </form>
  
      <p v-if="submitted">Köszönjük, hogy megadta az email címét: {{ email }}</p>

      <p v-if="message">{{ message }}</p>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {
      email: "",
      message: "",
      error: "",
    };
  },
  methods: {
    async handlePasswordReset() {
      if (!this.email) {
        this.error = "Az email cím kötelező!";
        return;
      }

      try {
        const response = await fetch("http://localhost:3300/auth/jelszoVisszaallitas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
          }),
        });

        
        const data = await response.json();

        
        if (response.ok) {
          this.message = data.message;  
          this.error = "";              
        } else {
          this.error = data.error || "Hiba történt a kérés során."; 
          this.message = "";           
        }
      } catch (err) {
        this.error = "Hiba történt a kérés során.";
        this.message = "";
      }
    },
  },
};
</script>



<style scoped>

p {
    color: white
}

.app{
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

form {
  display: inline-block;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color:aqua
}

input {
  padding: 8px;
  width: 100%;
  margin-bottom: 16px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}
</style>