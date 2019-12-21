<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  /* set base font-size to equiv "10px", which is adapted to rem unit */
  font-size: 62.5%;
  /* IE9-IE11 math fixing. See http://bit.ly/1g4X0bX */
  font-size: calc(1em * 0.625);
  line-height: 1.5;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto Slab', serif;
  font-size: 1.6rem;
  color: #1a202c;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1, h2, h3, h4, h5, h6,
.h1__like, .h2__like, .h3__like, .h4__like, .h5__like, .h6__like {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
}

h1,
.h1__like {
  font-size: 3.2rem;
}
h2,
.h2__like {
  font-size: 2.8rem;
}
h3,
.h3__like {
  font-size: 2.4rem;
}
h4,
.h4__like {
  font-size: 2rem;
}
h5,
.h5__like {
  font-size: 1.8rem;
}
h6,
.h6__like {
  font-size: 1.6rem;
}

button {
  background: none;
  border: 0;
}

.container {
  width: 100%;
  max-width: 128rem;
  margin: auto;
}
</style>
