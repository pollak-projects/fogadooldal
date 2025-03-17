<script setup>
import { onMounted, ref } from "vue";

// Példa felhasználói adat
const user = ref();

// Dátum formázó funkció
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 1-től kezdődik, ezért +1
  const day = date.getDate().toString().padStart(2, "0"); // Napi érték formázása
  const hours = date.getHours().toString().padStart(2, "0"); // Órák
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Percek

  return `${year}.${month}.${day} ${hours}:${minutes}`; // Formátum: YYYY.MM.DD HH:mm
}

onMounted(() => {
  fetch(
    `http://localhost:3300/user/getAllById/${localStorage.getItem("user_id")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(async (res) => {
    const data = await res.json();
    console.log(data);
    user.value = data;
  });
});
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <div class="card">
        <h1 class="page-title">Fiók adatai</h1>
        <div class="user-info">
          <div class="user-info-item">
            <span class="label">Felhasználónév:</span>
            <span class="value">{{ user?.username }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">Teljes név:</span>
            <span class="value">{{ user?.full_name }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">E-mail cím:</span>
            <span class="value">{{ user?.email }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">Létrehozás dátuma:</span>
            <span class="value">{{ formatDate(user?.created_at) }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">Frissítés dátuma:</span>
            <span class="value">{{ formatDate(user?.updated_at) }}</span>
          </div>
          <div class="user-info-item">
            <span class="label">Jogosultság:</span>
            <span class="value">{{ user?.groupsNeve }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 4rem 0;
  background-color: rgb(46, 40, 54);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 800px;
  width: 100%;
  padding: 20px;
}

.card {
  background-color: rgb(41, 32, 45);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: rgb(253, 32, 93);
  margin-bottom: 2rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.user-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.user-info-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.label {
  font-weight: bold;
  color: rgb(253, 32, 93);
  font-size: 1.1rem;
}

.value {
  color: white;
  font-size: 1.1rem;
}
</style>