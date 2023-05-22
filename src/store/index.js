import { createStore } from "vuex";
import sourceData from "@/data.json";
export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions: {
    createPost({commit, state}, post) {

      post.id = 'ggqq' + Math.random();
      post.userId = state.authId;
      post.publishedAt =  Math.floor(Date.now() / 1000),

      commit('setPost', { post })
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    updateUser({commit}, user) {
      commit('saveUser', {user, userId: user.id})
    },
    createThread({ commit, state, dispatch}, {title, forumId, text}) {
      const id = 'ggqq' + Math.random();
      const userId = state.authId;
      const thread = {
        forumId,
        title,
        userId,
        publishedAt: Math.floor(Date.now() / 1000),
        id
      };
      commit('setThread', { thread });
      commit('appendThreadToForum', { forumId, threadId: id });
      commit('appendThreadToUser', { userId, threadId: id });
      dispatch('createPost', {text, threadId: id})
    }
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post) // append the post to the thread
    },
    appendPostToThread(state, { postId, threadId}) {
      const thread = state.threads.find(thread => thread.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToForum(state, { forumId, threadId}) {
      const forum = state.forums.find(forum => forum.id === forumId)
      forum.posts = forum.posts || []
      forum.posts.push(threadId)
    },
    appendThreadToUser(state, { userId, threadId}) {
      const user = state.users.find(user => user.id === userId)
      user.posts = user.posts || []
      user.posts.push(threadId)
    },
    saveUser(state, {user, userId}) {
      const userIndex = state.users.findIndex(user => user.id === userId);
      state.users[userIndex] = user
    },
    setThread(state, {thread}) {
      state.thread.push(thread)
    }
  },
  getters: {
    authUser: state =>  {
      const user = state.users.find(user => user.id === state.authId);
      if (!user) return null;
      return {
        ...user,
        get posts() {
          return state.posts.filter(post => post.userId === user.id)
        },
        get postsCount () {
          return this.posts.length;
        },
        get threadCount() {
          return this.threads.length;
        },
        get threads() {
          return state.threads.filter(thread => thread.userId === user.id)
        }
      }
    }

  }
})
