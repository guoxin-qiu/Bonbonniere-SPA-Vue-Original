import axios from 'axios'
import DB from './mock-database'
import md5 from 'js-md5'
import MockAdapter from 'axios-mock-adapter'

require('linqjs')

const uuidv1 = require('uuid/v1')
const testPwdMd5 = md5('admin')

// const Mock = require('mockjs'); Mock.mock('url', 'get', null);
const Mock = new MockAdapter(axios, {
  delayResponse: 2000
})

Mock.onGet('account/login').reply(function(config) {
  const username = config.username
  const password = config.password
  const user = DB.User.getAll().first(function(user) {
    return user.username === username
  })
  const checkSuccess = (user && password === testPwdMd5)
  return [200, {
    token: checkSuccess ? uuidv1() : '',
    loginSuccess: checkSuccess,
    userInfo: user
  }]
})

Mock.onGet('account/menu').reply(200, DB.Menu.getAll().where(menu => menu.IsActive))

Mock.onGet('users').reply(function(config) {
  const searchKey = config.searchText.toLowerCase()
  const pageIndex = config.pageIndex
  const pageSize = config.pageSize
  let users = DB.User.getAll()
  const allusers = users.where(user => {
    return searchKey === '' ||
      user.username.toLowerCase().indexOf(searchKey) > -1 ||
      user.fullName.toLowerCase().indexOf(searchKey) > -1 ||
      user.email.toLowerCase().indexOf(searchKey) > -1
  })
  const totalPageCount = Math.ceil(allusers.length / pageSize) || 1
  users = allusers.orderBy(user => {
    return user.Username
  }).skip(pageSize * (pageIndex - 1)).take(pageSize)
  return [200, {
    success: true,
    users: users,
    totalPageCount: totalPageCount
  }]
})
