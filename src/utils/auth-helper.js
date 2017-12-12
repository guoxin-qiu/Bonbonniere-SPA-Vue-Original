var storage = window.sessionStorage; //window.localStorage;
var userInfoKey = '$userInfo';

function getUserInfo() {
    try {
        var user = storage.getItem(userInfoKey);
        if (user) {
            return JSON.parse(user);
        } else {
            return {
                username: '',
                fullName: '',
                email: ''
            };
        }

    } catch (ex) {
        throw new Error(ex);
    }
}

function setUserInfo(userInfo) {
    if (!userInfo) {
        throw new Error('Argument can not be null.');
    }
    var user = {
        username: userInfo.username,
        fullName: userInfo.fullName,
        email: userInfo.email
    };
    storage.setItem(userInfoKey, JSON.stringify(user));
}

function removeUserInfo() {
    storage.removeItem(userInfoKey);
}

function isAuthenticated(){
  return this.getUserInfo().username.length > 0;
}

export default {
    setUserInfo: setUserInfo,
    getUserInfo: getUserInfo,
    removeUserInfo: removeUserInfo,
    isAuthenticated: isAuthenticated
}
