import md5 from 'js-md5'
require('linqjs')
import DB from './database'
import { Mock } from './api-mock'
import { ApiUrl } from '../api/api-url'

const uuidv1 = require('uuid/v1')
const testPwdMd5 = md5('admin')

Mock.onGet(ApiUrl.LOGIN).reply(config => {
  const username = config.username
  const password = config.password
  const user = DB.User.getAll().first(function(user) {
    return user.username === username
  })
  const checkSuccess = (user && password === testPwdMd5)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {
        token: checkSuccess ? uuidv1() : '',
        loginSuccess: checkSuccess,
        userInfo: user
      }])
    }, 3333)
  })
})

Mock.onGet(ApiUrl.MENU).reply(200, DB.Menu.getAll().where(menu => menu.IsActive))
