<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

import PostList from '@/components/PostList';

const store = useStore();
const user = computed(() => store.getters.authUser);

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const userPostsCount = computed(() => userPosts.value.length);
const userThreadCount = computed(() => userThreads.value.length);


const userPosts = computed(() => {
  return store.state.posts.filter(post => post.userId === user.value.id)
})

const userThreads = computed(() => {
  return store.state.threads.filter(thread => thread.userId === user.value.id)
})

</script>
<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">

        <div class="profile-card">

          <p class="text-center">
            <img :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge">
          </p>

          <h1 class="title">{{user.username}}</h1>

          <p class="text-lead">{{user.name}}</p>

          <p class="text-justify">
            {{user.bio || "No biography 🤷🏼‍♀️"}}
          </p>

          <span class="online">🟢 {{user.name }} is online</span>


          <div class="stats">
            <span>{{userPostsCount}} posts</span>
            <span>{{userThreadCount}} threads</span>
          </div>

          <hr>

          <p class="text-large text-center"><i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a></p>

        </div>

        <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

        <div class="text-center">
          <hr>
          <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
        </div>

      </div>

      <div class="col-7 push-top">

        <div class="profile-header">
          <span class="text-lead">
            Joker's recent activity
          </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr>

        <PostList :posts="userPosts" />

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
