<script setup>
import {reactive, ref } from 'vue';
import { useRouter } from  'vue-router';
import { useStore } from 'vuex';

import { Form, Field, ErrorMessage } from 'vee-validate';

const store = useStore();
const router = useRouter();

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  avatar: ''
})

const avatarPreview = ref(null);

const register = async () => {
  await store.dispatch('auth/registerUserWithEmailAndPassword', {...form})
  router.push({name: 'Home'})
}

const registerWithGoogle = async () => {
  await store.dispatch('auth/signInWithGoogle', {...form})
  router.push({name: 'Home'})
}

const handleImageUpload = (e) => {
  form.avatar = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (event) => {
    avatarPreview.value = event.target.result
  }
  reader.readAsDataURL(form.avatar)
}

const required = (value) => {
  if (value && value.trim()) return true
  return 'This is required'
}

</script>
<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <Form
        @submit="register"
        class="card card-form"
      >
        <h1 class="text-center">Register</h1>

        <div class="form-group">
          <label for="name">Full Name</label>
          <Field v-model="form.name" name="name" id="name" type="text" class="form-input" :rules="required"/>
          <ErrorMessage name="name" class="form-error"/>
        </div>

        <div class="form-group">
          <label for="username">Username</label>
          <Field v-model="form.username" name="username" id="username" type="text" class="form-input" :rules="required"/>
          <ErrorMessage name="username" class="form-error"/>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <Field v-model="form.email" name="email" id="email" type="email" class="form-input" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <Field v-model="form.password" name="password" id="password" type="password" class="form-input" />
        </div>

        <div class="form-group">
          <label for="avatar">
            Avatar
            <div v-if="avatarPreview">
              <img :src="avatarPreview" class="avatar-xlarge">
            </div>
          </label>
          <Field
            v-show="!avatarPreview"
            id="avatar"
            name="avatar"
            type="file"
            class="form-input"
            accept="image/*"
            @change="handleImageUpload"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
      </Form>
      <div class="text-center push-top">
        <button @click="registerWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
