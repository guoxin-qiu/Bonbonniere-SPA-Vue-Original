<template>
      <div class="form-bg">
        <div class="container">
            <div class="col-md-offset-3 col-md-6" id="app">
                <form class="form-horizontal">
                    <span class="heading">Login Form</span>
                    <div class="form-group">
                        <input type="email" name="username" class="form-control" v-model="username" placeholder="please enter username">
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" v-model="password" placeholder="please enter password">
                    </div>
                    <div class="form-group">
                        <div class="main-checkbox">
                            <input type="checkbox" id="ckRememberMe" name="rememberMe" v-model="rememberMe"/>
                            <label for="ckRememberMe"></label>
                        </div>
                        <span class="text">Remember me？</span>
                        <button type="button" @click="login" name="SubmitLogon" class="btn btn-default">Login</button>
                    </div>
                    <div class="form-group" v-text="message"></div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import api from '../utils/api'
import auth from '../utils/auth-helper'
import md5 from 'js-md5'
export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      message: ""
    }
  },
  methods: {
    login: function() {
      var _self = this
      if (_self.username.length == 0 || _self.password.length == 0) {
        _self.message = "username or password can not be empty."
        return
      }
      api.checkLogin(_self.username, md5(_self.password)) // TODO: remenberMe??
      .then(function(data){
        if (data.loginSuccess) {
            auth.setUserInfo(data.userInfo)
            let redirectUrl = decodeURIComponent(_self.$route.query.redirect || '/')
            _self.$router.push({path: redirectUrl})
            _self.$global.isAuthenticated = true
          } else {
            _self.message = "username or password is not correct, please try again."
          }
      });
    }
  }
};
</script>
<style scoped>
@import url("../assets/login.css");
</style>

