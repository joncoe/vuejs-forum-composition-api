<script async setup>
import { computed, defineProps } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useStore } from 'vuex';

import PostList from '@/components/PostList';
import UserProfileCard from '@/components/UserProfileCard';
import UserProfileCardEditor from '@/components/UserProfileCardEditor';

const store = useStore();
const user = computed(() => store.getters['auth/authUser']);


defineProps({
  id: {
    required: true,
    type: String
  },
  edit: {
    type: Boolean,
    default: false,
    required: true
  }
})

onBeforeRouteUpdate(() => {
  if (!store.state.authId) {
    return { name: 'Home'}
  }
})

const lastPostFetched = computed(() => {
  if (user.value.posts.length === 0) return null
  return user.value.posts[user.value.posts.length - 1]
})

await store.dispatch('auth/fetchAuthUsersPosts', {startAfter: lastPostFetched.value})

</script>
<template>
  <div class="container col-full">
    <div>
      <h1>Profile page</h1>
    </div>
    <div class="col-full">

      <div class="flex-grid">
        <div class="col-3 push-top">

          <UserProfileCardEditor v-if="edit" :user="user" />
          <UserProfileCard v-else :user="user" />

        </div>

        <div class="col-7 push-top">

          <div class="profile-header">
            <span class="text-lead">
              {{user.username}}'s recent activity
            </span>
            <a href="#">See only started threads?</a>
          </div>

          <hr>

          <PostList :posts="user.posts" />

        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped></style>
