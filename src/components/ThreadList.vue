<script setup>
import { computed, defineProps } from "vue";
import {useStore} from 'vuex';
import { findById } from "@/helpers";

const store = useStore();
const users = computed(() => store.state.users.items);

const props = defineProps({
  threads: {
    type: Array,
    required: true
  }
})

const userById = (userId) => {
  return findById(users.value, userId) || {};
};

</script>

<template>
  <div>
    <div class="col-full">

      <div class="thread-list">

        <h2 class="list-title">Threads</h2>

        <div
          class="thread"
          v-for="thread in props.threads" :key="thread.id"
        >
          <div>
            <p>
              <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">
                {{ thread.title }}
              </router-link>
            </p>
            <p class="text-faded text-xsmall">
              By <a href="profile.html">{{userById(thread.userId).name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">
              {{ thread.repliesCount }} replies 📬
            </p>

            <AppAvatarImg class="avatar-medium" :src="userById(thread.userId).avatar" />

            <div>
              <p class="text-xsmall">
                <a href="profile.html">{{ userById(thread.userId).name }}</a>
              </p>
              <p class="text-xsmall text-faded"><AppDate :timestamp="thread.publishedAt"/></p>
            </div>
          </div>
        </div>



      </div>

    </div>
  </div>
</template>



<style lang="scss" scoped></style>
