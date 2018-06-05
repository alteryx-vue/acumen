import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import {store} from './store.js'
import 'vuetify/dist/vuetify.css'
import gallery from './plugins/gallery.js'

import Overview from './components/Overview.vue'
import Sessions from './components/Sessions.vue'
import Settings from './components/Settings.vue'
import Content from './components/Content.vue'
import Jobs from './components/Jobs.vue'
import Users from './components/Users.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(gallery)
Vue.use(require('vue-moment'))

const routes = [
    { path: '/', name: 'Overview', component: Overview },
    { path: '/sessions', name: 'Sessions', component: Sessions },
    { path: '/settings', name: 'Settings', component: Settings },
    { path: '/content', name: 'Content', component: Content },
    { path: '/jobs', name: 'Jobs', component: Jobs },
    { path: '/users', name: 'Users', component: Users },
  ]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})