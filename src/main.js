import Vue from 'vue'
import MpvueRouterPatch from 'mpvue-router-patch'
import App from './App'
import store from './store'
import {loading} from 'utils'
import {restoreDataMiXin, modelMixin} from 'utils/mixins'

Vue.prototype.$store = store
Vue.prototype.$loading = loading
Vue.use(MpvueRouterPatch)

Vue.mixin(restoreDataMiXin) // 全局混入mixin，解决mpvue的data缓存
Vue.mixin(modelMixin) // iphoneX适配(逻辑代码需自己补充)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
