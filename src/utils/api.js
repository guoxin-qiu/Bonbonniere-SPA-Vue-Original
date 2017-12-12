import Http from './http'

function checkLogin(username, password) {
  return Http.fetch('account/login', {
    username: username,
    password: password
  });
}

export default {
  checkLogin: checkLogin
}
