<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({
  src: { type: String }
})

</script>

<template>
  <img :src="props.src || '/images/user-placeholder.png'" />
</template>

<style scoped>
  img{
    object-fit: cover;
  }
</style>
