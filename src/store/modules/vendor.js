import { getAVendorApi, getCommentApi, getCouponApi } from '../../service/api.js'
import { Toast } from 'vant'

function intoDate (str) {
  const result = str.split(',')
  for (let x = 0; x < result.length; x++) {
    if (result[x] === 1) {
      result[x] = '周一'
    } else if (result[x] === 2) {
      result[x] = '周二'
    } else if (result[x] === 3) {
      result[x] = '周三'
    } else if (result[x] === 4) {
      result[x] = '周四'
    } else if (result[x] === 5) {
      result[x] = '周五'
    } else if (result[x] === 6) {
      result[x] = '周六'
    } else if (result[x] === 7) {
      result[x] = '周日'
    }
  }
  return result.toString()
}

const state = {
  aVendor: {},
  aComment: {},
  aCoupon: {}
}

const mutations = {
  getVendor (state, payload) {
    state.aVendor = payload.data
  },
  getComment (state, payload) {
    state.aComment = payload.data
  },
  getCoupon (state, payload) {
    state.aCoupon = payload.data
  }

}

const getters = {
  getStartEndTime: state => {
    if (state.aVendor && state.aVendor.businessStartEnd) { // 判断有值后再用parse
      const startEndTime = JSON.parse(state.aVendor.businessStartEnd)
      return startEndTime
    }
    return null
  },
  getAddress: state => {
    if (state.aVendor && state.aVendor.shopAddress) { // 判断有值后再用parse
      const address = JSON.parse(state.aVendor.shopAddress)
      return address
    }
    return null
  },
  getWeekDate: state => {
    if (state.aVendor && state.aVendor.businessDate) {
      return intoDate(state.aVendor.businessDate)
    }
    return null
  }
}

const actions = {
  getAVendor ({ commit }, data) {
    getAVendorApi({ ...data }).then((res) => {
      if (res && res.code === '00000') {
        commit({
          type: 'getVendor',
          data: res.data
        })
      } else {
        Toast('加载数据失败！')
      }
    })
  },
  getComment ({ commit }, data) {
    getCommentApi({ ...data }).then((res) => {
      if (res && res.code === '00000') {
        commit({
          type: 'getComment',
          data: res.data
        })
      } else {
        Toast('加载数据失败！')
      }
    })
  },
  getCoupon ({ commit }, data) {
    getCouponApi({ ...data }).then((res) => {
      if (res && res.code === '00000') {
        commit({
          type: 'getCoupon',
          data: res.data
        })
      } else {
        Toast('加载数据失败！')
      }
    })
  }

}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
