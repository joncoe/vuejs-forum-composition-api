<script setup>
import TheNavBar from './components/TheNavBar.vue';
</script>

<template>
  <TheNavBar/>
  <div class="container">
    <router-view/>
  </div>
</template>



<style>
@import "assets/style.css";
</style>
