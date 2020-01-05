<template>
  <div class="container">
    <div class="head">
      <h1>Profile</h1>
      <button @click.prevent="deleteAccount">Delete my account</button>
    </div>
    <div class="profile">
      <form class="form" @submit.prevent="updateEmail">
        <h2 class="h4__like">Update my email adress</h2>
        <div
          :class="{ 'form__group--hasError': $v.email.$error }"
          class="form__group">
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            name="email">
          <p v-if="!$v.email.required">Email required</p>
          <p v-if="!$v.email.email">Email incorrect</p>
        </div>
        <div class="form__group">
          <button type="submit">Update email</button>
        </div>
      </form>
      <form class="form" @submit.prevent="updatePassword">
        <h2 class="h4__like">Change my password</h2>
        <div
          :class="{ 'form__group--hasError': $v.passwordForm.oldPassword.$error }"
          class="form__group">
          <label for="oldPassword">Old password</label>
          <input
            v-model="passwordForm.oldPassword"
            id="oldPassword"
            type="password"
            name="password">
          <p v-if="!$v.passwordForm.oldPassword.required">Old password required</p>
          <p v-if="!$v.passwordForm.oldPassword.minLength">Old password must be 6 characters at least</p>
        </div>
        <div
          :class="{ 'form__group--hasError': $v.passwordForm.password.$error }"
          class="form__group">
          <label for="newPassword">Password</label>
          <input
            v-model="passwordForm.password"
            id="newPassword"
            type="password"
            name="password">
          <p v-if="!$v.passwordForm.password.required">Password required</p>
          <p v-if="!$v.passwordForm.password.minLength">Password must be 6 characters at least</p>
        </div>
        <div
          :class="{ 'form__group--hasError': $v.passwordForm.passwordConfirm.$error }"
          class="form__group">
          <label for="passwordConfirm">Confirm password</label>
          <input
            v-model="passwordForm.passwordConfirm"
            id="passwordConfirm"
            type="password"
            name="password">
          <p v-if="!$v.passwordForm.oldPassword.required">Password confirmation required</p>
          <p v-if="!$v.passwordForm.oldPassword.sameAs">Password confirmation and password are different</p>
        </div>
        <div class="form__group">
          <button type="submit">Change password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      passwordForm: {
        oldPassword: '',
        password: '',
        passwordConfirm: ''
      },
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    passwordForm: {
      oldPassword: {
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    ...mapActions({
      'updateAccount': 'user/updateAccount',
      'deleteUserAccount': 'user/deleteUserAccount'
    }),
    async updateEmail () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'error'
      } else {
        await this.updateAccount({ email: this.email })
        this.submitStatus = null
      }
    },
    async updatePassword () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'error'
      } else {
        await this.updateAccount({ password: this.passwordForm.password })
        this.submitStatus = null
      }
    },
    async deleteAccount () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'error'
      } else {
        await this.deleteUserAccount()
        this.submitStatus = null
        this.$router.push('/')
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

.head {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.head button {
  margin: 0;
  background-color: #fff;
  color: #272d5e;
  border: 1px solid #EFF0F3;
}

h1 {
  color: #272d5e;
  letter-spacing: 0.2rem;
}

h2 {
  text-align: left;
}

.profile {
  display: flex;
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 42rem;
  margin: 2.5rem 0 5rem;
  padding: 1.5rem;
}

.form:last-child {
  margin-left: 12rem;
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

label {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 2;
  color: #272d5e;
}

input {
  width: 100%;
  border: 1px solid #EFF0F3;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  height: 3.9rem;
}

button {
  background-color: #272d5e;
  color: #fff;
  padding: 1rem 5rem;
  border-radius: 0.5rem;
  margin: 3rem 0 0;
}
</style>
