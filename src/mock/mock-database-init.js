import DB from './mock-database'
import Mock from 'mockjs'
import Auth from '../utils/auth-helper'
const Random = Mock.Random;

(function () {
  'use strict'
  if(!Auth.isAuthenticated()){
    initUser()
    initMenu()
  }
}());

function initUser() {
  function generateUser(){
    let users = [];
    users.push({id:0,username:'admin',fullName:'administrator',email:'admin@sydq.net'})
    for (let i = 1; i <= 10; i++) {
      let firstName = Random.first()
      let user = {
        id: i,
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
  DB.Menu.deleteAll();
  DB.Menu.addRange([{
    Id: 1,
    Text: '主页',
    Url: './index.html',
    IsActive: true
  }, {
    Id: 2,
    Text: '用户管理',
    Url: './user.html',
    IsActive: true
  }, {
    Id: 99,
    Text: 'API',
    Url: './api.html',
    IsActive: true
  }]);
}
