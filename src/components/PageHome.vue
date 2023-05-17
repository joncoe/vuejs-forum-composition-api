<script setup>
import {reactive} from 'vue';
import sourceData from '@/data.json';

const threads = reactive(sourceData.threads);
const posts = reactive( sourceData.posts);
const users = reactive( sourceData.users);

const postById = (postId) => {
      return posts.find(p => p.id === postId)
    }
const userById = (userId) => {
  return users.find(p => p.id === userId)
}


</script>
<template>
  <div>
    <div v-for="thread in threads" :key="thread.id">
      <h2>{{thread.title}}</h2>
      <div v-for="postId in thread.posts" :key="postId">
        <p>{{ userById((postById(postId).userId)).name }}</p>
        <p>{{ postById(postId).text }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>
