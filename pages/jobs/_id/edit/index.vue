<template>
  <div class="container">
    <h1>Edit job</h1>
    <form class="form" @submit.prevent="saveJob">
      <div class="form__row">
        <div class="form__group">
          <label for="companyName">Company Name</label>
          <input
            v-model="form.companyName"
            id="companyName"
            type="text"
            name="companyName">
        </div>
        <div class="form__group">
          <label for="status">Current application status</label>
          <select
            v-model="form.status"
            id="status">
            <option
              v-for="status in statuses"
              :key="status.id"
              v-model="status.id">
              {{ status.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="jobTitle">Job Title</label>
          <input
            v-model="form.jobTitle"
            id="jobTitle"
            type="text"
            name="jobTitle">
        </div>
        <div class="form__group">
          <label for="contractType">Contract Type</label>
          <select
            v-model="form.contractType"
            id="contractType">
            <option
              v-for="type in contractTypes"
              :key="type.id"
              v-model="type.id">
              {{ type.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="companyWebsite">Company Website</label>
          <input
            v-model="form.companyWebsite"
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
            v-model="form.contactName"
            id="contactName"
            type="text"
            name="contactName">
        </div>
        <div class="form__group">
          <label for="contactEmail">Contact Email</label>
          <input
            v-model="form.contactEmail"
            id="contactEmail"
            type="email"
            name="contactEmail">
        </div>
      </div>
      <div class="form__row">
        <div class="form__group">
          <label for="salary">Salary</label>
          <input
            v-model="form.salary"
            id="salary"
            type="text"
            name="salary">
        </div>
        <div class="form__group">
          <label for="location">Location</label>
          <input
            v-model="form.location"
            id="location"
            type="text"
            name="location">
        </div>
      </div>
      <div class="form__group">
        <label for="notes">Notes</label>
        <textarea
          v-model="form.notes"
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
import { mapGetters, mapActions } from 'vuex'
import STATUS from '~/helpers/statusTypes'

export default {
  data () {
    return {
      contractTypes: [
        { id: 'fullTime', text: 'Full Time' },
        { id: 'halfTime', text: 'Half Time' },
        { id: 'freelance', text: 'Freelance' }
      ],
      form: {}
    }
  },
  mounted () {
    const jobId = this.$route.params.id
    this.getSingleJobById(jobId)
    this.form = { ...this.job }
  },
  methods: {
    ...mapActions([
      'editJob',
      'getSingleJobById'
    ]),
    async saveJob () {
      await this.editJob(this.form)
      this.$router.push(`/jobs/${this.form.id}`)
    }
  },
  computed: {
    statuses () {
      return STATUS
    },
    ...mapGetters({
      'job': 'getJob'
    }) /* ,
    companyName: {
      get () {
        return this.$store.state.job.companyName
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'companyName',
          value: val
        })
      }
    },
    status: {
      get () {
        return this.$store.state.job.status
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'status',
          value: val
        })
      }
    },
    jobTitle: {
      get () {
        return this.$store.state.job.jobTitle
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'jobTitle',
          value: val
        })
      }
    },
    companyWebsite: {
      get () {
        return this.$store.state.job.companyWebsite
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'companyWebsite',
          value: val
        })
      }
    },
    contractType: {
      get () {
        return this.$store.state.job.contractType
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'contractType',
          value: val
        })
      }
    },
    contactName: {
      get () {
        return this.$store.state.job.contactName
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'contactName',
          value: val
        })
      }
    },
    contactEmail: {
      get () {
        return this.$store.state.job.contactEmail
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'contactEmail',
          value: val
        })
      }
    },
    salary: {
      get () {
        return this.$store.state.job.salary
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'salary',
          value: val
        })
      }
    },
    location: {
      get () {
        return this.$store.state.job.location
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'location',
          value: val
        })
      }
    },
    notes: {
      get () {
        return this.$store.state.job.notes
      },
      set (val) {
        this.setEditedAttribute({
          attr: 'notes',
          value: val
        })
      }
    } */
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
