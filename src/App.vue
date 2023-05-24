<script async setup>
import {useStore} from 'vuex';
import TheNavBar from './components/TheNavBar.vue';

const store = useStore();
console.log(store.state.authId)
store.dispatch('fetchAuthUser')


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
