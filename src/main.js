import { createApp } from 'vue'
import App from './App.vue';
import AppDate from '@/components/AppDate.vue'
import AppInfiniteScroll from '@/components/AppInfiniteScroll'
import AppSpinner from '@/components/AppSpinner'
import AppAvatarImg from '@/components/AppAvatarImg'
import AppFormField from '@/components/AppFormField'
import router from '@/router';
import vuexStore from '@/store';
import firebase from '@/helpers/firebase'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from '@/plugins/PageScrollDirective'
import Vue3Pagination from '@/plugins/Vue3Pagination'
import VeeValidatePlugin from '@/plugins/VeeValidatePlugin'


firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App);
forumApp.use(router)
forumApp.use(vuexStore)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)
forumApp.use(VeeValidatePlugin)
forumApp.component('AppDate', AppDate)
forumApp.component('AppInfiniteScroll', AppInfiniteScroll)
forumApp.component('AppSpinner', AppSpinner)
forumApp.component('AppAvatarImg', AppAvatarImg)
forumApp.component('AppFormField', AppFormField)
forumApp.mount('#app');
