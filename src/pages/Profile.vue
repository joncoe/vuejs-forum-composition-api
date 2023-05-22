<script setup>
import { computed, defineProps } from 'vue';
import { useStore } from 'vuex';

import PostList from '@/components/PostList';
import UserProfileCard from '@/components/UserProfileCard.vue';

const store = useStore();
const user = computed(() => store.getters.authUser);

defineProps({
  id: {
    required: true,
    type: String
  }
})


</script>
<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">

        <UserProfileCard :user="user"/>

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

        <PostList :posts="user.posts" />

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
