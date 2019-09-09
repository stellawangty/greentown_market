import Cookies from 'js-cookie'
import { Toast } from 'vant'
import utils from '@/utils/util'
import constant from '@/utils/constant'
import { checkAccessTokenApi, getOpenidApi, initWxSdkApi } from '../../service/wechat'
import { loginApi } from '../../service/api.js'
const { getQueryString, isWeiXinBrowser, injectWxConfig, getLocation, scanQRCode } = utils
const { appid, redirectUri, redirectUriCardView, authorizeRedirect } = constant
function queryParking () {
  if (window.location.pathname.indexOf('/cardView') > 0) {
    return false
  }
  return true
}
const state = {
  wechatOpenid: null,
  wechatAccessToken: null,
  latitude: 0,
  longitude: 0
}

const mutations = {
  successOpenId (state, payload) {
    state.wechatOpenid = payload.res.openid
    state.wechatAccessToken = payload.res.accessToken
  },
  getLocation (state, payload) {
    state.latitude = payload.res.latitude
    state.longitude = payload.res.longitude
  }
}

const actions = {
  /**
  * 使用微信内置地图查看位置接口
  */
  openLocation ({ commit }, data) {
    const { latitude, longitude, name, address } = data
    // eslint-disable-next-line no-undef
    wx.openLocation({
      latitude: parseFloat(latitude), // 纬度，浮点数，范围为90 ~ -90
      longitude: parseFloat(longitude), // 经度，浮点数，范围为180 ~ -180。
      name, // 位置名
      address, // 地址详情说明
      scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    })
  },
  /**
  * scanQRCode 微信扫一扫
  */
  scanQRCode ({ commit }, data) {
    return new Promise((resolve, reject) => {
      scanQRCode().then(res => {
        resolve(res)
      })
    })
  },
  /**
  * 微信获取定位，在签名后ready执行getLocation
  */
  initSdk ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { type } = data
      initWxSdkApi({ url: (location.href.split('#')[0]) }).then(res => {
        if (res && res.data) {
          const { nonceStr, signature, timestamp } = res.data
          injectWxConfig(timestamp, nonceStr, signature)
          if (type === 'home') {
            getLocation().then((res) => {
              commit({
                type: 'getLocation',
                res
              })
              resolve()
            })
          }
        }
      })
    })
  },
  /**
   * 微信授权登录，获取openid 及 access_token
   * 第一次成功登录之后会将信息存储在cookies中，以后每次登录会去后台校验二者是否有效，无效重新唤起登录
   * 若缓存中不存在，则会根据code 获取openid 及 access_token （此处有可能微信返回一些错误，比如code二次使用或者无效，重新唤起登录）
   */
  getWechatUserInfo ({ dispatch, commit }) {
    const code = getQueryString('code')
    const responseType = getQueryString('response_type')
    const openid = Cookies.get('openid')
    const accessToken = Cookies.get('access_token')
    return new Promise((resolve, reject) => {
      if (openid && accessToken) {
        checkAccessTokenApi({ openid: openid, access_token: accessToken }).then(res => {
          if (res && res.status === 200) {
            commit({
              type: 'successOpenId',
              res: {
                openid: openid,
                accessToken: accessToken
              }
            })
            resolve()
          } else if (res && res.status === 403) {
            Cookies.remove('openid')
            Cookies.remove('access_token')
            dispatch('login')
          } else {
            Toast.fail('服务器出了点小差')
          }
        })
      } else {
        let redirect = false // 判断当前是否需要跳转,防止死循环
        if (code) {
          getOpenidApi({ code: code }).then((res) => {
            if (res && res.status === 200) {
            const { openid, access_token, userInfo } = res.data; // eslint-disable-line
              Cookies.set('openid', openid)
              Cookies.set('access_token', access_token)
              Cookies.set('user_info_complete', userInfo.headimgurl ? '1' : '0')
              const params = {
                userid: openid,
                avatars: userInfo.headimgurl,
                usersource: '2',
                nickname: userInfo.nickname
              }
              loginApi({ ...params }).then((res) => {
                if (res.code === 200) {
                  Cookies.set('token', res.data)
                  commit({
                    type: 'successOpenId',
                    res: {
                      openid: openid,
                      accessToken: access_token
                    }
                  })
                  resolve()
                } else {
                  Toast.fail('登陆失败!')
                }
              })
            } else {
              Cookies.remove('openid')
              Cookies.remove('access_token')
              dispatch('login')
            }
          })
        } else {
          redirect = !responseType
        }
        if (redirect && isWeiXinBrowser) {
          dispatch('login')
        }
      }
    })
  },
  /**
   * 唤起微信登录方法，页面需要授权使用的功能可校验openid 若不存在则调用此方法
   * 或者将此方法改为checkLogin，将openid 判断放在此方法内。
   */
  login () {
    // 静默登录
    const parkNo = utils.getQueryString('parkNo')
    window.location.href = `${authorizeRedirect}?appid=${appid}&redirect_uri=${encodeURIComponent(queryParking() === true ? redirectUri : `${redirectUriCardView}?parkNo=${parkNo}`)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
  },
  /**
   * 获取用户授权
   */
  // 非静默登录
  checkUserInfoComplete () {
    const parkNo = utils.getQueryString('parkNo')
    const userInfoComplete = Cookies.get('user_info_complete')
    if (userInfoComplete === '0') {
      Cookies.remove('openid')
      Cookies.remove('access_token')
      window.location.href = `${authorizeRedirect}?appid=${appid}&redirect_uri=${encodeURIComponent(queryParking() === true ? redirectUri : `${redirectUriCardView}?parkNo=${parkNo}`)}&response_type=code&scope=snsapi_userinfo&state=STATE`
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
