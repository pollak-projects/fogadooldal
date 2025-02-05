<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <Navbar v-if="route.path != '/login' && route.path != '/register'" />
  <RouterView />
  <Footer v-if="route.path != '/login' && route.path != '/register'" />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap");

body {
  background-color: rgb(46, 40, 54);
  font-family: "Averia Serif Libre", serif;
}
</style>
