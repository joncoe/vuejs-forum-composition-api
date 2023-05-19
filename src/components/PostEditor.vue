<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['save-post']);

const postText = ref("")

const savePost = () => {
  const post = {
    text: postText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: null,
    userId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
  }
  emit('save-post', { post })
  postText.value = "";
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
          v-model="postText"
        />
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">Publish </button>
      </div>
    </form>
  </div>
</template>


<style lang="scss" scoped>

</style>
