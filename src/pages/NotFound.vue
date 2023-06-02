<script setup>

</script>


<template>
  <div class="col-full text-center">
    <AppHead>
      <title>Page Not Found ¯\_(ツ)_/¯</title>
      <meta property="og:title" :content="'Page Not Found'">
      <meta name="twitter:title" :content="'Page Not Found'">
    </AppHead>
    <h1>Not Found!</h1>
    <router-link :to="{ name: 'Home' }">Go home</router-link>
  </div>
</template>



<style lang="scss" scoped></style>
