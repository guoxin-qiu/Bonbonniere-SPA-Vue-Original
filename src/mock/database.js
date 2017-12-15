function Repository(storageKey, jsonKey) {
  const storage = window.localStorage

  const _getStorage = function() {
    const listStr = storage.getItem(storageKey)
    if (!listStr) {
      return JSON.parse('{"' + jsonKey + '":[]}')
    }
    try {
      return JSON.parse(listStr)
    } catch (ex) {
      throw ex
    }
  }
  const _setStorage = function(list) {
    var table = JSON.parse('{"' + jsonKey + '":[]}')
    table[jsonKey] = list
    storage.setItem(storageKey, JSON.stringify(table))
  }

  let maxId = 0

  return {
    getNewId() {
      return ++maxId
    },
    getMaxId: function(list) {
      let maxId = 1
      for (let i = 0; i < list.length; i++) {
        maxId = maxId > list[i].id ? maxId : list[i].id
      }
      return maxId
    },
    add: function(item) {
      const list = this.getAll()
      item.id = this.getNewId()
      list.push(item)
      _setStorage(list)
      return item
    },
    addRange: function(itemArray) {
      const list = this.getAll()
      for (let i = 0; i < itemArray.length; i++) {
        itemArray[i].id = this.getNewId()
        list.push(itemArray[i])
      }
      _setStorage(list)
    },
    update: function(id, itemForUpdate) { // TODO: need param 'id'?
      const list = this.getAll()
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list[i] = itemForUpdate
          break
        }
      }
      _setStorage(list)
    },
    delete: function(id) {
      const list = this.getAll()
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
      _setStorage(list)
    },
    deleteAll: function() {
      _setStorage([])
    },
    getAll: function() {
      return _getStorage()[jsonKey]
    },
    any: function() {
      return this.getAll().length > 0
    }
  }
}

export default {
  User: new Repository('database-user', 'users'),
  Menu: new Repository('database-menu', 'menus')
}
