<template>
  <div class="container">
    <div class="wrap wrap__main">
      <section class="wrap wrap--filters">
        <JobFilters />
      </section>
      <section class="wrap wrap--jobs">
        <div
          v-if="jobs.length"
          class="wrap__list"
        >
          <nuxt-link
            v-for="(job, index) in filteredJobs"
            :key="index"
            :to="`/jobs/${job.id}`"
          >
            <JobCard :job="job" />
          </nuxt-link>
          <NoJobMessage
            v-if="!filteredJobs.length"
            :message="'No jobs match your filter'" />
        </div>
        <NoJobMessage
          v-else
          :message="'You have not added a job yet'" />
      </section>
    </div>
    <div class="wrap wrap__job">

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JobFilters from '~/components/JobFilters/JobFilters.vue'
import JobCard from '~/components/JobCard/JobCard.vue'
import NoJobMessage from '~/components/NoJobMessage/NoJobMessage.vue'

export default {
  middleware: 'auth',
  components: {
    JobFilters,
    JobCard,
    NoJobMessage
  },
  computed: {
    ...mapGetters({
      'jobs': 'getJobs',
      'filteredJobs': 'getFilteredJobs',
      'job': 'getJob'
    })
  },
  async fetch ({ store }) {
    await store.dispatch('fetchAllJobs')
  },
  mounted () {
    if (!this.jobs.length) {
      this.$store.dispatch('fetchAllJobs')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction:  column;
  margin: 0 4rem 0 9rem;
  padding-top: 5.5rem;
}
.wrap__main {
  width: 67.368%;
  /* max-width: 64rem; */
  margin: 0;
}
.wrap__job {
  width: 52.631%;
  /* max-width: 50rem; */
}

.wrap__list {
  padding: 1.5rem 0;
}

.wrap__list a {
  text-decoration: none;
}
</style>
