import axios from 'axios'
// import router from '../router'
// import { Toast } from 'vant'
import Cookies from 'js-cookie'
import { Dialog } from 'vant'
import { loginApi } from './api'
import utils from '../utils/util'
import qs from 'qs'
// 默认超时设置
axios.defaults.timeout = 50000

// 相对路径设置
axios.defaults.baseURL = process.env.VUE_APP_API_ENV

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 获取token
    const token = Cookies.get('token')
    const ruxinToken = Cookies.get('ruxin_token')
    // 设置参数格式
    if (!config.headers['Content-Type']) {
      config.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    // 添加token到headers
    if (token) {
      config.headers['X-Token'] = token
    }
    if (ruxinToken) {
      config.headers['Authorization'] = `Bearer ${ruxinToken}`
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      // get请求下 参数在params中，其他请求在data中
      config.params = config.params || {}
      let json = JSON.parse(JSON.stringify(config.params))
      // 一些参数处理
    } else {
      config.data = config.data || {}
      // 一些参数处理
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    if (error.response.data.code === 401) {
      let usersource = ''
      let userid = ''
      Cookies.remove('token')
      if (utils.isWeiXinBrowser) {
        usersource = '2'
        userid = Cookies.get('openid')
      } else {
        usersource = '1'
        userid = Cookies.get('customerId')
      }
      loginApi({ userid, usersource }).then((res) => {
        if (res && res.code === 200) {
          Cookies.set('token', res.data)
          window.location.reload()
        } else {
          this.$toast.fail('登陆失败!')
        }
      })
      return
    }
    return Promise.resolve(error.response)
  }
)
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(response => {
        resolve(response.data)
      })
      .catch((err) => {
        resolve(err.message)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))

    .then(response => {
        resolve(response.data)
      })
      .catch((err) => {
        resolve(err.response && err.response.data)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function patch (url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data)
//       .then(response => {
//         if (response.data.errorCode === 0) {
//           resolve(response.data.data)
//         } else {
//           Toast(response.data.message)
//         }
//       }, err => {
//         reject(err)
//         let message = '请求失败！请检查网络'
//         if (err.response)message = err.response.data.message
//         Toast(message)
//       })
//   })
// }

// /**
//  * 封装put请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

// export function put (url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         if (response.data.errorCode === 0) {
//           resolve(response.data.data)
//         } else {
//           Toast(response.data.message)
//         }
//       }, err => {
//         reject(err)
//         let message = '请求失败！请检查网络'
//         if (err.response)message = err.response.data.message
//         Toast(message)
//       })
//   })
// }

// export function del (url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.delete(url, data)
//       .then(response => {
//         if (response.data.errorCode === 0) {
//           resolve(response.data.data)
//         } else {
//           Toast(response.data.message)
//         }
//       }, err => {
//         reject(err)
//         let message = '请求失败！请检查网络'
//         if (err.response)message = err.response.data.message
//         Toast(message)
//       })
//   })
// }
