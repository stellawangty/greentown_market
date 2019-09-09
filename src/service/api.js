import Vue from 'vue'
import { post, get, patch, put, del } from './index'
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
Vue.prototype.$del = del

// 登陆
const login = '/account/login'
export const loginApi = function (json) {
  return Vue.prototype.$post(`${login}`, json)
}

// 获取停车场列表
const projectInfo = '/parking-lot/list-near'
export const projectInfoApi = function (json) {
  return Vue.prototype.$post(`${projectInfo}`, json)
}

// 获取用户信息
const userInfo = '/account/get'
export const userInfoApi = function (json) {
  return Vue.prototype.$get(`${userInfo}`, json)
}
// 绑定车牌
const addVehicle = '/userVehicles/bind'
export const addVehicleApi = function (json) {
  return Vue.prototype.$post(`${addVehicle}`, json)
}

// 修改车牌
const editVehicle = '/userVehicles/edit'
export const editVehicleApi = function (json) {
  return Vue.prototype.$post(`${editVehicle}`, json)
}

// 解绑车牌
const unBindVehicle = '/userVehicles/unbind'
export const unBindVehicleApi = function (json) {
  return Vue.prototype.$post(`${unBindVehicle}`, json)
}

// 订单列表
const paymentList = '/payment/list'
export const paymentListApi = function (json) {
  return Vue.prototype.$post(`${paymentList}`, json)
}

// 订单详情
const paymentDetail = '/payment/detail'
export const paymentDetailApi = function (json) {
  return Vue.prototype.$get(`${paymentDetail}`, json)
}

// 开通无感支付
const openPay = '/userVehicles/unconscious-pay/open'
export const openPayApi = function (json) {
  return Vue.prototype.$post(`${openPay}`, json)
}

// 关闭无感支付
const closePay = '/userVehicles/unconscious-pay/close'
export const closePayApi = function (json) {
  return Vue.prototype.$post(`${closePay}`, json)
}

// 停车信息查询
const getParkingInfo = '/parking-info/get'
export const getParkingInfoApi = function (json) {
  return Vue.prototype.$get(`${getParkingInfo}`, json)
}

// 获取指定停车场预约时长金额对应表
const reservationRule = '/reservationruleinfo/get-reservationrule'
export const reservationRuleApi = function (json) {
  return Vue.prototype.$get(`${reservationRule}`, json)
}

// 预约
const addReservation = '/parking-space/reservation/add'
export const addReservationApi = function (json) {
  return Vue.prototype.$post(`${addReservation}`, json)
}

// 取消预约
const cancelReservation = '/parking-space/reservation/cancel'
export const cancelReservationApi = function (json) {
  return Vue.prototype.$post(`${cancelReservation}`, json)
}

// 取消预约查询计费信息
const cancelQuery = '/parking-space/reservation/cancelQuery'
export const cancelQueryApi = function (json) {
  return Vue.prototype.$post(`${cancelQuery}`, json)
}

// 立即缴费
const onsite = '/two-bar-codes/onsite'
export const onsiteApi = function (json) {
  return Vue.prototype.$post(`${onsite}`, json)
}

// 扫一扫离场缴费
const departure = '/two-bar-codes/departure'
export const departureApi = function (json) {
  return Vue.prototype.$post(`${departure}`, json)
}

// 判断车辆是否在停车场内
const judge = '/parking-info/judge'
export const judgeApi = function (json) {
  return Vue.prototype.$post(`${judge}`, json)
}

// 获取app用户信息
const getUserInfoByToken = `${process.env.VUE_APP_RUXIN_API_ENV}/app/common/getUserInfoByToken`
export const getUserInfoByTokenApi = function (json) {
  return Vue.prototype.$post(`${getUserInfoByToken}`, json)
}






//请求首页bannerList
const getBannerList = '/fair/center/h5/index/banner'
export const getBannerListApi = function (json) {
  return Vue.prototype.$post(`${getBannerList}`, json)
}

//请求首页icon
const getIconList = '/fair/center/h5/index/icon'
export const getIconListApi = function (json) {
  return Vue.prototype.$post(`${getIconList}`, json)
}

//请求首页商家列表
const getShopList = '/fair/center/h5/index/shop'
export const getShopListApi = function (json) {
  return Vue.prototype.$post(`${getShopList}`, json)
}

//vendor里请求每个商家信息
const getAVendor = '/fair/center/h5/shop/detail'
export const getAVendorApi = function (json) {
  return Vue.prototype.$post(`${getAVendor}`, json)
}

//vendor里商家详情优惠劵列表
const getCoupon = `${process.env.VUE_APP_OTHER_API_ENV}customercoupons/listByShopId`
export const getCouponApi = function (json) {
  return Vue.prototype.$post(`${getCoupon}`, json)
}

//请求vendor里用户评论
const getComment = '/fair/center/h5/comment/list'
export const getCommentApi = function (json) {
  return Vue.prototype.$post(`${getComment}`, json)
}


