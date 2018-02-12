import { SHOWLOADING, HIDELOADING } from './mutation-types'

const state = {
  showLoading: false,
  token: ''
}

const getters = {
  showLoading: state => state.showLoading
}

const actions = {
  showLoader({ commit }) {
    commit(SHOWLOADING, true)
  },
  hideLoader({ commit }) {
    commit(HIDELOADING, false)
  }
}

const mutations = {
  [SHOWLOADING](state) {
    state.showLoading = true
  },
  [HIDELOADING](state) {
    state.showLoading = false
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
