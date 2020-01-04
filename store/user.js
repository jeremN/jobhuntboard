import Cookie from 'js-cookie'

const defaultState = {
  token: null,
  user: {},
  isLoading: false,
  errorMsg: ''
}

export const state = () => ({ ...defaultState })

export const getters = {
  isAuth (state) {
    return state.token !== null
  },
  user (state) {
    return state.user
  },
  getErrorMsg (state) {
    return state.errorMsg
  },
  getLoadingState (state) {
    return state.isLoading
  }
}

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearState (state, newState) {
    state = newState
  },
  setUser (state, user) {
    state.user = { ...user }
  },
  setLoadingState (state, loading) {
    state.isLoading = loading
  },
  setErrorMsg (state, message) {
    state.errorMsg = message
  }
}

export const actions = {
  async signin ({ dispatch, commit }, authData) {
    const userProfile = {
      email: authData.email
    }
    await this.$axios
      .$post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.firebaseAPIKey}`, {
        ...authData,
        returnSecureToken: true
      })
      .then(({ expiresIn, idToken, localId }) => {
        userProfile.uid = localId
        userProfile.token = idToken
        commit('setToken', idToken)
        const expirationDate = new Date().getTime() + Number.parseInt(expiresIn) * 1000
        localStorage.setItem('jobhuntboard', {
          token: idToken,
          tokenExpiration: expirationDate
        })
        Cookie.set('token', idToken)
        Cookie.set('tokenExpiration', expirationDate)
        dispatch('getUser', userProfile)
      })
      .catch(err => console.error(err))
  },
  async signup ({ dispatch, commit }, authData) {
    const userProfile = {
      email: authData.email,
      username: authData.name
    }
    await this.$axios
      .$post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.firebaseAPIKey}`, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(({ expiresIn, idToken, localId }) => {
        userProfile.uid = localId
        userProfile.token = idToken
        commit('setToken', idToken)
        const expirationDate = new Date().getTime() + Number.parseInt(expiresIn) * 1000
        localStorage.setItem('jobhuntboard', {
          token: idToken,
          tokenExpiration: expirationDate
        })
        Cookie.set('token', idToken)
        Cookie.set('tokenExpiration', expirationDate)
        dispatch('setUserProfile', userProfile)
      })
      .catch(err => console.error(err))
  },
  async logout ({ dispatch, commit }) {
    Cookie.remove('token')
    Cookie.remove('tokenExpiration')
    if (process.client) {
      localStorage.removeItem('jobhuntboard')
    }
    await commit('clearState', defaultState)
  },
  async setUserProfile ({ commit }, { name, email, token, uid }) {
    const user = {
      email,
      uid,
      username: name
    }
    await this.$axios
      .$post(`https://jobsearch-4c40a.firebaseio.com/users/${uid}/profile.json?auth=${token}`, {
        email,
        username: name
      })
      .then((res) => {
        commit('setUser', { ...user })
      })
      .catch(err => console.error(err))
  },
  async sendPasswordResetEmail ({ dispatch, commit, state }, email) {
    await this.$axios
      .$post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.firebaseAPIKey}`, {
        requestType: 'PASSWORD_RESET',
        email: state.user.email
      })
  },
  async updateAccount ({ dispatch, commit, state }, userInfo) {
    await this.$axios
      .$post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.firebaseAPIKey}`, {
        ...userInfo,
        idToken: state.token,
        returnSecureToken: true
      })
      .then(({ expiresIn, idToken }) => {
        commit('setToken', idToken)
        const expirationDate = new Date().getTime() + Number.parseInt(expiresIn) * 1000
        localStorage.setItem('jobhuntboard', {
          token: idToken,
          tokenExpiration: expirationDate
        })
        Cookie.set('token', idToken)
        Cookie.set('tokenExpiration', expirationDate)
      })
      .catch(err => console.error(err))
  },
  async getUser ({ commit, state }, { email, token, uid }) {
    const user = {
      email,
      uid,
      username: ''
    }
    await this.$axios
      .$get(`https://jobsearch-4c40a.firebaseio.com/users/${uid}/profile.json?auth=${token}`)
      .then((res) => {
        let tempObj
        for (const key in res) {
          tempObj = { ...res[key] }
        }
        commit('setUser', {
          ...user,
          ...tempObj
        })
      })
      .catch(err => console.error(err))
  },
  async deleteUserAccount ({ commit, state }) {
    await this.$axios
      .$post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.firebaseAPIKey}`, {
        idToken: state.token
      })
      .then()
  }
}
