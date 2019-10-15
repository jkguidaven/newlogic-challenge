import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { Router } from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  router: Router,
  render: h => h(App),
}).$mount('#app')
