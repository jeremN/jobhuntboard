<template>
  <div class="container">
    <div class="wrap quicklinks">
      <nuxt-link to="/jobs">Back to jobs list</nuxt-link>
      <ul class="quicklinks__list">
        <li>
          <nuxt-link :to="`/jobs/${id}/edit`">Edit job</nuxt-link>
        </li>
        <li>
          <select
            id="status"
            v-model="status">
            <option value="">Quick status change</option>
            <option
              v-for="status in statuses"
              :key="status.id"
              :value="status.id">
                {{ status.text }}
              </option>
          </select>
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
          <h2>{{ job.companyName }}</h2>
          <p>Company website</p>
          <p v-if="job.companyUrl">
            {{ job.companyUrl }}
          </p>
          <p v-else>No website</p>
        </div>
        <div class="card__jobStatus">
          <span>{{ job.status }}</span>
        </div>
      </div>
      <div class="card__body card__body--noBkgnd">
        <section class="card__body--left">
          <div class="card__jobDetails">
            <h2>Job Details</h2>
            <p>Job title</p>
            <p>{{ job.title }}</p>
            <p>Salary</p>
            <p>{{ job.salary }}</p>
            <p>Location</p>
            <p>{{ job.location }}</p>
            <p>Contract</p>
            <p>{{ job.contract }}</p>
          </div>
          <div class="card__contactDetails">
            <h2>Contact Details</h2>
            <p>Contact Name</p>
            <p>{{ job.contactName }}</p>
            <p>Contact Email</p>
            <p>{{ job.contactEmail }}</p>
          </div>
        </section>
        <section class="card__body--right">
          <div class="card__notes">
            <h2>Notes</h2>
            <p>{{ job.notes }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import STATUS from '~/helpers/statusTypes'

export default {
  data () {
    return {
      status: '',
      id: ''
    }
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
