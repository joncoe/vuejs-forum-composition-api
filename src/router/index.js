import Home from '@/pages/Home';
import Category from '@/pages/Category';
import Profile from '@/pages/Profile';
import ThreadShow from '@/pages/ThreadShow';
import NotFound from '@/pages/NotFound';
import Forum from '@/pages/Forum';
import ThreadCreate from '@/pages/ThreadCreate';
import ThreadEdit from '@/pages/ThreadEdit';
import Register from '@/pages/Register';
import SignIn from '@/pages/SignIn'
import {createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { findById } from '@/helpers';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: {
      toTop: true,
      smoothScroll: true,
      requiresAuth: true
    }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: {
      edit: true
    },
    meta: {
      toTop: true,
      smoothScroll: true,
      requiresAuth: true
    }
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: ThreadShow,
    props: true,
    async beforeEnter (to, from, next) {
      await store.dispatch('fetchThread', { id: to.params.id })
      // check if thread exists
      const threadExists = findById(store.state.threads, to.params.id)
      // if exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash
          query: to.query,
          hash: to.hash
        })
      }
      // if doesnt exist redirect to not found
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'SignOut',
    async beforeEnter (to, from) {
      await store.dispatch('signOut')
      return { name: 'Home' }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    const scroll= {}
    if (to.meta.toTop) scroll.top = 0;
    if (to.meta.smoothScroll) scroll.behavior = 'smooth';
    return scroll
  }
})

router.beforeEach(async (to, from) => {
  await store.dispatch('initAuthentication')
  console.log(`navigating from ${from.path} to ${to.path}`)
  store.dispatch('unsubscribeAllSnapshots');
  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: 'Home' }
  }
})
export default router;
