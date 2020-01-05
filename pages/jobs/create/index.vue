<template>
  <div class="container">
    <h1>Add a new job</h1>
    <form
      @submit.prevent="saveJob"
      class="form"
    >
      <div class="form__row">
        <div
          :class="{ 'form__group--hasError': $v.job.companyName.$error }"
          class="form__group">
          <label for="companyName">Company Name</label>
          <input
            v-model="job.companyName"
            id="companyName"
            type="text"
            name="companyName">
          <p v-if="!$v.job.companyName.required">Company name required</p>
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
        <div
          :class="{ 'form__group--hasError': $v.job.jobTitle.$error }"
          class="form__group">
          <label for="jobTitle">Job Title</label>
          <input
            v-model="job.jobTitle"
            id="jobTitle"
            type="text"
            name="jobTitle">
          <p v-if="!$v.job.jobTitle.required">Job title required</p>
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
        <div
          :class="{ 'form__group--hasError': $v.job.companyWebsite.$error }"
          class="form__group">
          <label for="companyWebsite">Company Website</label>
          <input
            v-model="job.companyWebsite"
            id="companyWebsite"
            type="url"
            name="companyWebsite">
          <p v-if="!$v.job.companyWebsite.url">Company website url incorrect</p>
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
        <div
          :class="{ 'form__group--hasError': $v.job.contactEmail.$error }"
          class="form__group">
          <label for="contactEmail">Contact Email</label>
          <input
            v-model="job.contactEmail"
            id="contactEmail"
            type="email"
            name="contactEmail">
          <p v-if="!$v.job.companyName.email">Company email incorrect</p>
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
import { required, url, email } from 'vuelidate/lib/validators'
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
      },
      submitStatus: null
    }
  },
  validations: {
    job: {
      companyName: {
        required
      },
      jobTitle: {
        required
      },
      contactEmail: {
        email
      },
      companyWebsite: {
        url
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'error'
      } else {
        await this.$store.dispatch('createJob', this.job)
        this.submitStatus = null
        this.$router.push('/jobs')
      }
    }
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

h1, h2 {
  color: #272d5e;
  letter-spacing: 0.2rem;
}

h2 {
  margin-top: 5rem;
}

label {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2;
  color: #272d5e;
}

.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 0 5rem;
  padding: 1.5rem;
}

.form__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.form__row > .form__group {
  width: calc(50% - 3rem);
}

.form__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
}

.form__group--hasError p {
  font-size: 1.2rem;
  color: #e55039;
}

.form__group--hasError input {
  border-color: #e55039;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid #EFF0F3;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  height: 3.9rem;
}

textarea {
  min-height: 20rem;
}

button[type="submit"] {
  background-color: #272d5e;
  color: #fff;
  padding: 1rem 5rem;
  border-radius: 0.5rem;
  margin-top: 3rem;
}
</style>
