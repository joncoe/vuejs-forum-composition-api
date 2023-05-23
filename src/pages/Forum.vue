<script setup>
import { defineProps, computed } from 'vue';
import {useStore} from 'vuex';
import ThreadList from '@/components/ThreadList.vue';

const store = useStore();

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const forum = computed(() => {
  return store.state.forums.find(forum => forum.id === props.id)
})
const threads = computed(() => {
  return forum.value.threads ? forum.value.threads.map(threadId => store.getters.thread(threadId)) : []
})

</script>
<template>
    <div class="col-full push-top">
      <div class="forum-header">
        <div class="forum-details">
          <h1>{{forum.name}}</h1>
          <p class="text-lead">{{forum.description}}</p>
        </div>
        <router-link
          :to="{
            name: 'ThreadCreate',
            params: {
              forumId: forum.id
            }}"
            class="btn-green btn-small">
              Start a thread
        </router-link>
      </div>
    </div>



    <div class="col-full push-top">

      <ThreadList :threads="threads"/>

    </div>

</template>


<style lang="scss" scoped></style>
