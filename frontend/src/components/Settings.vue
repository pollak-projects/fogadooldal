<template>
  <div class="settings-page">
    <div class="settings-container">
      <h1 class="h1">Profil Beállítások</h1>
      <br />
      <Toast />
      <div class="profile-picture-section">
        <div class="avatar-wrapper">
          <img :src="profileImage" alt="" class="profile-avatar" />
        </div>
        <label for="avatar-upload" class="upload-button">
          <input
            type="file"
            ref="imgRef"
            id="avatar-upload"
            accept="image/*"
            @change="handleImageUpload"
            hidden
          />
          <span class="upload-content">
            <img
              src="/kepfeltolto.png"
              alt="Kép feltöltése"
              class="upload-icon"
            />
            <span class="upload-text">Kép módosítása</span>
          </span>
        </label>
      </div>

      <form @submit.prevent="saveSettings" class="settings-form">
        <div class="form-section">
          <h1 class="h1">Személyes adatok</h1>
          <br />
          <div class="form-group">
            <label>Teljes név:</label>
            <input type="text" v-model="userData.name" required />
          </div>

          <div class="form-group">
            <label>Email cím:</label>
            <input type="email" v-model="userData.email" required />
          </div>

          <div class="form-group">
            <label>Bio:</label>
            <textarea v-model="userData.bio" rows="4"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h1 class="h1">Jelszó módosítás</h1>
          <br />
          <div class="form-group">
            <label>Új jelszó:</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="userData.newPassword"
            />
            <div class="show-password float-right">
              <img
                :src="showPassword ? '/eye2.png' : '/hidden2.png'"
                alt="Toggle Password Visibility"
                @click="showPassword = !showPassword"
                class="password-toggle-icon"
              />
            </div>
          </div>
          <div class="form-group">
            <RouterLink
              type="button"
              @click="jelszoVisszaallitas"
              to="/jelszovisszaallitas"
              class="reset-password-button"
              >Jelszó visszaállítása</RouterLink
            >
          </div>
        </div>

        <div class="Mentesgomb">
          <button type="submit" class="save-button">Beállítások mentése</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { RouterLink } from "vue-router";
import { useUserStore } from "../config/store"; // Importáld a store-t

const userStore = useUserStore();
const toast = useToast();

// Reactive state
const showPassword = ref(false);
const userData = reactive({
  name: "",
  email: "",
  bio: "",
  newPassword: "",
  notifications: {
    email: true,
    sms: false,
  },
});

// Template refs
const imgRef = ref(null);

// Profilkép elérési útja a store-ból
const profileImage = ref(userStore.profileImage);

// Handle image upload
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Frissítjük a store-ban tárolt profilképet
      userStore.setProfileImage(e.target.result);
      profileImage.value = e.target.result; // Frissítjük a profilképet a komponensben
    };
    reader.readAsDataURL(file);
  }
};

// Form mentése
const saveSettings = () => {
  console.log("Saved data:", {
    ...userData,
    profileImage: profileImage.value,
  });

  toast.add({
    severity: "success",
    summary: "Sikeres mentés",
    life: 3000,
  });
};
</script>

<style scoped>
.reset-password-button {
  background: rgb(255, 121, 191);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  width: 100%;
  margin-top: 1rem;
}

.reset-password-button:hover {
  background: rgb(255, 32, 91);
}

.h1 {
  font-weight: 800;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.password-toggle-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  right: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.Mentesgomb {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-bottom: 60px;
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  width: 20px;
  height: 20px;
  position: relative;
}

.settings-page {
  background-color: rgb(46, 40, 54);
  color: rgb(247, 233, 233);
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-picture-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
  text-align: center;
}

.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #ddd;
}

.upload-button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: rgb(255, 121, 191);
  color: black;
  border-radius: 5px;
  transition: background 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.upload-button:hover {
  background: rgb(255, 32, 91);
}

.form-section {
  margin-top: -40px;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgb(46, 40, 54);
  border-radius: 8px;
  color: rgb(247, 233, 233);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: rgb(46, 40, 54);
  color: rgb(247, 233, 233);
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
}

.toggle-password {
  margin-left: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(247, 233, 233);
}

.save-button {
  background: rgb(255, 121, 191);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.save-button:hover {
  background: rgb(255, 32, 91);
}
</style>
