<script setup>
import { defineEmits, defineProps, reactive, ref } from 'vue';

const emit = defineEmits(['save-post']);
const props = defineProps({
  post: {
    type: Object,
    default: () => ({text: null})
  }
})

const formKey = ref(Math.random())


const postCopy = reactive({
  ...props.post
})

const savePost = () => {
  const post = {...postCopy}
  emit('save-post', post )
  postCopy.text = '';
  formKey.value = Math.random()
}


</script>
<template>
  <div>
    <VeeForm @submit="savePost" :key="formKey">
      <div class="form-group">
        <AppFormField as="textarea" name="text" v-model="postCopy.text" rows="10" cols="30" rules="required" />
      </div>

      <div class="btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">{{post.id ? 'Update Post' : 'Submit and Save'}} </button>
      </div>
    </VeeForm>
  </div>
</template>


<style lang="scss" scoped>

</style>
