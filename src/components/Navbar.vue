
<template>
  <div class="card">
      <Toolbar>
          <template #start>
              <Button  class="mr-2 !text-green-600" severity="secondary" text   > Home</Button>
              <Button  class="mr-2" severity="secondary" text > Coinflip </Button>
              <Button  severity="secondary" text > Roulette </Button>
          </template>

          <template #center>
              <IconField>
                  <InputIcon>
                      <i class="pi pi-search" />
                  </InputIcon>
                  <InputText placeholder="Search" />
              </IconField>
          </template>

          <template #end> <img src="/pfp.png" class="w-15 rounded-full"></img></template>
      </Toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button, IconField, InputText, SplitButton, InputIcon, Toolbar } from 'primevue';

const items = ref([
  {
      label: 'Update',
      icon: 'pi pi-refresh'
  },
  {
      label: 'Delete',
      icon: 'pi pi-times'
  }
])
</script>
