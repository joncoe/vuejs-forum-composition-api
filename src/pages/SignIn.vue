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
    alert(error.message)
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
      <Form @submit="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <Field name="email" v-model="form.email" id="email" type="text" class="form-input" rules="required" />
          <ErrorMessage name="email" class="form-error"/>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" v-model="form.password" id="password" type="password" class="form-input" rules="required" />
          <ErrorMessage name="password" class="form-error"/>
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'Register'}">Create an account?</router-link>
        </div>
      </Form>

      <div class="push-top text-center">
        <button @click="signInWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
