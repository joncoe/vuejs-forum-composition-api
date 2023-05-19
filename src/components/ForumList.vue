<script setup>
import {defineProps} from 'vue';

defineProps({
  forums: {
    type: Array,
    required: true
  }
})
</script>

<template>

    <div class="forum-list" >

      <h2 class="list-title">
        <a href="category.html">Feedback & Information</a>
      </h2>

      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <a class="text-xlarge" href="forum.html">Announcements</a>
          <p>Important announcements about the forum.</p>
        </div>

        <div class="threads-count">
          <p><span class="count">1</span> thread</p>
        </div>

        <div class="last-thread">
          <img class="avatar" src="https://pbs.twimg.com/profile_images/719242842598699008/Nu43rQz1_400x400.jpg" alt="">
          <div class="last-thread-details">
            <a href="thread.html">Post Reactions</a>
            <p class="text-xsmall">By <a href="profile.html">Rolf Haug</a>, a month ago</p>
          </div>
        </div>
      </div>

    </div>

</template>



<style lang="scss" scoped></style>
