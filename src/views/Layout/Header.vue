<template>
  <div id="app-header" name="app-header">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/" class="navbar-brand">Bonbonniere</router-link>
        </div>
        <div class="navbar-collapse collapse" id="navigation-menu">
          <ul class="nav navbar-nav">
            <li v-for="(menu,index) in menus" :key="index">
              <router-link :to="menu.Url" v-text="menu.Text"></router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a v-text="fullName"></a>
            </li>
            <li>
              <button @click="logoff" class="btn btn-link navbar-btn navbar-link">Logoff</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import auth from '../../utils/auth'
  export default {
    data() {
      return {
        menus: [],
        fullName: auth.fullName()
      }
    },
    methods: {
      logoff() {
        auth.removeAuthentication()
        this.$router.push({ path: '/login' })
      }
    },
    beforeCreate() {
      this.$http.GET(this.$api.MENU)
      .then(data => {
        this.$data.menus = data
      })
    }
  }
</script>

<style>
  .navbar-inverse {
    background-color: #366d88;
    border-color: #366d88;
  }
</style>
