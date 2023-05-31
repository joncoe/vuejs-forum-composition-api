<script setup>
import { defineProps, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import UserProfileCardEditorRandomAvatar from './UserProfileCardEditorRandomAvatar'
import UserProfileCardEditorReauthenticate from './UserProfileCardEditorReauthenticate.vue'
import useNotifications from '@/composables/useNotifications'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const uploadingImage = ref(false)
const locationOptions = ref([])
const needsReAuth = ref(false)

const store = useStore();
const router = useRouter();


let activeUser = reactive({ ...props.user });

const save = async () => {
  await handleRandomAvatarUpload();
  const emailChanged = activeUser.email !== props.user.email
  if (emailChanged) {
    needsReAuth.value = true
  } else {
    saveUserData()
  }
}

const { addNotification } = useNotifications()

const cancel = () => {
  router.push({ name: 'Profile' })
}

const handleAvatarUpload = async (e) => {
  uploadingImage.value = true;
  const file = e.target.files[0]
  const uploadedImage = await store.dispatch('auth/uploadAvatar', { file });
  activeUser.avatar = uploadedImage || activeUser.avatar;
  uploadingImage.value = false;
}

const randomAvatar = (e) => {
  activeUser.avatar = e;
}

const handleRandomAvatarUpload = async () => {
  if (!activeUser.avatar) return
  const randomAvatarGenerated = activeUser.avatar.startsWith('https://pixabay')
  if (randomAvatarGenerated) {
    const image = await fetch(activeUser.avatar)
    const blob = await image.blob()
    activeUser.avatar = await store.dispatch('auth/uploadAvatar', { file: blob, filename: 'random' })
  }
}

const loadLocationOptions = async () => {
  if (locationOptions.value.length) return
  const res = await fetch('https://restcountries.com/v3/all')
  locationOptions.value = await res.json()
}

const onReauthenticated = async () => {
  await store.dispatch('auth/updateEmail', { email: activeUser.email })
  console.log('on reauthenticated successful')
  saveUserData()
}

const onReauthenticatedFailed = async () => {
  addNotification({ message: 'Error updating user', type: 'error', timeout: 3000 })
  router.push({ name: 'Profile' })
}

const saveUserData = async () => {
  await store.dispatch('users/updateUser', { ...activeUser, threads: activeUser.threadIds })
  await store.dispatch('auth/updateEmail', { email: activeUser.email })
  router.push({ name: 'Profile' })
  addNotification({ message: 'User successfully updated', timeout: 3000 })
}

</script>
<template>
  <div class="profile-card">
    <VeeForm @submit="save">
      <p class="text-center  avatar-edit">
        <label for="avatar">
          <AppAvatarImg :src="activeUser.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge img-update" />
          <div class="avatar-upload-overlay">
            <AppSpinner v-if="uploadingImage" color="white" />
            <fa v-else icon="camera" size="3x" :style="{ color: 'white', opacity: '8' }" />
          </div>
          <input v-show="false" type="file" id="avatar" accept="image/*" @change="handleAvatarUpload">
        </label>
      </p>

      <UserProfileCardEditorRandomAvatar @hit="randomAvatar" />

      <AppFormField label="Username" name="username" v-model="activeUser.username" :rules="`required|unique:users,username,${user.username}`" />
      <AppFormField label="Full Name" name="name" v-model="activeUser.name" rules="required" />
      <AppFormField label="Bio" name="bio" as="textarea" v-model="activeUser.bio" placeholder="Write a few words about yourself." />

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr>

      <AppFormField label="Website" name="website" v-model="activeUser.website" rules="url" />
      <AppFormField label="Email" name="email" v-model="activeUser.email" :rules="`required|email|unique:users,email,${user.email}`"/>
      <AppFormField label="Location" name="location" v-model="activeUser.location" list="locations" @mouseenter="loadLocationOptions"/>
      <datalist id="locations">
        <option v-for="location in locationOptions" :value="location.name.common" :key="location.name.common" />
      </datalist>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </VeeForm>
    <UserProfileCardEditorReauthenticate
      v-model="needsReAuth"
      @success="onReauthenticated"
      @fail="onReauthenticatedFailed"
    />
  </div>
</template>


<style lang="scss" scoped></style>
