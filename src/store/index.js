import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import wechat from './modules/wechat'
import global from './modules/global'

import market from './modules/market'
import vendor from './modules/vendor'




import createLoadingPlugin from './vuex-loading'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    global,
    wechat,
    market,
    vendor,
  },
  plugins: [createLoadingPlugin()]
})
