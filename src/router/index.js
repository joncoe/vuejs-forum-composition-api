import PageHome from '@/components/PageHome';
import PageThreadShow from '@/components/PageThreadShow';
import PageNotFound from '@/components/PageNotFound';
import {createRouter, createWebHistory } from 'vue-router';
import sourceData from "@/data.json";

const routes = [
  {
    path: "/",
    name: "Home",
    component: PageHome
  },
  {
    path: "/thread/:id",
    name: "ThreadShow",
    component: PageThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if exits
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      // continue
      if (threadExists) {
        return next()
      // if no, redirect to not found.
      } else {
        next({
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFound
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
