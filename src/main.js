import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from './App'
import store from './store'
import {loading} from 'utils';





Vue.prototype.$store=store
Vue.prototype.$loading=loading
Vue.use(MpvueRouterPatch)





Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
