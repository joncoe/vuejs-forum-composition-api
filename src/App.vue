<script async setup>
import { useStore } from 'vuex';
import TheNavBar from './components/TheNavBar.vue';

const store = useStore();
store.dispatch('fetchAuthUser')


</script>

<template>
  <suspense>
    <div>
      <TheNavBar />
      <div class="container">
        <router-view />
      </div>
    </div>
  </suspense>
</template>



<style>
@import "assets/style.css";
</style>
