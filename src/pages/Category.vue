<script setup>
import { defineProps, computed } from 'vue';
import {useStore} from 'vuex';
import ForumList from '@/components/ForumList.vue';
import { findById } from '@/helpers';

const store = useStore();

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = computed(() => {
  return findById(store.state.categories, props.id);
})


const getForumsForCategory = (category) => {
  return store.state.forums.filter(forum => forum.categoryId === category.id)
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
