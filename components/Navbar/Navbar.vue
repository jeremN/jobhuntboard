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
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.navbar > * {
  display: flex;
  align-items: center;
}

.navbar__logo {
  display: flex;
}

.navbar__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__link {
  display: flex;
}

.navbar__logo a,
.navbar__link a {
  padding: 0.5rem 1.5rem;
  margin: auto;
}
</style>
