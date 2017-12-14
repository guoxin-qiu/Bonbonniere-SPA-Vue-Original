import Http from './http'
import auth from '../utils/auth'
import md5 from 'js-md5'

const API_URL = {
  GetUser: 'user'
}

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

function logoff() {
  auth.removeAuthentication()
}

function getLoginFullName() {
  return auth.fullName()
}

function getMenu() {
  return Http.fetch('account/menu')
}

function getUsers(params) {
  return Http.fetch('users', params)
}

function getUser(params) {
  return Http.fetch('user', params)
}

function updateUser(params) {
  return Http.fetch('user/update', params) // TODO: RESTFul
}

function createUser(params) {
  return Http.fetch('user/create', params)
}

function deleteUser(params) {
  return Http.fetch('user/delete', params)
}

export default {
  API_URL: API_URL,
  login: login,
  logoff: logoff,
  getLoginFullName: getLoginFullName,
  getMenu: getMenu,
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  createUser: createUser,
  deleteUser: deleteUser
}
