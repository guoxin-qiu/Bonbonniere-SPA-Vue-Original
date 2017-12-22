import DB from './database'
import { Mock } from './api-mock'
import { ApiUrl } from '../api/api-url'

const uuidv1 = require('uuid/v1')
const linq = require('linq')

Mock.onGet(ApiUrl.LOGIN).reply(config => {
  const username = config.params.username
  const password = config.params.password
  const user = linq.from(DB.User.getAll()).firstOrDefault(function(user) {
    return user.username === username
  })
  const checkSuccess = (user && password === user.password)

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

Mock.onGet(ApiUrl.MENU).reply(200, linq.from(DB.Menu.getAll()).where(menu => menu.isActive).toArray())
