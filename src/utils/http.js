import axios from 'axios'
import stores from '../store/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = ''
axios.defaults.timeout = 1000 * 15

axios.interceptors.request.use(
  function(config) {
    stores.dispatch('showLoader')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    stores.dispatch('hideLoader')
    return response
  },
  function(error) {
    stores.dispatch('hideLoader')
    return Promise.reject(error)
  }
)

function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

function modify(url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

function remove(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

// RESTful
export default{
  GET: fetch,
  POST: post,
  PUT: modify,
  DELETE: remove
}
