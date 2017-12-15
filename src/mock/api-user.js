require('linqjs')
import DB from './database'
import { Mock } from './api-mock'
import { ApiUrl } from '../api/api-url'

Mock.onGet(ApiUrl.USER).reply(config => {
  if (config.id) {
    const user = DB.User.getAll().first(user => {
      return user.id === config.id
    })

    return [200, {
      success: true,
      user: user
    }]
  } else {
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
      return user.username
    }).skip(pageSize * (pageIndex - 1)).take(pageSize)
    return [200, {
      success: true,
      users: users,
      totalPageCount: totalPageCount
    }]
  }
})

Mock.onPut(ApiUrl.USER).reply(config => {
  const { user } = JSON.parse(config.data)
  DB.User.update(user.id, user)

  return [200, {
    success: true
  }]
})

Mock.onPost(ApiUrl.USER).reply(config => {
  const { user } = JSON.parse(config.data)
  return [200, {
    user: DB.User.add(user),
    success: true
  }]
})

Mock.onDelete(ApiUrl.USER).reply(config => {
  return [200, {
    user: DB.User.delete(config.id),
    success: true
  }]
})
