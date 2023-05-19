<script setup>
import { defineProps } from 'vue';
import ForumList from '@/components/ForumList.vue'
import sourceData from "@/data.json";

defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const getForumsForCategory = (category) => {
  return sourceData.forums.filter(forum => forum.categoryId === category.id)
}

</script>

<template>
  <div>

    <ForumList
      v-for="category in categories"
      :key="category.id"
      :forums="getForumsForCategory(category)"
      :title="category.name"
      :category-id="category.id"
    />

  </div>
</template>



<style lang="scss" scoped>

</style>
