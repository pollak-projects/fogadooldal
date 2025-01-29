<template>
  <div class="settings-page">
    <div class="settings-container">
      <h1>Profil Beállítások</h1>

      <div class="profile-picture-section">
        <div class="avatar-wrapper">
          <img 
            :src="profileImage || 'https://via.placeholder.com/150'" 
            alt="Profilkép"
            class="profile-avatar"
          >
          <label for="avatar-upload" class="upload-button">
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              @change="handleImageUpload"
              hidden
            >
            <span class="upload-content">
              <img src="/kepfeltolto.png" alt="Kép feltöltése" class="upload-icon">
              <span class="upload-text">Kép módosítása</span>
            </span>
          </label>
        </div>
      </div>

   
    <form @submit.prevent="saveSettings" class="settings-form">
    
      <div class="form-section">
        <h2>Személyes adatok</h2>
        
        <div class="form-group">
          <label>Teljes név:</label>
          <input type="text" v-model="userData.name" required>
        </div>

        <div class="form-group">
          <label>Email cím:</label>
          <input type="email" v-model="userData.email" required>
        </div>

        <div class="form-group">
          <label>Bio:</label>
          <textarea v-model="userData.bio" rows="4"></textarea>
        </div>
      </div>

      
      <div class="form-section">
        <h2>Jelszó módosítás</h2>
        
        <div class="form-group">
          <label>Új jelszó:</label>
          <input :type="showPassword ? 'text' : 'password'" v-model="userData.newPassword">
          <button type="button" @click="showPassword = !showPassword" class="toggle-password">
            {{ showPassword ? '👁️' : '👁️' }}
          </button>
        </div>
      </div>



     
      <div class="form-section">
        <h2>Nyelvi beállítások</h2>
        
        <div class="form-group">
          <label>Előnyben részesített nyelv:</label>
          <select v-model="userData.language">
            <option value="hu">Magyar</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
      <div class="Mentesgomb">
      <button type="submit" class="save-button">Beállítások mentése</button>
    </div>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profileImage: null,
      showPassword: false,
      userData: {
        name: '',
        email: '',
        bio: '',
        newPassword: '',
        notifications: {
          email: true,
          sms: false
        },
        language: 'hu'
      }
    }
  },
  methods: {
    handleImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    saveSettings() {
      console.log('Mentett adatok:', {
        ...this.userData,
        profileImage: this.profileImage
      });
      alert('Beállítások sikeresen mentve!');
    }
  }
}
</script>

<style scoped>
.Mentesgomb {
    width: 100%;
    display: flex;
    justify-content: right;
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
