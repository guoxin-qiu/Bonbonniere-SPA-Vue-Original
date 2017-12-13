import Http from './http'

function checkLogin(username, password) {
  return Http.fetch('account/login', {
    username: username,
    password: password
  });
}
function getMenu(){
  return Http.fetch('account/menu')
}

export default {
  checkLogin: checkLogin,
  getMenu: getMenu
}
