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
            <li><a v-text="fullName"></a></li>
            <li><button @click="logoff" class="btn btn-link navbar-btn navbar-link">Logoff</button></li>
          </ul>
      </div>
    </div>
  </nav>
</div>
</template>
<style>
.navbar-inverse {
  background-color: white;
}
</style>

<script>
import api from "../utils/api";
export default {
  data() {
    return {
      menus: [],
      fullName: api.getLoginFullName()
    };
  },
  methods: {
    logoff() {
      api.logoff();
      this.$router.push({ path: "/login" });
    }
  },
  beforeCreate() {
    let _self = this;
    api.getMenu().then(function(data) {
      _self.$data.menus = data;
    });
  }
};
</script>
