let storage = window.sessionStorage //window.localStorage
let authKey = '$AUTHENTICATION'

function setAuthentication(token, userInfo, rememberMe) {
  if (!token) {
    throw new Error('Token can not be null.')
  }
  let authInfo = {
    token: token,
    userInfo: {
      username: userInfo.username,
      fullName: userInfo.fullName,
      email: userInfo.email
    }
  }
  storage.setItem(authKey, JSON.stringify(authInfo))
}

function removeAuthentication() {
  storage.removeItem(authKey)
}

function isAuthenticated() {
  return !!retrieveAuthentication().token
}

function fullName(){
  return retrieveAuthentication().userInfo.fullName
}

function retrieveAuthentication() {
  try {
    let authInfo = storage.getItem(authKey)
    if (authInfo) {
      return JSON.parse(authInfo)
    } else {
      return {
        token: '',
        userInfo: {
          username: '',
          fullName: '',
          email: ''
        }
      }
    }
  } catch (ex) {
    throw new Error(ex)
  }
}

export default {
  setAuthentication: setAuthentication,
  removeAuthentication: removeAuthentication,
  isAuthenticated: isAuthenticated,
  fullName: fullName
}
