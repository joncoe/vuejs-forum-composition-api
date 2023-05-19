<script setup>
import { defineProps } from 'vue';
import CategoryList from '@/components/CategoryList.vue'

defineProps({
  category: {
    type: Array,
    required: true
  }
})


</script>


<template>
  <div>{{ category.name }}</div>

  <CategoryList :forums="category.forums" />

</template>


<style lang="scss" scoped>

</style>
