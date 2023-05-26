import { createApp } from 'vue'
import App from './App.vue';
import AppDate from '@/components/AppDate.vue'
import AppInfiniteScroll from '@/components/AppInfiniteScroll'
import router from '@/router';
import vuexStore from '@/store';
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from '@/plugins/PageScrollDirective'


firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App);
forumApp.use(router)
forumApp.use(vuexStore)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.component('AppDate', AppDate)
forumApp.component('AppInfiniteScroll', AppInfiniteScroll)
forumApp.mount('#app');
