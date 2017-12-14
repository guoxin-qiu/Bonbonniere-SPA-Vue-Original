<template>
  <div id="app-footer" name="app-footer" class="text-center">
      <footer><p v-html="footerMessage"></p></footer>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        footerMessage: '&copy; 2017 - Bonbonniere'
      }
    }
  }
</script>
