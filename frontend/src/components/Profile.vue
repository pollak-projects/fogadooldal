<template>
  <div class="profile-container">
    <Card class="card">
      <template #title>Fiókbeállítások</template>
      <template #content>
        <div class="p-fluid grid">
          <!-- Profilkép feltöltés -->
          <div class="col-12 md:col-4 flex flex-column align-items-center">
            <div class="avatar-container mb-4">
              <img 
                :src="profileImage || '/pfp.png'" 
                class="profile-image"
                alt="Profilkép"
              />
              <FileUpload
                mode="basic"
                accept="image/*"
                :maxFileSize="1000000"
                chooseLabel="Kép módosítása"
                @select="handleImageUpload"
                class="mt-3"
              />
            </div>
          </div>

          <!-- Fiók adatok -->
          <div class="col-12 md:col-8">
            <div class="field">
              <label for="name">Teljes név</label>
              <InputText
                id="name"
                v-model="userData.name"
                class="w-full"
              />
            </div>

            <div class="field mt-4">
              <label for="email">E-mail cím</label>
              <InputText
                id="email"
                v-model="userData.email"
                type="email"
                class="w-full"
              />
            </div>

            <div class="field mt-4">
              <label for="password">Új jelszó</label>
              <InputText
                id="password"
                v-model="userData.password"
                type="password"
                class="w-full"
                placeholder="••••••••"
              />
            </div>

            <div class="flex justify-content-end mt-5">
              <Button 
                label="Mentés" 
                icon="pi pi-check"
                @click="saveProfile"
                class="save-button"
              />
            </div>
          </div>
        </div>

        <!-- Veszélyes beállítások -->
        <Divider />
        <div class="danger-zone">
          <h3 class="text-red-400">Veszélyes zóna</h3>
          <Button
            label="Fiók törlése"
            icon="pi pi-trash"
            severity="danger"
            class="mt-3"
            @click="confirmDeleteAccount"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
  
  <script setup>
  </script>
  
  <style scoped>
  .help-page {
    padding: 2rem;
    background-color: rgb(46, 40, 54);
    min-height: 100vh;
    color: rgb(247, 233, 233);
  }
  
  .help-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    font-size: 2rem;
    color: rgb(247, 233, 233);
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: rgb(247, 233, 233);
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.25rem;
    color: rgb(247, 233, 233);
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    color: rgb(247, 233, 233);
    line-height: 1.6;
  }
  
  .faq-section {
    margin-bottom: 2rem;
  }
  
  .email-support {
    font-size: 1rem;
    color: rgb(247, 233, 233);
    margin-top: 1rem;
  }
  
  .email-support a {
    color: rgb(255, 152, 152);
    text-decoration: none;
    font-weight: bold;
  }
  
  .email-support a:hover {
    text-decoration: underline;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 2rem;
    margin-top: 1rem;
  }
  
  li {
    font-size: 1rem;
    color: rgb(247, 233, 233);
    margin-bottom: 0.5rem;
  }
  </style>