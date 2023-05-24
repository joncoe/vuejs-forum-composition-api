<script setup async>
import { computed, defineProps } from "vue";
import {useStore} from 'vuex';

import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";

const store = useStore();
const props = defineProps(['id'])

const thread = await store.dispatch('fetchThread', {id: props.id})
const author = await store.dispatch('fetchUser', {id: thread.userId})
thread.posts.forEach(async (postId) => {
  const post = await store.dispatch('fetchPost', {id: postId});
  store.dispatch('fetchUser', {id: post.userId})
})


const threadPosts = computed(() => {
  return store.state.posts;
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
    <h1>{{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', id: id}"
        class="btn-green btn-small"
      >Edit Thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{author?.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small">
          {{thread.repliesCount}} replies by
          {{thread.contributorsCount}} contributors
      </span>
    </p>

    <PostList :posts="threadPosts" />
    <PostEditor @save-post="addPost"/>

  </div>

</template>


<style lang="scss" scoped></style>
