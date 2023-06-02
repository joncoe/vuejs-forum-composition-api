<script async setup>
import { defineProps, ref } from 'vue';
import ThreadEditor from '@/components/ThreadEditor.vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore();
let router = useRouter();

const formIsDirty = ref(false)

const thread = await store.dispatch('threads/fetchThread', { id: props.id });
const post = await store.dispatch('posts/fetchPost', { id: thread.posts[0] }) || '';


const save = async ({ title, text }) => {
  const thread = await store.dispatch('threads/updateThread', {
    id: props.id,
    title,
    text
  })
  router.push({
    name: 'ThreadShow', params: {
      id: thread.id
    }
  })
}
const cancel = () => {
  router.push({
    name: 'ThreadShow', params: {
      id: props.id
    }
  })
}

onBeforeRouteLeave(() => {
  if (formIsDirty.value) {
    const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost!')
    if (!confirmed) return false
  }
})
const dirtyClean = (value) => {
  formIsDirty.value = value
}
</script>

<template>
  <div v-if="thread && post" class="col-full push-top">
    <AppHead>
      <title>Edit a Thread ✏️🧵</title>
      <meta property="og:title" :content="'Edit a Thread'">
      <meta name="twitter:title" :content="'Edit a Thread'">
    </AppHead>

    <h1>Editing <i>{{ thread.title }}</i></h1>

    <ThreadEditor :title="thread.title" :text="post.text" @save="save" @cancel="cancel" @dirty="dirtyClean(true)"
      @clean="dirtyClean(false)" />

  </div>
</template>



<style lang="scss" scoped></style>
