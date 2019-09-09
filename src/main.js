import Vue from 'vue'

// Import Raven, Sentry's SDK
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

// Import our local "config.js" file
import config from './config'
import finger from './utils/vue-finger'
import App from './App.vue'
import router from './router'
import store from './store'
import './rem'
import './registerServiceWorker'
import {
  Button, Cell, CellGroup, Icon, Row, Col, Popup,
  Toast, Dialog, Lazyload, List, PullRefresh, Field, ActionSheet, Picker, Image, Loading, Search, Swipe, SwipeItem

} from 'vant'
import errorImg from './components/assets/imgFail.png'
// import imgLoading from './components/assets/imgLoading.png'
import VConsole from 'vconsole'
if (process.env.NODE_ENV === 'production') {
  // Here goes the DSN
  // Raven
  //   .config('https://7074bfc520c64451a0e3e4d9cbf9facc@sentry.gtdreamlife.com/2', {
  //     // We also track the project's release to benefit from some of Sentry's advanced features
  //     'release': config.SENTRY_RELEASE
  //   })
  //   .addPlugin(RavenVue, Vue)
  //   .install()
} else {
  // You may remove this once you are sure everything works fine
  console.debug('Not configuring Sentry, environment is', process.env.NODE_ENV)
}
if (process.env.VUE_APP_MODE !== 'prod' && process.env.VUE_APP_MODE !== 'uat') {
  const vConsole = new VConsole()
}
// 添加自定义指令
Vue.use(finger)

// 引入vant基础组件
Vue.use(Button)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(List)
Vue.use(Image)
Vue.use(Search)
Vue.use(Swipe).use(SwipeItem)
Vue.use(PullRefresh)
Vue.use(Field)
Vue.use(ActionSheet)
Vue.use(Picker)
Vue.use(Loading)
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: errorImg,
  // loading: imgLoading,
  attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
