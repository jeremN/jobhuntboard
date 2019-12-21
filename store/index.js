
export const state = () => ({
  jobs: [],
  filteredJobs: [],
  job: {},
  filterBy: {
    search: '',
    status: 'all',
    order: 'createdAt'
  }
})

export const getters = {
  getJobs (state) {
    return state.jobs
  },
  getFilteredJobs (state) {
    return state.filteredJobs
  },
  getJob (state) {
    return state.job
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
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, context) {
    await context.app.$axios
      .$get('https://jobsearch-4c40a.firebaseio.com/jobs.json')
      .then((res) => {
        const jobsArray = []
        for (const key in res) {
          jobsArray.push({
            ...res[key],
            id: key
          })
        }
        commit('setJobs', jobsArray)
      })
      .catch(err => context.error(err))
  },
  async createJob ({ commit }, job) {
    const newJob = {
      ...job,
      createdAt: new Date()
    }
    await this.$axios
      .$post('https://jobsearch-4c40a.firebaseio.com/jobs.json', job)
      .then((res) => {
        commit('addJob', {
          ...newJob,
          id: res.name
        })
      })
      .catch(err => console.error(err))
  },
  async editJob ({ commit }, editedJob) {
    await this.$axios
      .$put(`https://jobsearch-4c40a.firebaseio.com/jobs/${editedJob.id}.json`, editedJob)
      .then((res) => {
        commit('editJob', editedJob)
      })
      .catch(err => console.error(err))
  },
  async fetchSingleJob ({ commit }, jobId) {
    await this.$axios
      .$get(`https://jobsearch-4c40a.firebaseio.com/jobs/${jobId}.json`)
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
  async removeJob ({ commit }, jobId) {
    await this.$axios
      .$delete(`https://jobsearch-4c40a.firebaseio.com/jobs/${jobId}.json`)
      .then((res) => {
        console.log(res)
        commit('removeJob', jobId)
      })
      .catch(err => console.error(err))
  },
  setEditedAttribute ({ commit }, { attr, value }) {
    commit('setEditedAttribute', { attr, value })
  }
}
