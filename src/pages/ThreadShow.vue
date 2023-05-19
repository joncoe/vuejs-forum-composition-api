<script setup>
import { computed, defineProps } from "vue";
import {useStore} from 'vuex';
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";

const store = useStore();

const threads = computed(() => store.state.threads);
const posts = computed(() => store.state.posts);
const thread = computed(() => {
  return threads.value.find(thread => thread.id === props.id)
})

const props = defineProps(['id'])

const threadPosts = computed(() => {
  return posts.value.filter(post => post.threadId === props.id)
})
const addPost = (e) => {
  const post = {
    ...e.post,
    threadId: props.id,
  }
  store.dispatch('createPost', post)
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
