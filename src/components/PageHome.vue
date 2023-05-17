<script setup>
import { reactive } from "vue";
import sourceData from "@/data.json";

const threads = reactive(sourceData.threads);
const posts = reactive(sourceData.posts);
const users = reactive(sourceData.users);

const postById = (postId) => {
  return posts.find((p) => p.id === postId);
};
const userById = (userId) => {
  return users.find((p) => p.id === userId);
};
</script>
<template>
  <div class="col-large push-top">
    <div v-for="thread in threads" :key="thread.id">
      <h2>{{ thread.title }}</h2>

      <p>
        By <a href="#" class="link-unstyled">Robin</a>, 2 hours ago.
        <span
          style="float: right; margin-top: 2px"
          class="hide-mobile text-faded text-small"
          >3 replies by 3 contributors</span
        >
      </p>

      <div class="post-list">
        <div
          class="post"
          v-for="postId in thread.posts"
          :key="postId">

          <div class="user-info">
            <a href="#" class="user-name">{{ userById(postById(postId).userId).name }}</a>

            <a href="#">
              <img
                class="avatar-large"
                :src="userById(postById(postId).userId).avatar"
                alt=""
              />
            </a>

            <p class="desktop-only text-small">107 posts 🌗</p>
          </div>

          <div class="post-content">
            <div>
              <p>
                {{ postById(postId).text }}
              </p>
            </div>

          </div>

          <div class="post-date text-faded">{{postById(postId).publishedAt}} 🗓️</div>


        </div>

        <div class="post">
          <div class="user-info">
            <a href="profile.html#profile-details" class="user-name"
              >Joseph Kerr</a
            >

            <a href="profile.html#profile-details">
              <img
                class="avatar-large"
                src="https://i.imgur.com/OqlZN48.jpg"
                alt=""
              />
            </a>

            <p class="desktop-only text-small">116 posts</p>

            <p class="desktop-only text-small">73 threads</p>

            <span class="online desktop-only">online</span>
          </div>

          <div class="post-content">
            <div>
              <blockquote class="small">
                <div class="author">
                  <a href="/user/robin" class=""> robin</a>
                  <span class="time">a month ago</span>
                  <i class="fa fa-caret-down"></i>
                </div>

                <div class="quote">
                  <p>
                    Is horseradish and Wasabi the same thing? I've heard so many
                    different things.
                  </p>
                </div>
              </blockquote>
              <p>They're not the same!</p>
            </div>
            <a class="edit-post link-unstyled"><i class="fa fa-pencil"></i></a>
          </div>

          <div class="post-date text-faded">6 hours ago</div>

          <div class="reactions">
            <button class="btn-xsmall">
              + <i class="fa fa-smile-o emoji"></i>
            </button>
          </div>
        </div>

        <div class="post">
          <div class="user-info">
            <a href="profile.html#profile-details" class="user-name"
              >Ray-Nathan James</a
            >

            <a href="profile.html#profile-details">
              <img
                class="avatar-large"
                src="https://firebasestorage.googleapis.com/v0/b/forum-2a982.appspot.com/o/images%2Favatars%2Fraynathan?alt=media&token=bd9a0f0e-60f2-4e60-b092-77d1ded50a7e"
                alt=""
              />
            </a>

            <p class="desktop-only text-small">10 posts</p>

            <p class="desktop-only text-small">4 threads</p>

            <span class="offline desktop-only">offline</span>
          </div>

          <div class="post-content">
            <div>
              <p>
                <a href="/user/Joker" class="">@Joker</a> is right, they're not
                the same.
              </p>
              <p>
                They are different plants from the same family
                (mustard/cabbage).
              </p>
            </div>
          </div>

          <div class="post-date text-faded">6 hours ago</div>

          <div class="reactions">
            <button class="btn-xsmall">
              + <i class="fa fa-smile-o emoji"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
</style>
