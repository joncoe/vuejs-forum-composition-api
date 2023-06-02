<script async setup>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import TheNavBar from '@/components/TheNavBar.vue';
import AppSpinner from '@/components/AppSpinner.vue';
import AppNotifications from '@/components/AppNotifications.vue';

const store = useStore();
store.dispatch('auth/fetchAuthUser')
const route = useRoute();


</script>

<template>
  <AppHead>
    <title>Master Class Forum - Composition API version by Jonathan Coe</title>
    <meta name="description" content="A Forum Project Powered by VueJS3">

    <!-- Social -->
    <meta property="og:title" content="Vue.js 3 Master Class Forum">
    <meta property="og:description" content="A Forum Project Powered by VueJS3">
    <meta property="og:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg">

    <!-- Twitter -->
    <meta name="twitter:title" content="Vue.js 3 Master Class Forum">
    <meta name="twitter:description" content="A Forum Project Powered by VueJS3">
    <meta name="twitter:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg">
    <meta name="twitter:card" content="summary_large_image">
  </AppHead>
  <div>
    <Suspense>
      <TheNavBar />
    </Suspense>
    <div class="container">
      <router-view v-slot="{ Component }" :key="`${route.path}${JSON.stringify(route.query)}`">
        <Suspense>
          <template #default>
            <component :is="Component"></component>
          </template>
          <template #fallback>
            <AppSpinner />
          </template>
        </Suspense>
      </router-view>
    </div>
    <AppNotifications />
  </div>
</template>



<style>
@import "assets/style.css";
</style>
