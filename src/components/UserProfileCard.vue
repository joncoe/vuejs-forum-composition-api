<script setup>
import { defineProps } from 'vue';

defineProps({
  user: {
    type: Object,
    required: true
  }
})


</script>


<template>
  <div>
    <div class="profile-card">

      <p class="text-center">
        <AppAvatarImg :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge" />
      </p>

      <h1 class="title">{{ user.username }}</h1>

      <p class="text-lead">{{ user.name }}</p>

      <p class="text-justify">
        {{ user.bio || "No biography 🤷🏼‍♀️" }}
      </p>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>


      <p class="text-large text-center"><i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a></p>

    </div>

    <div class="text-center">
      <router-link :to="{name: 'ProfileEdit', }" class="btn-green btn-small">Edit Profile</router-link>
    </div>

  </div>
</template>



<style lang="scss" scoped></style>
