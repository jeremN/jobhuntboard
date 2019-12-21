<template>
  <div class="container">
    <section class="wrap wrap__filters">
      <JobFilters />
    </section>
    <section class="wrap wrap__jobs">
      <div
        v-if="jobs.length"
        class="wrap__list"
      >
        <nuxt-link
          v-for="(job, index) in jobs"
          :key="index"
          :to="`/jobs/${job.id}`"
        >
          <JobCard :job="job" />
        </nuxt-link>
        <NoJobMessage v-if="!filteredJobs.length" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JobFilters from '~/components/JobFilters/JobFilters.vue'
import JobCard from '~/components/JobCard/JobCard.vue'
import NoJobMessage from '~/components/NoJobMessage/NoJobMessage.vue'

export default {
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
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction:  column;
}
.wrap {
  width: 50%;
  margin: 1.5rem auto;
}
</style>
