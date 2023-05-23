import { createStore } from "vuex";
import sourceData from "@/data.json";
import { findById } from "@/helpers";

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
    async createThread({ commit, state, dispatch}, {title, forumId, text}) {
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
      dispatch('createPost', {text, threadId: id});
      return findById(state.threads, id);//
    },
    async updateThread({commit, state}, {title, text, id}) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])

      const newThread = {...thread, title}
      const newPost = {...post, text}

      commit('setThread', {thread: newThread})
      commit('setPost', {post: newPost})

      return newThread;
    }
  },
  mutations: {
    appendPostToThread(state, { postId, threadId}) {
      const thread = findById(state.threads,threadId);//
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToForum(state, { forumId, threadId}) {
      const forum = findById(state.forums, forumId);//
      forum.posts = forum.posts || []
      forum.posts.push(threadId)
    },
    appendThreadToUser(state, { userId, threadId}) {
      const user = findById(state.users, userId);//
      user.posts = user.posts || []
      user.posts.push(threadId)
    },
    saveUser(state, {user, userId}) {
      const userIndex = state.users.findIndex(user => user.id === userId);
      state.users[userIndex] = user
    },
    setPost(state, { post }) {
      const index = state.posts.findIndex(p => p.id === post.id);
      if (post.id && index !== -1) {
        state.posts[index] = post;
      } else {
        state.posts.push(post) // append the post to the thread
      }
    },
    setThread(state, {thread}) {
      const index = state.threads.findIndex(t => t.id === thread.id);
      if (thread.id && index !== -1) {
        state.threads[index] = thread
      } else {
        state.threads.push(thread)
      }
    }
  },
  getters: {
    authUser: state =>  {
      const user = findById(state.users, state.authId);
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
