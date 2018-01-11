import DB from './database'
import Mock from 'mockjs'
import Auth from '../utils/auth'
import md5 from 'js-md5'
const Random = Mock.Random;

(function() {
  'use strict'
  if (!Auth.isAuthenticated()) {
    initUser()
    initMenu()
  }
}())

function initUser() {
  function generateUser() {
    const users = []
    users.push({
      username: 'admin',
      fullName: 'Administrator',
      password: md5('admin'),
      email: 'admin@sydq.net'
    })
    for (let i = 1; i <= 35; i++) {
      const firstName = Random.first()
      const user = {
        username: firstName.toLowerCase() + i,
        fullName: `${firstName} ${Random.last()}`,
        password: md5('admin'),
        email: `${firstName.toLowerCase() + i}@sydq.net`
      }
      users.push(user)
    }
    return users
  }
  DB.User.deleteAll()
  DB.User.addRange(generateUser())
}

function initMenu() {
  DB.Menu.deleteAll()
  DB.Menu.addRange([{
    text: 'HOME',
    url: '/home',
    isActive: true
  }, {
    text: 'USER',
    url: '/user',
    isActive: true
  }, {
    text: 'USER2',
    url: '/user2',
    isActive: true
  }, {
    text: 'API',
    url: '/api',
    isActive: false
  }])
}
