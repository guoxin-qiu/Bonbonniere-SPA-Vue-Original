import Http from './http'
import auth from '../utils/auth'
import md5 from 'js-md5'

function login(username, password, rememberMe) {
  return Http.fetch('account/login', {
    username: username,
    password: md5(password)
  }).then(data => {
    if (data.loginSuccess) {
      auth.setAuthentication(data.token, data.userInfo, rememberMe)
    }
    return data.loginSuccess
  })
}

function logoff(){
  auth.removeAuthentication()
}

function getLoginFullName(){
  return auth.fullName()
}



function getMenu() {
  return Http.fetch('account/menu')
}

export default {
  login: login,
  logoff: logoff,
  getLoginFullName: getLoginFullName,

  getMenu: getMenu
}
