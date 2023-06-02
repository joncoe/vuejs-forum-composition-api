<script async setup>
import { defineProps, ref } from 'vue';
import ThreadEditor from '@/components/ThreadEditor.vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})

const formIsDirty = ref(false)
const store = useStore();
let router = useRouter();

const forum = await store.dispatch('forums/fetchForum', { id: props.forumId })

const save = async ({ title, text }) => {
  const thread = await store.dispatch('threads/createThread', {
    forumId: props.forumId,
    title: title,
    text: text
  })
  router.push({
    name: 'ThreadShow', params: {
      id: thread.id
    }
  })
}
const cancel = () => {
  router.push({
    name: 'Forum', params: {
      id: forum.id
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
  <div v-if="forum" class="col-full push-top">
    <AppHead>
      <title>Create a Thread 🧵</title>
      <meta property="og:title" :content="'Create a Thread'">
      <meta name="twitter:title" :content="'Create a Thread'">
    </AppHead>

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <ThreadEditor @save="save" @cancel="cancel" @dirty="dirtyClean(true)" @clean="dirtyClean(false)" />

  </div>
</template>



<style lang="scss" scoped></style>
