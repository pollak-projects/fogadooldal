<script setup>
import {RouterView} from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute()

</script>
<template>
  <Navbar v-if="route.path != '/login' && route.path != '/register'" />
  <RouterView/>
</template>

<style scoped></style>
