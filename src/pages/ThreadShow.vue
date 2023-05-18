<script setup>
import { reactive, ref, computed, defineProps } from "vue";
import sourceData from "@/data.json";
import PostList from "@/components/PostList.vue";

const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);
const newPostText = ref("")

const props = defineProps(['id'])

const thread = computed(() => {
  return threads.find(thread => thread.id === props.id)
})

const threadPosts = computed(() => {
  return posts.filter(post => post.threadId === props.id)
})

const addPost = () => {
  const postId = 'ggqq' + Math.random()
  const post = {
    id: postId,
    text: newPostText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: props.id,
    userId: 'rpbB8C6ifrYmNDufMERWfQUoa202'
  }
  posts.push(post)
  thread.value.posts.push(postId)
  newPostText.value = "";
}

</script>
<template>
  <div class="col-large push-top">
    <h2>{{ thread.title }}</h2>

    <PostList :posts="threadPosts" />

    <form @submit.prevent="addPost">
      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
          placeholder="Enter your post."
          v-model="newPostText"
        />
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">Publish </button>
      </div>
    </form>

  </div>
</template>


<style lang="scss" scoped></style>
