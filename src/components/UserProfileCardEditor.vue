<script setup>
import { defineProps, reactive, ref } from 'vue';
import {useStore} from 'vuex';
import { useRouter } from 'vue-router';

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const uploadingImage = ref(false)

const store = useStore();
const router = useRouter();


let activeUser = reactive({ ...props.user });

const save = () => {
  store.dispatch('users/updateUser', {...activeUser});
  router.push({name: 'Profile'})
}

const cancel = () => {
  router.push({name: 'Profile'})
}

const handleAvatarUpload = async (e) => {
  uploadingImage.value = true;
  const file = e.target.files[0]
  const uploadedImage = await store.dispatch('auth/uploadAvatar', { file });
  activeUser.avatar = uploadedImage || activeUser.avatar;
  uploadingImage.value = false;
}

</script>
<template>
  <div class="profile-card">

    <p class="text-center  avatar-edit">
      <label for="avatar">
        <AppAvatarImg
          :src="activeUser.avatar"
          :alt="`${user.name} profile picture`"
          class="avatar-xlarge img-update"
        />
        <div class="avatar-upload-overlay">
          <AppSpinner v-if="uploadingImage" color="white" />
          <fa v-else icon="camera" size="3x" :style="{color: 'white', opacity: '8'}" />
        </div>
        <input v-show="false" type="file" id="avatar" accept="image/*" @change="handleAvatarUpload">
      </label>
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
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped></style>
