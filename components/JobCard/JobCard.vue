<template>
  <div
    :class="`jobcard--${job.status}`"
    class="jobcard">
    <div class="jobcard__head">
      <h2 class="jobcard__companyName">
        {{ job.companyName }}
      </h2>
      <h3 class="jobcard__jobTitle h6__like">
        {{ job.jobTitle }}
      </h3>
    </div>
    <div class="jobcard__other">
      <span>{{ job.status }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: Object
      // required: true,
    }
  }
}
</script>

<style scoped>
.jobcard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 1.5rem auto;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-left: 2px solid #fff;
}

.jobcard__jobTitle {
  color: #4a5568;
}

.jobcard--applicationSent {
  border-left-color: #78e08f;
}
.jobcard--interviewSet {
  border-left-color: #60a3bc;
}
.jobcard--prospect {
  border-left-color: #f6b93b;
}
.jobcard--rejected {
  border-left-color: #e55039;
}
</style>
