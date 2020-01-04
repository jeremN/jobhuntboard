<template>
  <div class="container home">
    <h1>Keep track of your job search</h1>
    <p>Organize your job search by tracking leads and staying on top of the hunt.</p>
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
</style>
