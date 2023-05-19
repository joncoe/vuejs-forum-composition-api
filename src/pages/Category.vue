<script setup>
import { defineProps, computed } from 'vue';
import ForumList from '@/components/ForumList.vue'
import sourceData from '@/data.json';


const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = computed(() => {
  return sourceData.categories.find(category => category.id === props.id);
})


const getForumsForCategory = (category) => {
  return sourceData.forums.filter(forum => forum.categoryId === category.id)
}

</script>

<template>
  <div class="col-full">
    <h1>{{ category.name }}</h1>
    <ForumList
      :title="category.name"
      :forums="getForumsForCategory(category)"
    />
  </div>
</template>



<style lang="scss" scoped>

</style>
