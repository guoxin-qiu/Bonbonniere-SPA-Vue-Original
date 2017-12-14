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

  return {
    getMaxId: function(list) {
      let maxId = 1
      for (let i = 0; i < list.length; i++) {
        maxId = maxId > list[i].Id ? maxId : list[i].Id
      }
      return maxId
    },
    add: function(item) {
      const list = this.getAll()
      item.Id = this.getMaxId(list) + 1
      list.push(item)
      _setStorage(list)
    },
    addRange: function(itemArray) {
      const list = this.getAll()
      const newId = this.getMaxId(list) + 1
      for (let i = 0; i < itemArray.length; i++) {
        itemArray[i].Id = newId + i
        list.push(itemArray[i])
      }
      _setStorage(list)
    },
    update: function(id, itemForUpdate) {
      const list = this.getAll()
      for (let i = 0; i < list.length; i++) {
        if (list[i].Id === id) {
          list[i] = itemForUpdate
          break
        }
      }
      _setStorage(list)
    },
    delete: function(id) {
      const list = this.getAll()
      for (let i = 0; i < list.length; i++) {
        if (list[i].Id === id) {
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
