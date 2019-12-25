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
        <p>Don't have an account yet ? <nuxt-link to="/auth/signup">Sign up now</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 4rem 0 9rem;
  padding-top: 5.5rem;
}

h1 {
  color: #272d5e;
  letter-spacing: 0.2rem;
}

.form {
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 32rem;
  margin: 0 0 5rem;
  padding: 1.5rem;
}

.form__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0;
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

button[type="submit"] {
  background-color: #272d5e;
  color: #fff;
  padding: 1rem 5rem;
  border-radius: 0.5rem;
  margin: 3rem auto 0;
}

.sublinks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  width: 50%;
  max-width: 32rem;
}
.sublinks__link {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
}
.sublinks__link a {
  color: #272d5e;
  text-decoration: underline;
}
</style>
