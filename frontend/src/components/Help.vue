<template>
    <div class="help-page">
      <div class="help-container">
        <h1>Segítség és Támogatás</h1>
        <p>
          Üdvözöljük a segítség és támogatás oldalán! Itt megtalálhatja a gyakran ismételt kérdéseket, útmutatókat, és információkat arról, hogyan kérhet segítséget.
        </p>
  
        <h2>Gyakran Ismételt Kérdések (GYIK)</h2>
        <div class="faq-section">
          <h3>Hogyan regisztrálok?</h3>
          <p>
            A regisztrációhoz kattintson a "Regisztráció" gombra a kezdőlapon, és kövesse a lépéseket.
          </p>
  
          <h3>Elfelejtettem a jelszavam. Mit tegyek?</h3>
          <p>
            Ha elfelejtette a jelszavát, kattintson a "Elfelejtett jelszó" linkre a bejelentkezési oldalon, és kövesse az utasításokat.
          </p>
  
          <h3>Hogyan változtathatom meg a fiók adataimat?</h3>
          <p>
            A fiók adatait a "Profil" menüpont alatt módosíthatja.
          </p>
        </div>
  
        <h2>Kapcsolatfelvétel</h2>
        <p>
          Ha további segítségre van szüksége, kérjük, írjon e-mailt a támogatási csapatunknak az alábbi címre:
        </p>
        <p class="email-support">
          <strong>E-mail cím:</strong>
          <a href="mailto:betwisepollak@gmail.com"> betwisepollak@gmail.com</a>
        </p>
  
        <h2>Hasznos Tippek</h2>
        <ul>
          <li>Mindig ellenőrizze, hogy helyes e-mail címet és jelszót használ-e a bejelentkezéshez.</li>
          <li>Ha problémája van, először próbálja meg frissíteni az oldalt vagy törölni a böngésző gyorsítótárát.</li>
          <li>Ha továbbra is problémája van, kérjük, küldjön egy részletes e-mailt a támogatási csapatunknak.</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .help-page {
    margin-top: 100px;
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