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
    }
  },
  mutations: {
    setPost(state, { post }) {
      state.posts.push(post) // append the post to the thread
    },
    appendPostToThread(state, { postId, threadId}) {
      const thread = state.threads.find(thread => thread.id === threadId)
      thread.posts.push(postId)
    }
  },
  getters: {
    authUser: state => state.users.find(user => user.id === state.authId)
  }
})
