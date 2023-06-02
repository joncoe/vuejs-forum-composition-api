<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  src: { type: String }
})

</script>

<template>
  <img :src="props.src || '/img/user-placeholder.png'" />
</template>

<style scoped>
img {
  object-fit: cover;
}
</style>
