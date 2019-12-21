<template>
  <div class="container">
    <h1>Reset password</h1>
    <form class="form">
      <div class="form__group">
        <label for="email">Email</label>
        <input id="email" type="email" name="email">
      </div>
      <div class="form__group">
        <button type="submit">Sign in</button>
      </div>
    </form>
    <div class="sublinks">
      <div class="sublinks__link">
        <nuxt-link to="/auth/forgot-password">Forgot password ?</nuxt-link>
      </div>
      <div class="sublinks__link">
        <p>Don't have an account yet ?</p>
        <nuxt-link to="/auth/signup">Sign up now</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorMsg: '',
      email: ''
    }
  }
}
</script>
