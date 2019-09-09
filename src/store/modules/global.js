const state = {
  data: []
}

const mutations = {
  setData (state, payload) {
    !state.data.includes(payload.res) && state.data.push(payload.res)
  },
  removeData (state, payload) {
    const index = state.data.indexOf(payload.res)
    index !== -1 && state.data.splice(index, 1)
  }
}
const getters = {

}
const actions = {
  setData ({ commit }, data) {
    const { payload } = data
    commit({
      type: 'setData',
      res: payload
    })
  },
  removeData ({ commit }, data) {
    const { payload } = data
    commit({
      type: 'removeData',
      res: payload
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
