import { post, get } from './index'

// 获取openId
const getOpenid = `${process.env.VUE_APP_API_WECHAT_ENV}/api/weiXinAuth/getInfo`
export const getOpenidApi = function (json) {
  return get(`${getOpenid}`, json)
}

// 校验accessToken
const checkAccessToken = `${process.env.VUE_APP_API_WECHAT_ENV}/api/weiXinAuth/checkAccessToken`
export const checkAccessTokenApi = function (json) {
  return post(`${checkAccessToken}`, json)
}

// 初始化微信SDK
const initWxSdk = `${process.env.VUE_APP_API_WECHAT_ENV}/api/weiXinAuth/getSignInfo`
export const initWxSdkApi = function (json) {
  return get(`${initWxSdk}`, json)
}
