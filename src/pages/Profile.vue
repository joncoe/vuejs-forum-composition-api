<script setup>
import { computed, defineProps } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useStore } from 'vuex';

// import PostList from '@/components/PostList';
// import UserProfileCard from '@/components/UserProfileCard';
// import UserProfileCardEditor from '@/components/UserProfileCardEditor';

const store = useStore();
const user = computed(() => store.getters.authUser);

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

onBeforeRouteUpdate((to, from) => {
  console.log('hi')
  if (!store.state.authId) {
    return { name: 'Home'}
  }
})


</script>
<template>
  <div class="container">
    <h1>Profile page</h1>
    <!--
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
    -->
  </div>
</template>


<style lang="scss" scoped></style>
