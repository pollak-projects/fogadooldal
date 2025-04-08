<template>
  <div class="settings-page">
    <div class="settings-container">
      <h1 class="page-title">Profil Beállítások</h1>
      <Toast />
      <div class="profile-picture-section">
        <div class="avatar-wrapper">
          <img :src="profileImage" alt="Profile" class="profile-avatar" />
        </div>
        <label for="avatar-upload" class="upload-button">
          <input
            type="file"
            ref="imgs"
            id="avatar-upload"
            accept="image/*"
            @change="Save()"
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
          <h2 class="section-title">Személyes adatok</h2>
          <div class="form-group">
            <label>Teljes név:</label>
            <input type="text" v-model="userData.name" required />
          </div>

          <div class="form-group">
            <label>Email cím:</label>
            <input type="email" v-model="userData.email" required />
          </div>
        </div>

        <div class="form-section">
          <h2 class="section-title">Jelszó módosítás</h2>
          <div class="form-group password-group">
            <label>Új jelszó:</label>
            <div class="password-input-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="userData.newPassword"
              />
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

        <div class="save-button-container">
          <button type="submit" class="save-button">Beállítások mentése</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import { RouterLink } from "vue-router";
import { useUserStore } from "../config/store";
import { parseJwt } from "../lib/jwtparser.js";

const userStore = useUserStore();
const toast = useToast();
const showPassword = ref(false);

const userData = reactive({
  name: "",
  email: "",
  newPassword: "",
  notifications: {
    email: true,
    sms: false,
  },
});

const rawImg = ref();
const imgs = ref();
const reader = new FileReader();
const profileImage = ref();



const getProfileImage = () => {
  fetch(`http://localhost:3300/user/getImages?id=${localStorage.getItem("user_id")}`)
  .then( async (res) => {
    const data = await res.json()
    profileImage.value = data.profileImage
  })
}

onMounted(() => {
  getProfileImage();
})

function Save() {
    reader.onload = async function (e) {
        rawImg.value = reader.result;
        console.log(rawImg.value.split(",")[1]);
        await FileUpload(rawImg.value.split(",")[1]);
        location.reload()
    };
    const fileInput = imgs.value
    if (fileInput && fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    }
}

async function FileUpload(file) {
  console.log(file);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3300/user/setPfp`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: Number(localStorage.getItem('user_id')),
        file: file,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Sikeres feltöltés");
          resolve(response);
        } else {
          alert("Sikertelen feltöltés");
        }
      })
      .catch((error) => console.error("Hiba kijelentkezés közben:", error));
  });
}

const saveSettings = async () => {
  try {
    const userId = localStorage.getItem("user_id");

    const response = await fetch(
      `http://localhost:3300/user/update/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
        }),
      }
    );

    if (response.ok) {
      toast.add({
        severity: "success",
        summary: "Sikeres mentés",
        life: 3000,
      });

      userStore.setUserData({
        ...userStore.userData,
        full_name: userData.name,
        email: userData.email,
      });
    } else {
      const data = await response.json();
      toast.add({
        severity: "error",
        summary: "Hiba",
        detail: data.message || "Hiba történt a mentés során",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Hiba a mentés során:", error);
    toast.add({
      severity: "error",
      summary: "Hiba",
      detail: "Hiba történt a mentés során",
      life: 3000,
    });
  }
};
</script>

<style scoped>
/* Base Styles */
.settings-page {
  background-color: rgb(46, 40, 54);
  color: rgb(247, 233, 233);
  min-height: 100vh;
  padding: 1rem;
}

.settings-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.page-title {
  font-weight: 800;
  font-size: 1.8rem;
  margin: 1rem 0;
  text-align: center;
}

.section-title {
  font-weight: 700;
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  text-align: center;
}

/* Profile Picture Section */
.profile-picture-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
}

.upload-button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: rgb(253, 32, 93);
  color: white;
  border-radius: 5px;
  transition: background 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.upload-button:hover {
  background: rgb(255, 32, 91);
}

.upload-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.upload-icon {
  width: 18px;
  height: 18px;
}

/* Form Styles */
.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgb(247, 233, 233);
  transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: rgb(253, 32, 93);
  outline: none;
}

/* Password Input */
.password-group {
  position: relative;
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle-icon {
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

/* Buttons */
.reset-password-button {
  background: rgb(253, 32, 93);
  color: white;
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.3s;
  width: 100%;
  display: block;
  text-align: center;
  text-decoration: none;
}

.reset-password-button:hover {
  background: rgb(255, 32, 91);
}

.save-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.save-button {
  background: rgb(253, 32, 93);
  color: white;
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
  width: 100%;
  max-width: 300px;
}

.save-button:hover {
  background: rgb(255, 32, 91);
}

/* Responsive Adjustments */
@media (min-width: 480px) {
  .profile-avatar {
    width: 140px;
    height: 140px;
  }

  .upload-button {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
}

@media (min-width: 600px) {
  .settings-container {
    padding: 2rem;
  }

  .profile-picture-section {
    flex-direction: row;
    justify-content: center;
    gap: 2.5rem;
  }

  .profile-avatar {
    width: 150px;
    height: 150px;
  }

  .page-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .save-button {
    max-width: none;
    width: auto;
    padding: 0.8rem 2rem;
  }
}

@media (min-width: 768px) {
  .settings-container {
    padding: 2.5rem;
  }

  .form-section {
    padding: 1.8rem;
  }

  .profile-avatar {
    width: 160px;
    height: 160px;
  }
}

@media (min-width: 992px) {
  .settings-container {
    padding: 3rem;
  }
}
</style>
