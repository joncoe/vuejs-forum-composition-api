<script setup>
import TheNavBar from './components/TheNavBar.vue';
</script>

<template>
  <TheNavBar/>
  <div class="container">
    <suspense>
      <router-view/>
    </suspense>
  </div>
</template>



<style>
@import "assets/style.css";
</style>
