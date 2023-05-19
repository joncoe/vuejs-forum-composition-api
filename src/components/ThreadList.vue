<script setup>
import { reactive, defineProps } from "vue";
import sourceData from "@/data.json";

const users = reactive(sourceData.users);

const props = defineProps({
  threads: {
    type: Array,
    required: true
  }
})

const userById = (userId) => {
  return users.find((p) => p.id === userId);
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
              By <a href="profile.html">{{userById(thread.userId).name}}</a>, {{thread.pubishedAt}}.
            </p>
          </div>

          <div class="activity">
            <p class="replies-count">
              {{ thread.posts.length }} replies 📬
            </p>

            <img
              class="avatar-medium"
              :src="userById(thread.userId).avatar" alt="">

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
