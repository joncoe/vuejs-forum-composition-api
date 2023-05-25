import { createApp } from 'vue'
import App from './App.vue';
import AppDate from '@/components/AppDate.vue'
import router from '@/router';
import vuexStore from '@/store';
import firebase from 'firebase'
import firebaseConfig from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'

firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App);
forumApp.use(router)
forumApp.use(vuexStore)
forumApp.use(FontAwesome)
forumApp.component('AppDate', AppDate)
forumApp.mount('#app');
