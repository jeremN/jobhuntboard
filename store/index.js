import filterJobs from '~/helpers/filtersBy'
import orderJobs from '~/helpers/orderBy'

const defaultState = {
  jobs: [],
  filteredJobs: [],
  job: {},
  filterBy: {
    search: null,
    status: 'all',
    order: 'none'
  },
  isLoading: false,
  errorMsg: ''
}

export const state = () => ({ ...defaultState })

export const getters = {
  getJobs (state) {
    return state.jobs
  },
  getFilteredJobs (state) {
    return state.filteredJobs
  },
  getJob (state) {
    return state.job
  },
  getErrorMsg (state) {
    return state.errorMsg
  },
  getLoadingState (state) {
    return state.isLoading
  }
}

export const mutations = {
  setJobs (state, jobs) {
    state.jobs = jobs
  },
  setFilteredJobs (state, filteredJobs) {
    state.filteredJobs = filteredJobs
  },
  setJob (state, job) {
    state.job = job
  },
  setFilterStatus (state, status) {
    state.filter.status = status
  },
  setFilterSearch (state, search) {
    state.filter.search = search
  },
  addJob (state, newJob) {
    state.jobs = [
      ...state.jobs,
      newJob
    ]
  },
  editJob (state, editedJob) {
    const jobIndex = state.jobs.findIndex(job => job.id === editedJob.id)
    state.jobs[jobIndex] = editedJob
  },
  removeJob (state, jobId) {
    const updatedJobs = state.jobs.filter(job => job.id !== jobId)
    state.jobs = updatedJobs
  },
  setEditedAttribute (state, { attr, value }) {
    state.job[attr] = value
  },
  setFilterByStatus (state, status) {
    state.filterBy.status = status
  },
  setFilterBySearch (state, search) {
    state.filterBy.search = search
  },
  setOrderBy (state, order) {
    state.filterBy.order = order
  },
  orderJobs (state) {
    state.filteredJobs = orderJobs(state.filterBy.order, [...state.filteredJobs])
  },
  filterJobs (state) {
    state.filteredJobs = filterJobs(state.filterBy, [...state.jobs])
  },
  clearState (state, newState) {
    state = newState
  },
  setLoadingState (state, loading) {
    state.isLoading = loading
  },
  setErrorMsg (state, message) {
    state.errorMsg = message
  }
}

export const actions = {
  async fetchAllJobs ({ commit, rootState }) {
    console.log(rootState)
    await this.$axios
      .$get(`https://jobsearch-4c40a.firebaseio.com/users/${rootState.user.user.uid}/jobs.json?auth=${rootState.user.token}`)
      .then((res) => {
        const jobsArray = []
        for (const key in res) {
          jobsArray.push({
            ...res[key],
            id: key
          })
        }
        commit('setJobs', jobsArray)
        commit('setFilteredJobs', jobsArray)
      })
      .catch(err => console.error(err))
  },
  async createJob ({ commit, rootState }, job) {
    const newJob = {
      ...job,
      createdAt: new Date()
    }
    await this.$axios
      .$post(`https://jobsearch-4c40a.firebaseio.com/users/${rootState.user.user.uid}/jobs.json?auth=${rootState.user.token}`, job)
      .then((res) => {
        commit('addJob', {
          ...newJob,
          id: res.name
        })
      })
      .catch(err => console.error(err))
  },
  async editJob ({ commit, rootState }, editedJob) {
    await this.$axios
      .$put(`https://jobsearch-4c40a.firebaseio.com/users/${rootState.user.user.uid}/jobs/${editedJob.id}.json?auth=${rootState.user.token}`, editedJob)
      .then((res) => {
        commit('editJob', editedJob)
      })
      .catch(err => console.error(err))
  },
  async fetchSingleJob ({ commit, rootState }, jobId) {
    await this.$axios
      .$get(`https://jobsearch-4c40a.firebaseio.com/users/${rootState.user.user.uid}/jobs/${jobId}.json?auth=${rootState.user.token}`)
      .then((res) => {
        commit('setJob', res)
      })
      .catch(err => console.error(err))
  },
  async getSingleJobById ({ commit, state, dispatch }, jobId) {
    if (!state.jobs.length) {
      await dispatch('fetchSingleJob', jobId)
    } else {
      const job = state.jobs.find(j => j.id === jobId)
      if (job) {
        commit('setJob', job)
      }
    }
  },
  async removeJob ({ commit, rootState }, jobId) {
    await this.$axios
      .$delete(`https://jobsearch-4c40a.firebaseio.com/users/${rootState.user.user.uid}/jobs/${jobId}.json?auth=${rootState.user.token}`)
      .then((res) => {
        commit('removeJob', jobId)
      })
      .catch(err => console.error(err))
  },
  setEditedAttribute ({ commit }, { attr, value }) {
    commit('setEditedAttribute', { attr, value })
  },
  async filterByStatus ({ commit, dispatch }, status) {
    await commit('setFilterByStatus', status)
    dispatch('filterJobs')
  },
  async filterBySearch ({ commit, dispatch }, search) {
    await commit('setFilterBySearch', search)
    dispatch('filterJobs')
  },
  async orderBy ({ commit }, order) {
    await commit('setOrderBy', order)
    await commit('orderJobs')
  },
  async filterJobs ({ commit }) {
    await commit('filterJobs')
    await commit('orderJobs')
  }
}
