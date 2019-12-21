<template>
  <div class="container">
    <h1>Sign In</h1>
    <form class="form">
      <div class="form__group">
        <label for="email">Email</label>
        <input id="email" type="email" name="email">
      </div>
      <div class="form__group">
        <label for="password">Password</label>
        <input id="password" type="password" name="password">
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
