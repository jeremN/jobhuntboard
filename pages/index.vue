<template>
  <div class="container home">
    <h1>Keep track of your job search</h1>
    <p>Organize your job search by tracking leads and staying on top of the hunt.</p>
    <div class="cta__row">
      <nuxt-link to="/auth/signup">Create an account</nuxt-link>
      <nuxt-link to="/auth/signin">Sign-in</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  width: 1280px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.home {
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home h1 {
  margin: 0 auto 1rem;
}

.home .cta__row {
  margin-top: 7rem;
}

.home a {
  background-color: #272d5e;
  color: #fff;
  padding: 1rem 5rem;
  border-radius: 4rem;
}

.home a:last-child {
  background-color: #fff;
  color: #272d5e;
  border: 1px solid #EFF0F3;
  cursor: pointer;
  margin-left: 2rem;
}
</style>
