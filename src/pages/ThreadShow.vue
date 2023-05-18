<script setup>
import { reactive, computed, defineProps } from "vue";
import sourceData from "@/data.json";
import PostList from "@/components/PostList.vue";

const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);

const props = defineProps(['id'])

const thread = computed(() => {
  return threads.find(thread => thread.id === props.id)
})

const threadPosts = computed(() => {
  return posts.filter(post => post.threadId === props.id)
})

</script>
<template>
  <div class="col-large push-top">
    <h2>{{ thread.title }}</h2>

    <PostList :posts="threadPosts" />

  </div>
</template>


<style lang="scss" scoped>

</style>
