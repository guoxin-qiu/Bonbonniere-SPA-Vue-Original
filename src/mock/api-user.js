import DB from './database'
import { Mock } from './api-mock'
import { ApiUrl } from '../api/api-url'
import Qs from 'qs'
var linq = require('linq')

Mock.onGet(new RegExp(`${ApiUrl.USER}\/\\d+`)).reply(config => {
  const id = Number(config.url.substring(config.url.lastIndexOf('/') + 1))
  const user = linq.from(DB.User.getAll()).first(user => {
    return user.id === id
  })
  return [200, user]
})

Mock.onGet(ApiUrl.USER).reply(config => {
  const searchKey = config.params.searchText.toLowerCase()
  const pageIndex = config.params.pageIndex
  const pageSize = config.params.pageSize
  const sortCol = config.params.sortCol
  const sortOrder = config.params.sortOrder
  console.log(config)
  let users = linq.from(DB.User.getAll()).where(user => {
    return searchKey === '' ||
      user.username.toLowerCase().indexOf(searchKey) > -1 ||
      user.fullName.toLowerCase().indexOf(searchKey) > -1 ||
      user.email.toLowerCase().indexOf(searchKey) > -1
  })
  const totalPageCount = Math.ceil(users.count() / pageSize) || 1
  if (sortOrder === '-') {
    users = users.orderByDescending(user => user[sortCol])
  } else {
    users = users.orderBy(user => user[sortCol])
  }
  users = users.skip(pageSize * (pageIndex - 1)).take(pageSize)
  return [200, {
    users: users.toArray(),
    totalPageCount: totalPageCount
  }]
})

Mock.onPut(new RegExp(`${ApiUrl.USER}\/\\d+`)).reply(config => {
  const id = Number(config.url.substring(config.url.lastIndexOf('/') + 1))
  const user = Qs.parse(config.data)
  DB.User.update(id, user)

  return [200, {
    success: true
  }]
})

Mock.onPost(ApiUrl.USER).reply(config => {
  const user = Qs.parse(config.data)
  return [200, {
    user: DB.User.add(user),
    success: true
  }]
})

Mock.onDelete(new RegExp(`${ApiUrl.USER}\/\\d+`)).reply(config => {
  const id = Number(config.url.substring(config.url.lastIndexOf('/') + 1))
  return [200, {
    user: DB.User.delete(id),
    success: true
  }]
})
