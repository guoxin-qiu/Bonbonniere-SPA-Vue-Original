import axios from 'axios'
import stores from '../store/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

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

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default{
  fetch(url, params) {
    return fetch(url, params)
  },
  post(url, params) {
    return post(url, params)
  }
}
