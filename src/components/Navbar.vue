
<template>
  <div class="card">
      <Toolbar>
          <template #start >
              <Button  class="mr-2 !text-green-600" severity="secondary" as="RouterLink" to="/"  text   > Home</Button>
              <Button  class="mr-2"  text-rgb- severity="secondary" as="RouterLink" to="/coinflip"  text > Coinflip </Button>
              <Button  severity="secondary" as="RouterLink" to="/roulette"  text > Roulette </Button>
              
          </template>

          <template #end> <img src="/pfp.png" class="w-15 rounded-full"></img></template>
      </Toolbar>
  </div>
</template>

<script setup>
import { Button, Toolbar } from 'primevue';

</script>

<style scoped>

.p-toolbar{
  background-color: rgb(41, 32, 45)   !important
}

</style>
