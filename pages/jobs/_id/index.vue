<template>
  <div class="container">
    <div class="wrap quicklinks">
      <nuxt-link to="/jobs">Back to jobs list</nuxt-link>
      <ul class="quicklinks__list">
        <li>
          <nuxt-link :to="`/jobs/${id}/edit`">Edit job</nuxt-link>
        </li>
        <li>
          <button
            type="button"
            @click.prevent="deleteCurrentJob">Delete job</button>
        </li>
      </ul>
    </div>
    <div class="wrap card">
      <div class="card__head">
        <div class="card__companyDetails">
          <h1>{{ job.companyName }}</h1>
          <p class="card__label">Company website</p>
          <p v-if="job.companyUrl">
            {{ job.companyUrl }}
          </p>
          <p v-else>No website</p>
        </div>
        <div class="card__jobStatus">
          <StatusTag :currentStatus="job.status"/>
        </div>
      </div>
      <div class="card__body card__body--noBkgnd">
        <section class="card__body--left">
          <div class="card__jobDetails">
            <h2 class="h4__like">Job Details</h2>
            <p class="card__label">Job title</p>
            <p v-if="job.title">{{ job.title }}</p>
            <p v-else>{{ noDataSign }}</p>
            <p class="card__label">Salary</p>
            <p v-if="job.salary">{{ job.salary }}</p>
            <p v-else>{{ noDataSign }}</p>
            <p class="card__label">Location</p>
            <p v-if="job.location">{{ job.location }}</p>
            <p v-else>{{ noDataSign }}</p>
            <p class="card__label">Contract</p>
            <p v-if="job.contract">{{ job.contract }}</p>
            <p v-else>{{ noDataSign }}</p>
          </div>
          <div class="card__contactDetails">
            <h2 class="h4__like">Contact Details</h2>
            <p class="card__label">Contact Name</p>
            <p v-if="job.contactName">{{ job.contactName }}</p>
            <p v-else>{{ noDataSign }}</p>
            <p class="card__label">Contact Email</p>
            <p v-if="job.contactEmail">{{ job.contactEmail }}</p>
            <p v-else>{{ noDataSign }}</p>
          </div>
        </section>
        <section class="card__body--right">
          <div class="card__notes">
            <h2 class="h4__like">Notes</h2>
            <p>{{ job.notes }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StatusTag from '~/components/StatusTag/StatusTag'
import STATUS from '~/helpers/statusTypes'

export default {
  data () {
    return {
      status: '',
      id: '',
      noDataSign: '⌀'
    }
  },
  components: {
    StatusTag
  },
  computed: {
    statuses () {
      return STATUS
    },
    ...mapGetters({
      'job': 'getJob'
    })
  },
  methods: {
    async deleteCurrentJob () {
      await this.$store.dispatch('removeJob', this.id)
      this.$router.push('/jobs')
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.$store.dispatch('fetchSingleJob', this.id)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 4rem 0 9rem;
  padding-top: 5.5rem;
}

.quicklinks__list {
  margin-left: auto;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.quicklinks__list li {
  margin: 0 2rem;
}

.quicklinks__list li:last-child {
  margin-right: 0;
}

.quicklinks__list li a,
.quicklinks__list li button {
  background-color: #272d5e;
  color: #fff;
  padding: 1rem 5rem;
  border-radius: 0.5rem;
}
.quicklinks__list li button {
  background-color: #fff;
  color: #272d5e;
  border: 1px solid #EFF0F3;
  cursor: pointer;
}

h1, h2 {
  color: #272d5e;
  letter-spacing: 0.1rem;
  text-align: left;
}

h2 {
  margin-bottom: 1.5rem;
}

.wrap {
  width: 100%;
  display: flex;
}

.quicklinks {
  align-items: center;
}

.quicklinks > a {
  color: #272d5e;
  text-decoration: underline;
}

.card {
  display: flex;
  flex-wrap: wrap;
}

.card__head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card__body {
  width: 100%;
  display: flex;
  flex-flow: wrap;
}

.card__jobDetails,
.card__contactDetails,
.card__head,
.card__notes {
  border-radius: 1rem;
  border: 1px solid #EFF0F3;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  background-color: #fff;
  padding: 1.5rem;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; */
}

.card__body--left {
  display: flex;
  flex-direction: column;
  width: 33.3334%;
  text-align: left;
}

.card__body--right {
  width: calc(66.6667% - 1.5rem);
  margin-left: 1.5rem;
  text-align: left;
}

.card__label {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0;
  margin-top: 0.75rem;
}

.card__label + p {
  margin-top: 0;
  font-size: 1.4rem;
  text-align: left;
}

.card__jobStatus {
  display: flex;
  width: 20rem;
}
.card__jobStatus > * {
  width: 100%;
}

.card__notes p {
  background-color: #f7f8fb;
  padding: 0.5rem;
}

</style>
