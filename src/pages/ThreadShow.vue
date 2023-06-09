<script setup async>
import { computed, defineProps, reactive, ref } from "vue";
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';

import {difference} from 'lodash';
import PostList from "@/components/PostList.vue";
import PostEditor from "@/components/PostEditor.vue";
import AppDate from "@/components/AppDate.vue";
import useNotifications from '@/composables/useNotifications'

const store = useStore();
const route = useRoute();
const { addNotification } = useNotifications();

const props = defineProps(['id'])

const thread = reactive({
  loadedThread: null,
  initialLoad: false
})
const posts = reactive({
  items: null
})
const users = reactive({
  items: null
})

const asyncDataLoaded = ref(false)


const fetchPostsWithUsers = async (ids) => {
  posts.items = await store.dispatch('posts/fetchPosts', {
    ids,
    onSnapshot: ({isLocal, previousItem}) => {
      if (isLocal || !asyncDataLoaded.value || (previousItem?.edited && !previousItem?.edited?.at)) return;
      addNotification({ message: '📮 has been updated', timeout: 3500})
  } });
  users.items = posts.items.map(post => post.userId).concat(thread.loadedThread.userId);
  await store.dispatch('users/fetchUsers', { ids: users.items })
}

thread.loadedThread = await store.dispatch('threads/fetchThread', {
  id: props.id,
  onSnapshot: ({isLocal, item, previousItem}) => {
    if (isLocal || !asyncDataLoaded.value) return;
    const newPosts = difference(item.posts, previousItem.posts)
    const hasNewPosts = newPosts.length > 0;
    if (hasNewPosts) {
      fetchPostsWithUsers(newPosts)
    } else {
      addNotification({ message: '🧵 has been updated', timeout: 3500})
    }
} })

await fetchPostsWithUsers(thread.loadedThread.posts)
asyncDataLoaded.value = true;

const author = await store.dispatch('users/fetchUser', {id: thread.loadedThread.userId})

const currentThread = (id) => {
  return store.getters['threads/thread'](id)
}

const threadPosts = computed(() => {
  return store.state.posts.items;
})

const authUser = computed(() => store.getters['auth/authUser'])

const addPost = ({text}) => {
  const post = {
    text,
    threadId: props.id,
  }
  store.dispatch('posts/createPost', post)
}

</script>
<template>


  <div class="col-large push-top">
    <h1>{{ thread.loadedThread.title }}
      <router-link
        v-if="thread.loadedThread.userId === authUser?.id"
        :to="{name: 'ThreadEdit', id: id}"
        class="btn-green btn-small"
      >Edit Thread</router-link>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{author?.name}}</a>, <AppDate :timestamp="thread.loadedThread.publishedAt"/>.
      <span
        style="float:right; margin-top: 2px;"
        class="hide-mobile text-faded text-small">
          {{currentThread(thread.loadedThread.id).repliesCount}}
          {{thread.repliesCount === 1 ? 'reply' : 'replies'}} by
          {{currentThread(thread.loadedThread.id).contributorsCount}}
          {{thread.contributorsCount === 1 ? 'contributor' : 'contributors'}}
      </span>
    </p>

    <PostList :posts="threadPosts" />
    <PostEditor
      v-if="authUser"
      @save-post="addPost"/>
      <div v-else class="text-center" style="margin-bottom: 50px;">
        <router-link :to="{name: 'SignIn', query:{redirectTo: route.path}}">
          Sign In
        </router-link> or
        <router-link :to="{name: 'Register',  query:{redirectTo: route.path}}">
          Register
        </router-link> to reply.
    </div>

  </div>

</template>


<style lang="scss" scoped></style>
