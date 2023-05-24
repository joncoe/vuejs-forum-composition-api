<script async setup>
import {defineProps } from 'vue';
import ThreadEditor from '@/components/ThreadEditor.vue';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})

const store = useStore();
let router = useRouter();

const forum = await store.dispatch('fetchForum', props.forumId)

const save = async ({title, text}) => {
  const thread = await store.dispatch('createThread', {
    forumId: props.forumId,
    title: title,
    text: text
  })
  router.push({name: 'ThreadShow', params: {
    id: thread.id
  }})
}
const cancel = () => {
  router.push({name: 'Forum', params: {
    id: forum.id
  }})
}
</script>

<template>
  <div v-if="forum" class="col-full push-top">

    <h1>Create new thread in <i>{{forum.name}}</i></h1>

    <ThreadEditor @save="save" @cancel="cancel"/>

  </div>
</template>



<style lang="scss" scoped></style>
