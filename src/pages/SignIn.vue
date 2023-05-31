<script async setup>
import {reactive} from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
const store = useStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  email: '',
  password: ''
})

const signIn = async () => {
  try {
    await store.dispatch('auth/signInWithEmailAndPassword', { ...form })
    successRedirect()
  } catch (error) {
    console.error('Bad account info')
  }
}

const signInWithGoogle = async () => {
  await store.dispatch('auth/signInWithGoogle')
  successRedirect()
}

const successRedirect = () => {
  const redirectTo = route.query.redirectTo || {name: 'Home'};
  router.push(redirectTo)
}

</script>
<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <VeeForm @submit="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <AppFormField label="Email" name="email" type="email" v-model="form.email" rules="required|email" />
        <AppFormField label="Password" name="password" type="password" v-model="form.password" rules="required" />

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'Register'}">Create an account?</router-link>
        </div>
      </VeeForm>

      <div class="push-top text-center">
        <button @click="signInWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
