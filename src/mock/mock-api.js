import axios from 'axios'
require('linqjs')
import DB from './mock-database'
import md5 from 'js-md5'
const testPwdMd5 = md5('admin')

import MockAdapter from 'axios-mock-adapter'
// const Mock = require('mockjs'); Mock.mock('url', 'get', null);
const Mock = new MockAdapter(axios,{ delayResponse: 2000 })

Mock.onGet('account/login').reply(function(config){
  let username = config.username, password = config.password
  let user = DB.User.getAll().first(function(user){
    return user.username === username
  })
  return [200, { loginSuccess: (user && password === testPwdMd5), userInfo: user}]
})

Mock.onGet('account/menu').reply(200,DB.Menu.getAll())
