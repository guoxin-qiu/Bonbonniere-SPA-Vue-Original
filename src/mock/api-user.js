import DB from './database'
import { Mock } from './api-mock'
import { ApiUrl } from '../api/api-url'
var linq = require('linq')

Mock.onGet(ApiUrl.USER).reply(config => {
  if (config.id) {
    const user = linq.from(DB.User.getAll()).first(user => {
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
    const sortCol = config.sortCol
    const sortOrder = config.sortOrder
    let users = linq.from(DB.User.getAll()).where(user => {
      return searchKey === '' ||
        user.username.toLowerCase().indexOf(searchKey) > -1 ||
        user.fullName.toLowerCase().indexOf(searchKey) > -1 ||
        user.email.toLowerCase().indexOf(searchKey) > -1
    })
    const totalPageCount = Math.ceil(users.count() / pageSize) || 1
    console.log(sortCol)
    console.log(sortOrder)
    if (sortOrder === '-') {
      users = users.orderByDescending(user => user[sortCol])
    } else {
      users = users.orderBy(user => user[sortCol])
    }
    console.log(users)
    users = users.skip(pageSize * (pageIndex - 1)).take(pageSize)
    return [200, {
      success: true,
      users: users.toArray(),
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
