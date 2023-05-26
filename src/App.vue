<script async setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TheNavBar from './components/TheNavBar.vue';
import AppSpinner from './components/AppSpinner.vue';

const store = useStore();
store.dispatch('auth/fetchAuthUser')
const route = useRoute();


</script>

<template>
    <div>
      <Suspense>
        <TheNavBar />
      </Suspense>
      <div class="container">
        <router-view v-slot="{ Component }" :key="route.path">
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
