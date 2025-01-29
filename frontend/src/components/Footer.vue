<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="legal-info">
        <span class="company-name">BetWise LLC</span>
        <span class="copyright">&copy; 2024 All rights reserved</span>
      </div>
      <div class="established">
        <span class="established-text">Established 2024</span>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.main-footer {
  background-color: rgb(41, 32, 45);
  padding: 1.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.legal-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}

.company-name {
  color: rgb(247, 233, 233);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.copyright {
  color: rgba(247, 233, 233, 0.9);
  font-size: 0.875rem;
  letter-spacing: 0.025em;
}

.established {
  display: flex;
  align-items: center;
}

.established-text {
  color: rgba(247, 233, 233, 0.8);
  font-size: 0.75rem;
  letter-spacing: 0.025em;
}

@media (min-width: 640px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .legal-info {
    gap: 1rem;
  }
}
</style>