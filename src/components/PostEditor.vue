<script setup>
import { defineEmits, defineProps, reactive } from 'vue';

const emit = defineEmits(['save-post']);
const props = defineProps({
  post: {
    type: Object,
    default: () => ({text: null})
  }
})


const postCopy = reactive({
  ...props.post
})

const savePost = () => {
  const post = {...postCopy}
  emit('save-post', post )
  postCopy.text = '';
}


</script>
<template>
  <div>
    <form @submit.prevent="savePost">
      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
          placeholder="Enter your post."
          v-model="postCopy.text"
        />
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">{{post.id ? 'Update Post' : 'Submit and Save'}} </button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>
