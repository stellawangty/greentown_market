import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import JSBridge from 'gtjsbridge'
import 'nprogress/nprogress.css'
import utils from './utils/util'
import { Dialog } from 'vant'

function invokeUpdateTitle (title) {
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const bridge = new JSBridge()
    bridge.invokeNative('', 'updateWebviewTitle')({ title })
  }
}

Vue.use(Router)

NProgress.configure({ showSpinner: false })

// 路由懒加载
const _import_ = file => () => import('./views/' + file + '.vue')

const router = new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_PATH : '/parking',
  // scrollBehavior (to, from, savedPosition) {
  //   // keep-alive 返回缓存页面后记录浏览位置
  //   if (savedPosition && to.meta.keepAlive) {
  //     return savedPosition
  //   }
  //   // 异步滚动操作
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ x: 0, y: 1 })
  //     }, 0)
  //   })
  // },
  routes: [
    // {
    //   path: '/',
    //   redirect: '/home'
    // },
    {
      path: '/',
      name: 'vendor',
      component: _import_('Market/market'),
      meta: {
        title: '市集'
      }
    },
    {
      path: '/vendor',
      name: 'vendor',
      component: _import_('Vendor/vendor'),
      meta: {
        title: '详情'
      }
    },
    // {
    //   path: '/search',
    //   name: 'search',
    //   component: _import_('Market/search'),
    //   meta: {
    //     title: '智慧停车'
    //   }
    // },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: _import_('list'),
      meta: {
        title: '列表',
        keepAlive: true
      }
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: _import_('Reservation/Reservation'),
      meta: {
        title: '预约停车'
      }
    },
    {
      path: '/editCars',
      name: 'editCars',
      component: _import_('EditCars/EditCars'),
      meta: {
        title: '添加车辆'
      }
    },
    {
      path: '/cardView',
      name: 'cardView',
      component: _import_('CardView/CardView'),
      meta: {
        title: '智慧停车'
      }
    },
    {
      path: '/scanQRCode',
      name: 'scanQRCode',
      component: _import_('CardView/ScanQRCode'),
      meta: {
        title: '二维码支付'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: _import_('Mine/Mine'),
      meta: {
        title: '我的',
        keepAlive: true
      }
    },
    {
      path: '/carManage',
      name: 'carManage',
      component: _import_('Mine/CarManage'),
      meta: {
        title: '车辆管理',
        keepAlive: true
      }
    },
    {
      path: '/feeRecord',
      name: 'feeRecord',
      component: _import_('Mine/FeeRecord'),
      meta: {
        title: '缴费记录',
        keepAlive: true
      }
    },
    {
      path: '/feeDetail',
      name: 'feeDetail',
      component: _import_('Mine/FeeDetail'),
      meta: {
        title: '缴费详情'
      }
    },
    {
      path: '/addSuccess',
      name: 'addSuccess',
      component: _import_('AddSuccess/AddSuccess'),
      meta: {
        title: '添加成功'
      }
    },
    {
      path: '/quickCar',
      name: 'quickCar',
      component: _import_('QuickCar/QuickCar'),
      meta: {
        title: '一键寻车'
      }
    }
  ]
})
// 这是钩子进入页面之前,就修改title
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 处理不在微信和app中的逻辑
  // if (!utils.isInApp && !utils.isWeiXinBrowser) {
  //   Dialog.alert({
  //     message: '请在微信或APP内使用该功能',
  //     showConfirmButton: false
  //   })
  // }
  // 处理添加车辆与编辑车辆title逻辑
  if (to.path === '/editCars') {
    if (to.query && to.query.type === 'edit') {
      document.title = '编辑车辆'
      // 如果是 iOS 设备，则通过jsBridge更新webview的title
      invokeUpdateTitle('编辑车辆')
      next()
      return
    }
  }
  document.title = to.meta.title // 这 to.meta.title 是在router里设置的
  invokeUpdateTitle(to.meta.title)
  next()
})

router.afterEach(route => {
  NProgress.done()
})

export default router
