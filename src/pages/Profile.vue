<script async setup>
import { computed, defineProps } from 'vue';
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

const lastPostFetched = computed(() => {
  if (user.value.posts.length === 0) return null
  return user.value.posts[user.value.posts.length - 1]
})

const fetchUserPosts = async () => {
  return await store.dispatch('auth/fetchAuthUsersPosts', { startAfter: lastPostFetched.value })
}

await fetchUserPosts()

</script>
<template>
  <div v-if="user" class="container col-full">
    <AppHead>
      <title>{{ user.username }} Profile Page</title>
      <meta property="og:title" :content="'Profile Page'">
      <meta name="twitter:title" :content="'Profile Page'">
    </AppHead>
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
              {{ user.username }}'s recent activity
            </span>
          </div>

          <hr>

          <PostList :posts="user.posts" />
          <AppInfiniteScroll @load="fetchUserPosts" :done="user.posts.length === user.postsCount" />

        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped></style>
