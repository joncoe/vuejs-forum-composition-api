import { createStore } from "vuex";
import sourceData from "@/data.json";
export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  actions: {
    createPost(context, post) {

      post.id = 'ggqq' + Math.random()

      context.commit('setPost', { post })
      context.commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    updateUser({commit}, user) {
      commit('saveUser', {user, userId: user.id})
    }
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post) // append the post to the thread
    },
    appendPostToThread(state, { postId, threadId}) {
      const thread = state.threads.find(thread => thread.id === threadId)
      thread.posts.push(postId)
    },
    saveUser(state, {user, userId}) {
      const userIndex = state.users.findIndex(user => user.id === userId);
      state.users[userIndex] = user
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
