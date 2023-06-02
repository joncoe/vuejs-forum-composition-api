<script async setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import ForumList from '@/components/ForumList.vue';

const store = useStore();

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const category = await store.dispatch('categories/fetchCategory', { id: props.id }) || {};
const forums = await store.dispatch('forums/fetchForums', { ids: category.forums })


</script>

<template>
  <div class="col-full">
    <AppHead>
      <title>{{ category.name }}</title>
      <meta property="og:title" :content="category.name">
      <meta name="twitter:title" :content="category.name">
    </AppHead>
    <h1>{{ category.name }}</h1>
    <ForumList :title="category.name" :forums="forums" />
  </div>
</template>



<style lang="scss" scoped></style>
