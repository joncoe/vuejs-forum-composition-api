<script setup>
import {defineProps, computed} from 'vue';
import ThreadEditor from '@/components/ThreadEditor.vue';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
import { findById } from '@/helpers';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore();
let router = useRouter();

const thread = computed(() => {
  return findById(store.state.threads, props.id);
})
const text = computed(() => {
  return findById(store.state.posts, thread.value.posts[0]).text;
})

const save = async ({title, text}) => {
  const thread = await store.dispatch('updateThread', {
    id: props.id,
    title,
    text
  })
  router.push({name: 'ThreadShow', params: {
    id: thread.id
  }})
}
const cancel = () => {
  router.push({name: 'ThreadShow', params: {
    id: props.id
  }})
}
</script>

<template>
  <div class="col-full push-top">

    <h1>Editing <i>{{thread.title}}</i></h1>

    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel"/>

  </div>
</template>



<style lang="scss" scoped></style>
