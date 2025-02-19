<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">Csapatunk</h1>
      <div class="divider"></div>
      
      <div class="team-grid">
        <div 
          class="team-member" 
          v-for="member in team" 
          :key="member.name"
        >
          <div class="member-image">
            <img :src="member.image" :alt="member.name" class="profile-image">
          </div>
          <h2 class="member-name">{{ member.name }}</h2>
          <p class="member-role">{{ member.role }}</p>
          <p class="member-description">{{ member.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        {
          name: 'Molnár Ádám',
          role: 'Frontend Fejlesztő',
          description: 'A felhasználói felület tervezésének és implementálásának szakértője, modern webtechnológiák alkalmazásával.',
          image: '/molad.jpeg'
        },
        {
          name: 'Szilasi Martin',
          role: 'Backend Fejlesztő',
          description: 'A rendszerarchitektúra és adatbázis-kezelés specialistája, biztonsági megoldások tervezője.',
          image: '/martin.jpeg' 
        },
        {
          name: 'Vida Nolen',
          role: 'Fullstack Fejlesztő',
          description: 'Teljes körű fejlesztési tapasztalat, innovatív megoldások tervezése végpontok közötti fejlesztésekben.',
          image: '/nolen.jpeg' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  padding: 4rem 0;
  background-color: rgb(46, 40, 54);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  color: rgb(253, 32, 93);
  margin-bottom: 1.5rem;
}

.divider {
  width: 60px;
  height: 3px;
  background-color: rgb(255, 121, 159);
  margin: 0 auto 3rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 20px;
}

.team-member {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.team-member:hover {
  transform: scale(1.05); /* Méretnövekedés */
  box-shadow: 0 10px 20px rgba(253, 32, 93, 0.3); /* Színes árnyék */
}

.member-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgb(255, 121, 159);
  transition: transform 0.3s ease;
}

.team-member:hover .member-image {
  transform: scale(1.1); /* Kép nagyítása */
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  color: rgb(253, 32, 93);
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
}

.member-role {
  color: rgb(255, 121, 159);
  font-weight: 600;
  margin-bottom: 1rem;
}

.member-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>