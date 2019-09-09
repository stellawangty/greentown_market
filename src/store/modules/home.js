import { projectInfoApi, userInfoApi, cancelReservationApi, cancelQueryApi, loginApi, appLoginApi } from '../../service/api'
import { Toast } from 'vant'

function initList (data) {
  let list = []
  if (data && data.length) {
    list = data.map((item) => ({
      ...item,
      tags: item.tags.split('，'),
      distance: parseInt(item.distance / 1000).toFixed(1)
    }))
  }
  return list
}
const state = {
  listData: [],
  page: 1,
  pageNumber: 1,
  userInfo: {}
}

const mutations = {
  getData (state, payload) {
    state.listData = state.listData.concat(initList(payload.res.rows))
    state.pageNumber = Math.ceil(payload.res.total / payload.res.pageSize)
  },
  getUser (state, payload) {
    state.userInfo = payload.data
  },
  refreshData (state, payload) {
    state.listData = initList(payload.res.rows)
    state.pageNumber = Math.ceil(payload.res.total / payload.res.pageSize)
  },
  initPage () {
    state.page = 1
  },
  plusPage (state, payload) {
    state.page = payload.page + 1
  },
  initData (state) {
    state.listData = []
    state.page = 1
    state.pageNumber = 1
  }
}
// 主要是为了通过state衍生出一些自己想要的数据。
// 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
const getters = {
  carsList: state => {
    if (state.userInfo && state.userInfo.uservehiclesList) {
      let carsList = []
      carsList = state.userInfo.uservehiclesList
      return carsList
    }
  }
}
const actions = {
  cancelQuery ({ commit }, data) {
    return new Promise((resolve, reject) => {
      cancelQueryApi({ ...data }).then((res) => {
        if (res && res.code === 200) {
          resolve(res)
        } else {
          Toast('查询预约记录失败')
        }
      })
    })
  },
  cancelReservation ({ commit }, data) {
    return new Promise((resolve, reject) => {
      cancelReservationApi({ ...data }).then((res) => {
        if (res && res.code === 200) {
          resolve()
        } else {
          Toast('取消预约失败！')
        }
      })
    })
  },
  loadMore ({ dispatch, commit, state }, data) {
    return new Promise((resolve, reject) => {
      const { type, page } = data
      projectInfoApi({ ...data }).then(res => {
        if (res && res.code === 200) {
          if (type === 'loadMore') {
            commit({
              type: 'getData',
              res: res.data
            })
          } else {
            commit({
              type: 'refreshData',
              res: res.data
            })
          }
          dispatch({
            type: 'plusPage',
            data: page
          })
          resolve()
        } else {
          reject(res && res.error)
          Toast('加载数据失败!')
        }
      })
    })
  },
  getUserInfo ({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      userInfoApi({ ...data }).then((res) => {
        if (res && res.code === 200) {
          commit({
            type: 'getUser',
            data: res.data
          })
          resolve()
        } else {
          reject(res)
        }
      })
    })
  },
  plusPage ({ commit }, res) {
    commit({
      type: 'plusPage',
      page: res.data
    })
  },
  initData ({ commit }) {
    commit({
      type: 'initData'
    })
  },
  initPage ({ commit }) {
    commit({
      type: 'initPage'
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
