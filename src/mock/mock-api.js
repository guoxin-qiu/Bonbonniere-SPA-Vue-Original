import axios from 'axios'
require('linqjs')
import DB from './mock-database'
import md5 from 'js-md5'

const uuidv1 = require('uuid/v1');
const testPwdMd5 = md5('admin')

import MockAdapter from 'axios-mock-adapter'
// const Mock = require('mockjs'); Mock.mock('url', 'get', null);
const Mock = new MockAdapter(axios,{ delayResponse: 2000 })

Mock.onGet('account/login').reply(function(config){
  let username = config.username, password = config.password
  let user = DB.User.getAll().first(function(user){
    return user.username === username
  })
  let checkSuccess = (user && password === testPwdMd5)
  return [200, {token: checkSuccess? uuidv1() : '', loginSuccess: checkSuccess, userInfo: user}]
})

Mock.onGet('account/menu').reply(200,DB.Menu.getAll())
