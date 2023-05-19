<script setup>
import { defineProps } from 'vue';
import {useStore} from 'vuex';
import ForumList from '@/components/ForumList.vue'

const store = useStore();

defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const getForumsForCategory = (category) => {
  return store.state.forums.filter(forum => forum.categoryId === category.id)
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
