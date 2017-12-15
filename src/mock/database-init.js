import DB from './database'
import Mock from 'mockjs'
import Auth from '../utils/auth'
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
      fullName: 'administrator',
      email: 'admin@sydq.net'
    })
    for (let i = 1; i <= 35; i++) {
      const firstName = Random.first()
      const user = {
        username: firstName,
        fullName: `${firstName} ${Random.last()}`,
        email: `${firstName}@sydq.net`
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
    Text: 'HOME',
    Url: '/home',
    IsActive: true
  }, {
    Text: 'USER',
    Url: '/user',
    IsActive: true
  }, {
    Text: 'API',
    Url: '/api',
    IsActive: false
  }])
}
