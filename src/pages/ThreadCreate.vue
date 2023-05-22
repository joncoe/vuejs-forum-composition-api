<script setup>
import {defineProps, ref, computed} from 'vue';
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

const title = ref('');
const text = ref('');

const forum = computed(() => {
  return store.state.forums.find(forum => forum.id === props.forumId)
})

const save = async () => {
  const thread = await store.dispatch('createThread', {
    forumId: props.forumId,
    title: title.value,
    text: text.value
  })
  router.push({name: 'ThreadShow', params: {
    id: thread.id
  }})
}
const cancel = () => {
  router.push({name: 'Forum', params: {
    id: forum.value.id
  }})
}
</script>

<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{forum.name}}</i></h1>

    <form @submit.prevent="save">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input v-model="title" type="text" id="thread_title" class="form-input" name="title">
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea v-model="text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" @click="cancel">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">Publish </button>
      </div>
    </form>
  </div>
</template>



<style lang="scss" scoped></style>
