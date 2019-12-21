export const state = () => ({
  token: null
})

export const getters = {
  isAuth (state) {
    return state.token != null
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async authUser ({ commit }, authData) {}
}
