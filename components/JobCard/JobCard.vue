<template>
  <div
    :class="setStatusClasse(`${job.status}`)"
    class="jobcard">
    <div class="jobcard__head">
      <h2 class="jobcard__companyName">
        {{ job.companyName }}
      </h2>
      <h3 class="jobcard__jobTitle h6__like">
        {{ job.jobTitle }}
      </h3>
    </div>
    <div class="jobcard__more">
      <p><span>Location</span><strong>{{ job.location }}</strong></p>
      <p><span>Salary</span><strong>{{ job.salary }}</strong></p>
    </div>
    <div class="jobcard__status">
      <span>{{ job.status }}</span>
    </div>
  </div>
</template>

<script>
import STATUS from '~/helpers/statusTypes'

export default {
  methods: {
    setStatusClasse (status) {
      let statusClass = 'jobcard--base'
      for (const key in STATUS) {
        if (status.toLowerCase() === STATUS[key].text.toLowerCase()) {
          statusClass = `jobcard--${STATUS[key].id}`
        }
      }
      return statusClass
    }
  },
  props: {
    job: {
      type: Object
      // required: true,
    }
  }
}
</script>

<style scoped>
h2 {
  color: #272d5e;
  font-size: 1.8rem;
}

h3 {
  color: #f4f5f8;
  font-size: 1.2rem;
}

p {
  margin: 0;
}

p:last-of-type {
  margin-left: auto;
}

p strong{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #4a5568;
}

p span {
  color: #4a5568;
  font-size: 1.2rem;
}

.jobcard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  margin: 1.5rem auto;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-left: 2px solid #fff;
  border-radius: 1rem;
}
.jobcard__head,
.jobcard__more,
.jobcard__status {
  width: 33.3334%;
  display: flex;
  align-items: flex-start;
}

.jobcard__head{
  flex-direction: column;
}

.jobcard__jobTitle {
  color: #4a5568;
}

.jobcard__more {
  display: flex;
}

.jobcard__status {
  font-size: 1.4rem;
}

.jobcard__status span {
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  margin-left: auto;
}

.jobcard--application-sent .jobcard__status span {
  background-color: #78e08f;
}
.jobcard--interview-set .jobcard__status span {
  background-color: #60a3bc;
}
.jobcard--prospect .jobcard__status span {
  background-color: #f6b93b;
}
.jobcard--rejected .jobcard__status span {
  background-color: #e55039;
}
</style>
