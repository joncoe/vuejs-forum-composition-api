<script setup>
import {defineProps, ref, computed, defineEmits} from 'vue';
import {useStore} from 'vuex';
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['success', 'fail'])
const store = useStore();

const email = ref('')
const password = ref('')

const showModal = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const reauthenticate = async () => {

  try {
    await store.dispatch('auth/reauthenticate', { email: email.value, password: password.value })
    emit('success')
  } catch (error) {
    emit('fail', error)
  }
}


</script>
<template>
  <VueFinalModal v-model="showModal" classes="modal-container" content-class="modal">
    <div class="modal-content">
      <h4>Login Again to Change Your Email</h4>
      <VeeForm @submit="reauthenticate">
        <AppFormField name="reauth-email" label="Email" v-model="email" rules="email" />
        <AppFormField name="reauth-password" label="Password" v-model="password" type="password" />
        <button class="btn btn-green btn-small">Login</button>
      </VeeForm>
    </div>
  </VueFinalModal>
</template>
