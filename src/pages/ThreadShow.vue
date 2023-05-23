<script setup>
import { computed, defineProps } from "vue";
import {useStore} from 'vuex';
import firebase from 'firebase';

import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";

const store = useStore();

const posts = computed(() => store.state.posts);

const thread = computed(() => {
  return store.getters.thread(props.id);
})

const props = defineProps(['id'])

firebase.firestore().collection('threads').doc(props.id).onSnapshot((doc) => {

  const thread = { ...doc.data(), id: doc.id }
  store.commit('setThread', { thread })

  // fetch the user
  firebase.firestore().collection('users').doc(thread.userId).onSnapshot((doc) => {
        const user = { ...doc.data(), id: doc.id }
        store.commit('setUser', { user })
      })

      // fetch the posts
      thread.posts.forEach(postId => {
        firebase.firestore().collection('posts').doc(postId).onSnapshot((doc) => {
          const post = { ...doc.data(), id: doc.id }
          store.commit('setPost', { post })
          // fetch the user for each post
          firebase.firestore().collection('users').doc(post.userId).onSnapshot((doc) => {
            const user = { ...doc.data(), id: doc.id }
            store.commit('setUser', { user })
          })
        })
      })
})

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
    <h1>{{ thread.title }}
      <router-link
        :to="{name: 'ThreadEdit', id: id}"
        class="btn-green btn-small"
      >Edit Thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{thread.author?.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
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
