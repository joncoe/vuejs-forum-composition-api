<script async setup>
import { useStore } from 'vuex';
import TheNavBar from './components/TheNavBar.vue';
import AppSpinner from './components/AppSpinner.vue';

const store = useStore();
store.dispatch('fetchAuthUser')


</script>

<template>
    <div>
      <Suspense>
        <TheNavBar />
      </Suspense>
      <div class="container">
        <router-view v-slot="{ Component }">
          <Suspense>
            <template #default>
              <component :is="Component"></component>
            </template>
            <template #fallback>
              <AppSpinner/>
            </template>
          </Suspense>
        </router-view>
      </div>
    </div>
</template>



<style>
@import "assets/style.css";
</style>
