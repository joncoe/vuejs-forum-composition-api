<script setup>
import { defineProps, reactive } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const store = useStore();
const router = useRouter();


let activeUser = reactive({ ...props.user });

const save = () => {
  store.dispatch('updateUser', {...activeUser});
  router.push({name: 'Profile'})
}

const cancel = () => {
  router.push({name: 'Profile'})
}

</script>
<template>
  <div class="profile-card">

    <p class="text-center">
      <img :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge img-update">
    </p>
    <form @submit.prevent="save">

      <div class="form-group">
        <input type="text" v-model="activeUser.username" placeholder="Username" class="form-input text-lead text-bold">
      </div>

      <div class="form-group">
        <input type="text" v-model="activeUser.name" placeholder="Full Name" class="form-input text-lead">
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea v-model="activeUser.bio" class="form-input" id="user_bio"
          placeholder="Write a few words about yourself."></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadCount }} threads</span>
      </div>

      <hr>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input v-model="activeUser.website" autocomplete="off" class="form-input" id="user_website">
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input v-model="activeUser.email" autocomplete="off" class="form-input" id="user_email">
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input v-model="activeUser.location" autocomplete="off" class="form-input" id="user_location">
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>
