<script setup>
import { reactive, ref, computed, defineProps } from "vue";
import sourceData from "@/data.json";
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";

const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);
const thread = computed(() => {
  return threads.find(thread => thread.id === props.id)
})

const props = defineProps(['id'])

const threadPosts = computed(() => {
  return posts.filter(post => post.threadId === props.id)
})
const addPost = (e) => {
  const post = {
    ...e.post,
    threadId: props.id,
  }
  thread.value.posts.push(e.postId)
  posts.push(post)
}

</script>
<template>
  <div class="col-large push-top">
    <h2>{{ thread.title }}</h2>

    <PostList :posts="threadPosts" />
    <PostEditor @save-post="addPost"/>

  </div>
</template>


<style lang="scss" scoped></style>
