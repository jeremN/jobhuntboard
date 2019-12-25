<template>
  <header>
    <nav class="navbar">
      <div class="navbar__logo">
        <nuxt-link
          :to="isAuth ? '/jobs' : '/' ">
          Job board
        </nuxt-link>
      </div>
      <ul class="navbar__list">
        <li class="navbar__link">
          <nuxt-link
            v-if="!isAuth"
            to="/auth/signin">
            Sign In
          </nuxt-link>
        </li>
        <li class="navbar__link">
          <nuxt-link
            v-if="!isAuth"
            to="/auth/signup">
            Sign Up
          </nuxt-link>
        </li>
        <li class="navbar__link">
          <nuxt-link
            v-if="isAuth"
            to="/profile">
            Profile
          </nuxt-link>
        </li>
        <li class="navbar__link">
          <nuxt-link
            v-if="isAuth"
            to="/jobs">
            Jobs
          </nuxt-link>
        </li>
        <li class="navbar__link navbar__link--cta">
          <nuxt-link
            v-if="isAuth"
            to="/jobs/create">
            Track a new job
          </nuxt-link>
        </li>
        <li class="navbar__link">
          <a href="#" title="Logout">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      isAuth: true
    }
  }
}
</script>

<style scoped>
header {
  flex-basis: 25%;
  max-width: 30rem;
  background-color: #272d5e;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 15px 0;
}

.navbar > * {
  display: flex;
  align-items: center;
}

.navbar__logo {
  display: flex;
  padding: 0.5rem 1.5rem;
}

.navbar__list {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  padding: 0;
}

.navbar__link {
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.navbar__logo a,
.navbar__link a {
  padding: 1.5rem;
  margin: 0;
  width: 100%;
  text-decoration: none;
  color: #9094ad;
}

.navbar__link a.nuxt-link-exact-active {
  color: #fafbfe;
  background-color: #202552;
}
</style>
