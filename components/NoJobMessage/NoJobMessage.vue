<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
div {
  margin: 0;
  padding: 0;
  text-align: left;
}
</style>
