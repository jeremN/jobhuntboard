<template>
  <div
    :class="setStatusClasse(`${currentStatus}`)"
    class="jobcard__status">
    <span>{{ title }}</span>
  </div>
</template>

<script>
import STATUS from '~/helpers/statusTypes'

export default {
  props: {
    currentStatus: {
      type: String,
      required: false,
      default () {
        return 'prospect'
      }
    }
  },
  methods: {
    setStatusClasse (status) {
      let statusClass = 'jobcard__status--base'
      for (const key in STATUS) {
        if (status === STATUS[key].id) {
          statusClass = `jobcard__status--${STATUS[key].id}`
        }
      }
      return statusClass
    }
  },
  computed: {
    title () {
      let currentStatus = ''
      for (const key in STATUS) {
        if (this.currentStatus === STATUS[key].id) {
          currentStatus = STATUS[key].text
        }
      }
      return currentStatus
    }
  }
}
</script>

<style scoped>
.jobcard__status {
  width: 33.3334%;
  display: flex;
  align-items: flex-start;
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

.jobcard__status--application-sent span {
  background-color: #78e08f;
}
.jobcard__status--interview-set span {
  background-color: #60a3bc;
}
.jobcard__status--prospect span {
  background-color: #f6b93b;
}
.jobcard__status--rejected span {
  background-color: #e55039;
}</style>
