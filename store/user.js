export const state = () => ({
  token: null,
  user: {}
})

export const getters = {
  isAuth (state) {
    return state.token != null
  },
  user (state) {
    return state.user
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  },
  setUser (state, user) {
    state.user = { ...user }
  }
}

export const actions = {
  async signin ({ commit }, authData) {
    await this.$axios
      .$post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.firebaseAPIKey}`, {
        ...authData
      })
      .then((res) => {
        console.log(res)
        commit('setToken', res.idToken)
        localStorage.setItem('jobhuntboard', {
          token: res.idToken,
          tokenExpiration: new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
        })
      })
      .catch(err => console.error(err))
  },
  async signup ({ commit }, authData) {
    await this.$axios
      .$post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.firebaseAPIKey}`, {
        ...authData
      })
      .then((res) => {
        console.log(res)
        commit('setToken', res.idToken)
        localStorage.setItem('jobhuntboard', {
          token: res.idToken,
          tokenExpiration: new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
        })
      })
      .catch(err => console.error(err))
  },
  async logout ({ dispatch, commit }) {
    await commit('clearToken')
  },
  sendPasswordResetEmail (context, email) {},
  changePassword (context, form) {},
  getUser ({ commit, state }, user) {}
}
