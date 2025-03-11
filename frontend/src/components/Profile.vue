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
        <ul class="user-info-list">
          <li><strong>Felhasználónév:</strong> {{ user?.username }}</li>
          <li><strong>Teljes név:</strong> {{ user?.full_name }}</li>
          <li><strong>E-mail cím:</strong> {{ user?.email }}</li>
          <!-- A dátumok formázása a megfelelő órával és perccel -->
          <li>
            <strong>Létrehozás dátuma:</strong>
            {{ formatDate(user?.created_at) }}
          </li>
          <li>
            <strong>Frissítés dátuma:</strong>
            {{ formatDate(user?.updated_at) }}
          </li>
          <li><strong>Jogosultság:</strong> {{ user?.groupsNeve }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  padding: 4rem 0;
  background-color: rgb(46, 40, 54);
  height: 100vh;
  overflow: hidden;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(46, 40, 54);
}

/* Kártya stílusok */
.card {
  background-color: rgb(41, 32, 45);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: rgb(253, 32, 93);
  margin-bottom: 1.5rem;
}

/* Felsorolás stílusok */
.user-info-list {
  list-style-type: none;
  padding: 0;
  color: white;
  font-size: 1.1rem;
}

.user-info-list li {
  margin: 1rem 0;
  line-height: 1.6;
}

.user-info-list strong {
  color: rgb(253, 32, 93); /* Erősebb szín a címkékhez */
}

/* Hover effekt a kártyához */
.card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}
</style>
