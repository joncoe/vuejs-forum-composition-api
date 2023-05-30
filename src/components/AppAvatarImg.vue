<script setup>
import {defineProps, ref} from 'vue';

const props = defineProps({
  src: { type: String }
})

const imgSrc = ref(props.src || '/images/user-placeholder.png')

</script>

<template>
  <img :src="imgSrc" />
</template>
