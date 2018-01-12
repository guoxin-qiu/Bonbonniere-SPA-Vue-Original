<template>
  <div>
    <h1>403 Forbidden! You do not have access rights to that content.</h1>
    <h2>path: {{path}}</h2>
  </div>
</template>
<<script>
export default {
  data() {
    return {
      path: decodeURIComponent(this.$route.query.path)
    }
  }
}
</script>

