const storage = window.sessionStorage // window.localStorage
const authKey = '$AUTHENTICATION'

function setAuthentication(token, userInfo, rememberMe) {
  if (!token) {
    throw new Error('Token can not be null.')
  }
  const authInfo = {
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

function fullName() {
  return retrieveAuthentication().userInfo.fullName
}

function getToken() {
  return retrieveAuthentication().userInfo.token
}

function retrieveAuthentication() {
  try {
    const authInfo = storage.getItem(authKey)
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
  fullName: fullName,
  getToken: getToken
}
