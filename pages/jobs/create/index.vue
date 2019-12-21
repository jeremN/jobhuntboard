<template>
  <div class="container">
    <h1>Add a new job</h1>
    <form
      @submit.prevent="saveJob"
      class="form"
    >
      <div class="form__row">
        <div class="form__group">
          <label for="companyName">Company Name</label>
          <input
            v-model="job.companyName"
            id="companyName"
            type="text"
            name="companyName">
        </div>
        <div class="form__group">
          <label for="status">Current application status</label>
          <select
            v-model="job.status"
            id="status">
            <option
              v-for="status in statuses"
              :key="status.id"
              :value="status.id">
              {{ status.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="jobTitle">Job Title</label>
          <input
            v-model="job.jobTitle"
            id="jobTitle"
            type="text"
            name="jobTitle">
        </div>
        <div class="form__group">
          <label for="contractType">Contract Type</label>
          <select
            v-model="job.contractType"
            id="contractType">
            <option
              v-for="type in contractTypes"
              :key="type.id"
              :value="type.id">
              {{ type.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="companyWebsite">Company Website</label>
          <input
            v-model="job.companyWebsite"
            id="companyWebsite"
            type="url"
            name="companyWebsite">
        </div>
      </div>
      <h2>More informations</h2>
      <div class="form__row">
        <div class="form__group">
          <label for="contactName">Contact Name</label>
          <input
            v-model="job.contactName"
            id="contactName"
            type="text"
            name="contactName">
        </div>
        <div class="form__group">
          <label for="contactEmail">Contact Email</label>
          <input
            v-model="job.contactEmail"
            id="contactEmail"
            type="email"
            name="contactEmail">
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="salary">Salary</label>
          <input
            v-model="job.salary"
            id="salary"
            type="text"
            name="salary">
        </div>
        <div class="form__group">
          <label for="location">Location</label>
          <input
            v-model="job.location"
            id="location"
            type="text"
            name="location">
        </div>
      </div>
      <div class="form__group">
        <label for="notes">Notes</label>
        <textarea
          v-model="job.notes"
          id="notes"
          name="notes">
        </textarea>
      </div>
      <div class="form__group">
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import STATUS from '~/helpers/statusTypes'

export default {
  data () {
    return {
      contractTypes: [
        { id: 'fullTime', text: 'Full Time' },
        { id: 'halfTime', text: 'Half Time' },
        { id: 'freelance', text: 'Freelance' }
      ],
      job: {
        companyName: '',
        status: '',
        jobTitle: '',
        companyWebsite: '',
        contractType: '',
        contactName: '',
        contactEmail: '',
        salary: '',
        location: '',
        notes: ''
      }
    }
  },
  computed: {
    statuses () {
      return STATUS
    }
  },
  methods: {
    async saveJob () {
      await this.$store.dispatch('createJob', this.job)
      this.$router.push('/jobs')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

h1 {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 0 auto 5rem;
  padding: 1.5rem;
}

.form__row {
  display: flex;
}

.form__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
}

input {
  width: 100%;
}
</style>
