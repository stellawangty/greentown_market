// import { Toast } from 'vant'
import gcoord from 'gcoord'
import { Toast } from 'vant'
import JSBridge from 'gtjsbridge'
import { getUserInfoByTokenApi, loginApi } from '../service/api'
import Cookies from 'js-cookie'
const utils = {
  appid: 'wxaad4e9668972a594',
  redirectUri: process.env.VUE_APP_API_WECHAT_URL_ENV,
  getAwardUrl: process.env.VUE_APP_API_GETAWARD_URL_ENV
}

utils.convertTime = (time) => {
  const hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = parseInt((time % (1000 * 60)) / 1000)

  let deadLineTime = {}
  deadLineTime.hours = hours
  deadLineTime.minutes = minutes
  deadLineTime.seconds = seconds

  return deadLineTime
}

utils.formatDate = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d

  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let t = date.getMinutes()
  t = t < 10 ? '0' + t : t
  let s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return y + '-' + m + '-' + d + ' ' + h + ':' + t
}

utils.getResult = {
  0: '您的手机号格式有误',
  1: '验证码发送成功',
  2: '活动已结束',
  3: '您的操作过于频繁，请稍后再试',
  4: '您已领取过礼包',
  5: '红包已经过期了',
  6: '您输入的验证码错误',
  7: '来晚了，奖品已被抢完了',
  8: '奖品领取成功'
}

utils.getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) { return unescape(r[2]) }
  return null
}
const isRuxin = /ruxin/
function checkUserAgent (regex) {
  return regex.test(navigator.userAgent)
}
// 判断是否在app环境中
utils.isInApp = checkUserAgent(isRuxin)

// 判断手机机型是否为iphone
utils.isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
function invoke () {
  const bridge = new JSBridge()
  const callAppLogin = bridge.invokeNative('', 'callAppLogin')
  callAppLogin()
}

export function isLogin () {
  const token = Cookies.get('ruxin_token')
  return new Promise((resolve, reject) => {
    if (!token) {
      invoke()
      Cookies.remove('token')
      Cookies.remove('customerId')
    } else {
      getUserInfoByTokenApi().then((res) => {
        if (res.errorCode === 0) {
          const customerId = Cookies.get('customerId')
          if (parseInt(customerId) !== res.data.customerId) {
            Cookies.set('customerId', res.data.customerId)
          }
          const params = {
            userid: Cookies.get('customerId'),
            avatars: res.data.customerImg || '',
            usersource: '1',
            nickname: res.data.customerNickname
          }
          if (!Cookies.get('token') || (parseInt(customerId) !== res.data.customerId)) {
            loginApi({ ...params }).then((res) => {
              if (res.code === 200) {
                Cookies.set('token', res.data)
              } else {
                this.$toast.fail('登陆失败!')
              }
            })
          }
          resolve()
        } else if (res.errorCode === 401) {
          invoke()
          Cookies.remove('token')
          Cookies.remove('customerId')
        } else {
          Toast(res.errorMessage)
        }
      })
    }
  })
}
utils.injectWxConfig = (timestamp, nonceStr, signature) => {
  console.log(timestamp, nonceStr, signature)
  if (!(timestamp && nonceStr && signature)) {
    return
  }
  wx.config({ // eslint-disable-line
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: utils.appid, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: [
      'onMenuShareAppMessage', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
      'onMenuShareTimeline', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
      'onMenuShareQQ', // 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
      'onMenuShareWeibo', // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      'onMenuShareQZone', // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
      'getLocation', // 获取地理位置定位
      'scanQRCode', // 微信扫一扫
      'openLocation' // 使用微信内置地图查看位置接口
    ] // 必填，需要使用的JS接口列表
  })
}
utils.updateShareConfig = (params = {}) => {
  const baseParams = {
    // title: '绿城邀你选出“最有范儿”的同道人吉祥物！',
    // desc: '谁“最有范儿”你说了算！',
    // imageUrl: 'https://gt-toolbox.oss-cn-beijing.aliyuncs.com/gt-toolbox/d0135856-9922-42cf-97d5-3ad64d672446.png',
    // link: 'https://design.gtdreamlife.com/home'
  }
  const combine = {
    ...baseParams,
    ...params
  }
  const {
    title, desc, imageUrl, link
  } = combine
  // Toast.info(`分享链接: ${link}`)
  wx.ready(() => { // eslint-disable-line
    const config = {
      title,
      desc,
      link,
      imgUrl: imageUrl,
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success () {
        // 分享成功
        // Toast.success('分享成功!')
      }
    }
    // 分享到消息
    wx.onMenuShareAppMessage(config) // eslint-disable-line
    // 分享到朋友圈
    wx.onMenuShareTimeline(config) // eslint-disable-line
    // 分享到QQ
    wx.onMenuShareQQ(config); // eslint-disable-line
    // 分享到腾讯微博
    wx.onMenuShareWeibo(config); // eslint-disable-line
    // 分享到QQ空间
    wx.onMenuShareQZone(config); // eslint-disable-line
  })
}
utils.getLocation = () => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.ready(() => {
      // eslint-disable-next-line no-undef
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          console.log('weixin', res)
          resolve(res)
          // latitude 纬度，浮点数，范围为90 ~ -90
          // longitude 经度，浮点数，范围为180 ~ -180。
          // speed 速度，以米/每秒计
          // accuracy 位置精度
        }
      })
    })
  })
}
utils.scanQRCode = () => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    wx.ready(() => {
      // eslint-disable-next-line no-undef
      wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          resolve(res) // 当needResult 为 1 时，扫码返回的结果
        }
      })
    })
  })
}
// 判断是都在微信环境
utils.isWeiXinBrowser = (/micromessenger/i).test(navigator.userAgent)
utils.gcoord_GCJ02 = (lag, lat) => {
  const result = gcoord.transform(
    [lag, lat], // 经纬度坐标
    gcoord.WGS84, // 当前坐标系
    gcoord.GCJ02 // 目标坐标系
  )
  return result
}
utils.gcoord_BD09 = (lag, lat) => {
  const result = gcoord.transform(
    [lag, lat], // 经纬度坐标
    gcoord.GCJ02, // 当前坐标系
    gcoord.BD09 // 目标坐标系
  )
  return result
}
export default utils
