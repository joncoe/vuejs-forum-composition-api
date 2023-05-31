<script async setup>
import { defineProps, ref, reactive, computed, watch } from 'vue';
import {useRoute, useRouter } from 'vue-router';
import {useStore} from 'vuex';
import ThreadList from '@/components/ThreadList.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const page = reactive({
  pageNumber: parseInt(route.query.page) || 1
});
const perPage = ref(2);

const threads = computed(() => store.getters['threads/threads']);

const forum = await store.dispatch('forums/fetchForum', {id: props.id});

const loadedThreads = await store.dispatch('threads/fetchThreadsByPage', {
  ids: forum.threads,
  page: page.pageNumber,
  perPage: perPage.value
})

await store.dispatch('users/fetchUsers', { ids: loadedThreads.map(thread => thread.userId)});


const threadCount = computed(() => {
  return forum.threads?.length || 0;
})

const totalPages = computed(() => {
  if (!threadCount.value) return 0;
  return Math.ceil(threadCount.value / perPage.value);
})


watch(
  page,
  async () => {
    router.push({query: {page: page.pageNumber}})
  },
)

</script>
<template>
    <div v-if="forum" class="col-full push-top">
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
      <v-pagination
        v-model="page.pageNumber"
        :pages="totalPages"
        active-color="#57AD8B"
      />

    </div>

</template>


<style lang="scss" scoped></style>
