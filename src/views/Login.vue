<template>
  <div class="form-bg">
    <div class="col-md-offset-3 col-md-6">
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
            <input type="checkbox" id="ckRememberMe" name="rememberMe" v-model="rememberMe" />
            <label for="ckRememberMe"></label>
          </div>
          <span class="text">Remember me？</span>
          <button type="button" @click="login" name="SubmitLogon" class="btn btn-default">Login</button>
        </div>
        <div class="form-group" v-text="message"></div>
      </form>
    </div>
  </div>
</template>

<script>
  import auth from '../utils/auth'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false,
        message: ''
      }
    },
    methods: {
      login() {
        if (this.username.length === 0 || this.password.length === 0) {
          this.message = 'username or password can not be empty.'
          return
        }
        this.$http.GET(this.$api.LOGIN, {
          username: this.username,
          password: md5(this.password),
          rememberMe: this.rememberMe })
        .then(data => {
          if (data.loginSuccess) {
            this.$store.state.token = data.token
            auth.setAuthentication(data.token, data.userInfo, this.rememberMe)
            const redirectUrl = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({ path: redirectUrl })
          } else {
            this.message = 'username or password is not correct, please try again.'
          }
        })
      }
    }
  }
</script>

<style scoped>
  .form-bg {
    background: #fff;
    padding: 100px 0;
  }

  .form-horizontal {
    background: #366d88;
    padding-bottom: 40px;
    border-radius: 15px;
    text-align: center;
  }

  .form-horizontal .heading {
    display: block;
    font-size: 35px;
    font-weight: 700;
    padding: 35px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 30px;
  }

  .form-horizontal .form-group {
    padding: 0 40px;
    margin: 0 0 25px 0;
    position: relative;
  }

  .form-horizontal .form-control {
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    padding: 0 20px 0 45px;
    height: 40px;
    transition: all 0.3s ease 0s;
  }

  .form-horizontal .form-control:focus {
    background: #e0e0e0;
    box-shadow: none;
    outline: 0 none;
  }

  .form-horizontal .form-group i {
    position: absolute;
    top: 12px;
    left: 60px;
    font-size: 17px;
    color: #c8c8c8;
    transition: all 0.5s ease 0s;
  }

  .form-horizontal .form-control:focus+i {
    color: #00b4ef;
  }

  .form-horizontal .main-checkbox {
    float: left;
    width: 20px;
    height: 20px;
    background: #7889b9;
    border-radius: 50%;
    position: relative;
    margin: 5px 0 0 5px;
    border: 1px solid #7889b9;
  }

  .form-horizontal .main-checkbox label {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .form-horizontal .main-checkbox label:after {
    content: "";
    width: 10px;
    height: 5px;
    position: absolute;
    top: 5px;
    left: 4px;
    border: 3px solid #fff;
    border-top: none;
    border-right: none;
    background: transparent;
    opacity: 0;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .form-horizontal .main-checkbox input[type="checkbox"] {
    visibility: hidden;
  }

  .form-horizontal .main-checkbox input[type="checkbox"]:checked+label:after {
    opacity: 1;
  }

  .form-horizontal .text {
    float: left;
    margin-left: 7px;
    line-height: 20px;
    padding-top: 5px;
    text-transform: capitalize;
  }

  .form-horizontal .btn {
    float: right;
    font-size: 14px;
    font-weight: bold;
    color: #0000009c;
    background: #7889b9;
    /*border-radius: 30px;*/
    padding: 10px 25px;
    border: none;
    text-transform: capitalize;
    transition: all 0.5s ease 0s;
    outline: none;
  }
</style>
