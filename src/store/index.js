import { createStore } from "vuex";
import firebase from "firebase";
import { findById } from "@/helpers";
import { upsert } from "@/helpers";

export default createStore({
  state: {
    categories: [],
    forums: [],
    threads: [],
    posts: [],
    users: [],
    authId: "VXjpr2WHa8Ux4Bnggym8QFLdv5C3",
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = "ggqq" + Math.random();
      post.userId = state.authId;
      post.publishedAt = Math.floor(Date.now() / 1000),
      commit('setItem', {resource: 'posts', item: post })

      commit("appendPostToThread", {
        childId: post.id,
        parentId: post.threadId,
      });
      commit("appendContributorToThread", {
        childId: state.authId,
        parentId: post.threadId,
      });
    },
    updateUser({ commit }, user) {
      commit('setItem', {resource: 'users', item: user })
    },
    async createThread({ commit, state, dispatch }, { title, forumId, text }) {
      const id = "ggqq" + Math.random();
      const userId = state.authId;
      const thread = {
        forumId,
        title,
        userId,
        publishedAt: Math.floor(Date.now() / 1000),
        id,
      };
      commit('setItem', {resource: 'threads', item: thread })
      commit("appendThreadToForum", { parentId: forumId, childId: id });
      commit("appendThreadToUser", { parentId: userId, childId: id });

      dispatch("createPost", { text, threadId: id });
      return findById(state.threads, id); //
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id);
      const post = findById(state.posts, thread.posts[0]);

      const newThread = { ...thread, title };
      const newPost = { ...post, text };

      commit('setItem', {resource: 'threads', item: newThread, log: true })
      commit('setItem', {resource: 'posts', item: newPost })
      console.log('updateThread', newThread)
      return newThread;
    },
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    // Fetch ALL of a  resource
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    fetchAllCategories ({commit}) {
      console.log('Fetch all 😸egories')
      return new Promise(resolve => {
        firebase.firestore().collection('categories').onSnapshot((querySnapshot) => {
          const categories = querySnapshot.docs.map(doc => {
            const item =  { id: doc.id, ...doc.data()}
            commit('setItem', {resource: 'categories', item})
            return item;
          })
          resolve(categories)
        })
      })
    },
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    // Fetch multiple resources
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    fetchCategories ({ dispatch }, { ids }) {
      return dispatch('fetchItems', { resource: 'categories', ids, emoji: '🏷' })
    },
    fetchThreads({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'threads', ids, emoji: '🪡 🪡 🪡'})
    },
    fetchForums({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'forums', ids, emoji: '◖ᵔᴥᵔ◗ ♪ ♫'})
    },
    fetchPosts({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'posts', ids, emoji: '💬 💬 💬'})
    },
    fetchUsers({dispatch}, {ids}) {
      return dispatch('fetchItems', {resource: 'users', ids, emoji: '🧘🏼‍♂️ 🧘🏼‍♂️ 🧘🏼‍♂️'})
    },
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    // Fetch SINGLE resources
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐
    fetchThread({ dispatch }, { id }) {
      return dispatch('fetchItem', {resource: 'threads', id, emoji: '🧵 🧵 🧵'});
    },
    fetchCategory({ dispatch }, { id }) {
      return dispatch('fetchItem', {resource: 'categories', id, emoji: '🧵 🧵 🧵'});
    },
    fetchForum({ dispatch }, { id }) {
      return dispatch('fetchItem', {resource: 'forums', id, emoji: '🚌 🚌 🚌 '});
    },
    fetchUser({ dispatch }, { id }) {
      return dispatch('fetchItem', {resource: 'users', id, emoji: '👨🏼 🤦🏼‍♀️'});
    },
    fetchPost({ dispatch }, { id }) {
      return dispatch('fetchItem', {resource: 'posts', id, emoji: '📝 📝 📝'});
    },

    fetchItem({ commit }, { id, emoji, resource}) {
      console.log(emoji, resource)
      return new Promise((resolve) => {
        firebase
        .firestore()
        .collection(resource)
        .doc(id)
        .onSnapshot((doc) => {
          const item = { ...doc.data(), id: doc.id };
          commit("setItem", { resource, id, item: item });
          resolve(item);
        });

      })
    },
    fetchItems ({ dispatch }, {ids, resource, emoji}) {
      return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource, emoji })))
    },
  },
  mutations: {
    appendPostToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "posts",
    }),
    appendThreadToForum: makeAppendChildToParentMutation({
      parent: "forums",
      child: "threads",
    }),
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: "users",
      child: "posts",
    }),
    appendContributorToThread: makeAppendChildToParentMutation({
      parent: "threads",
      child: "contributors",
    }),
    setItem (state, { resource, item, log }) {
      if (log) console.log('setItem', resource, item)
      upsert(state[resource], item);
    },
  },
  getters: {
    authUser: (state, getters) => {
      return getters.user(state.authId);
    },
    user: (state) => {
      return (id) => {
        const user = findById(state.users, id);
        if (!user) return null;
        return {
          ...user,
          get posts() {
            return state.posts.filter((post) => post.userId === user.id);
          },
          get postsCount() {
            return this.posts.length;
          },
          get threadCount() {
            return this.threads.length;
          },
          get threads() {
            return state.threads.filter((thread) => thread.userId === user.id);
          },
        };
      };
    },
    thread: (state) => {
      return (id) => {
        const thread = findById(state.threads, id);
        if (!thread) return {};
        return {
          ...thread,
          get author() {
            return findById(state.users, thread.userId);
          },
          get repliesCount() {
            console.log('replies count', id)
            return thread.posts.length - 1;
          },
          get contributorsCount() {
            return thread.contributors.length;
          },
        };
      };
    },
  },
});

function makeAppendChildToParentMutation({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId); //
    if (!resource) {
      console.error(`⚠️ ⚠️ ⚠️ ⚠️ ${child} ${childId} to ${parent} ${parentId} failed because it doesn't exist`)
      return
    }
    resource[child] = resource[child] || [];
    if (!resource[child].includes(childId)) {
      resource[child].push(childId);
    }
  };
}
