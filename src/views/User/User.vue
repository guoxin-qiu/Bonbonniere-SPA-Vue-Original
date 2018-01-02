<template>
  <div>
    <div class="filter-container">
      <div class="col-md-4"></div>
      <div class="input-group col-md-4" style="margin:20px 0;">
        <input type="text" v-model="listQuery.searchText" @keyup.enter="search" class="form-control" placeholder="enter the keyword" />
        <span class="input-group-btn">
          <button class="btn btn-info btn-search" @click="search">Search</button>
          <button class="btn btn-info" style="margin-left:3px;" @click="handleCreate">＋New</button>
        </span>
      </div>
      <div class="col-md-4"></div>
    </div>
    <div class="data-container">
      <div v-if="users.length > 0" class="table-responsive col-md-12">
        <table class="table table-hover">
          <col style="width:30%;" />
          <col style="width:30%;" />
          <col style="width:30%;" />
          <col style="width:10%;" />
          <thead>
            <th v-for="col in columns" :key="col" style="cursor:pointer" @click="sort(col)">{{col | capitalize}}
              <span class="glyphicon glyphicon-arrow-up" v-show="listQuery.sortOrder === '-' && listQuery.sortCol === col"></span>
              <span class="glyphicon glyphicon-arrow-down" v-show="listQuery.sortOrder === '+' && listQuery.sortCol === col"></span>
            </th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td v-for="col in columns" :key="col" v-text="user[col]"></td>
              <td>
                <span class="input-group-btn">
                  <button @click="handleUpdate(user.id)" class="btn btn-info">Edit</button>
                  <button @click="handleDelete(user.id)" class="btn btn-info">Delete</button>
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="text-right">
                <pagination :cur-page-index.sync="listQuery.pageIndex" :total-page-count="totalPageCount" :query-func="_query"></pagination>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div v-else class="alert">No matches found.</div>
    </div>
    <my-dialog v-if="dialogVisible" @close="dialogVisible=false">
      <h3 slot="dialog-header">User Information</h3>
      <div slot="dialog-body">
        <div class="form-group" v-for="col in columns" :key="col">
          <label class="control-label" v-text="col+':'"></label>
          <input v-if="(dialogStatus === 'create') || (dialogStatus==='update' && col!=='username')" v-model="curUser[col]" type="text" class="form-control" />
          <span v-else v-text="curUser[col]" class="form-control" style="background-color:#eee;"></span>
        </div>
      </div>
      <div slot="dialog-footer">
        <span class="input-group-btn">
          <button type="button" v-show="dialogStatus==='create'" @click="createUser" class="btn btn-primary">Save</button>
          <button type="button" v-show="dialogStatus==='update'" @click="updateUser" class="btn btn-primary">Save</button>
          <button type="button" v-show="dialogStatus==='delete'" @click="deleteUser" class="btn btn-primary">Delete</button>
          <button type="button" @click="dialogVisible=false" class="btn btn-primary">Cancel</button>
        </span>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import Pagination from '../../components/Pagination'
  import MyDialog from '../../components/Dialog'

  export default {
    data() {
      return {
        columns: ['username', 'fullName', 'email'],
        users: [],
        listQuery: {
          searchText: '',
          pageSize: 8,
          pageIndex: 1,
          sortCol: 'username',
          sortOrder: '+'
        },
        totalPageCount: 1,

        curUser: {
          id: undefined,
          username: '',
          fullName: '',
          email: ''
        },
        dialogVisible: false,
        dialogStatus: ''
      }
    },
    components: {
      Pagination,
      MyDialog
    },
    filters: {
      capitalize(value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    methods: {
      _query(pageIndex) {
        this.listQuery.pageIndex = pageIndex || this.listQuery.pageIndex
        this.$http.GET(this.$api.USER, {
          searchText: this.listQuery.searchText,
          pageIndex: this.listQuery.pageIndex,
          pageSize: this.listQuery.pageSize,
          sortCol: this.listQuery.sortCol,
          sortOrder: this.listQuery.sortOrder
        }).then(data => {
          this.users = data.users
          this.totalPageCount = data.totalPageCount
        })
      },
      search() {
        this._query(1)
      },
      sort(col) {
        if (this.listQuery.sortCol === col) {
          this.listQuery.sortOrder = this.listQuery.sortOrder === '+' ? '-' : '+'
        } else {
          this.listQuery.sortCol = col
          this.listQuery.sortOrder = '+'
        }
        this._query()
      },

      resetCurUser() {
        this.curUser = {
          id: undefined,
          username: '',
          fullName: '',
          email: ''
        }
      },

      handleCreate() {
        this.resetCurUser()
        this.dialogStatus = 'create'
        this.dialogVisible = true
      },
      createUser() {
        const user = { username: this.curUser.username, fullName: this.curUser.fullName, email: this.curUser.email }
        this.$http.POST(this.$api.USER, user)
        .then(response => {
          this.users.unshift(response.user)
          this.dialogVisible = false
          this.notify({ title: '', message: 'create successful', type: 'info', duration: '' })
        })
      },

      handleUpdate(userId) {
        this.dialogStatus = 'update'
        this.dialogVisible = true
        this.resetCurUser()
        this.$http.GET(this.$api.USER, { id: userId })
        .then(data => {
          this.curUser = data || this.curUser // this.curUser = Object.assign({}, response.user)
        })
      },
      updateUser() {
        const user = { username: this.curUser.username, fullName: this.curUser.fullName, email: this.curUser.email }
        this.$http.PUT(this.$api.USER, this.curUser.id, user)
        .then(() => {
          for (const user of this.users) {
            if (user.id === this.curUser.id) {
              const index = this.users.indexOf(user)
              this.users.splice(index, 1, this.curUser)
              break
            }
          }
          this.notify({ title: '', message: 'update successful', type: 'warning', duration: '' })
          this.dialogVisible = false
        })
      },

      handleDelete(userId) {
        this.dialogStatus = 'delete'
        this.dialogVisible = true
        this.resetCurUser()

        this.$http.GET(this.$api.USER, { id: userId })
        .then(data => {
          this.curUser = data || this.curUser
        })
      },
      deleteUser() {
        this.$http.DELETE(this.$api.USER, this.curUser.id)
        .then(() => {
          for (const user of this.users) {
            if (user.id === this.curUser.id) {
              const index = this.users.indexOf(user)
              this.users.splice(index, 1)
              break
            }
          }
          this.notify({ title: '', message: 'delete successful', type: 'success', duration: '' })
          this.dialogVisible = false
        })
      },
      notify(msg) {
        console.log(`title: ${msg.title}, message: ${msg.message}, type: ${msg.type}`) // TODO: make it component
      }
    },
    created() {
      this._query()
    }
  }

</script>

<style>
  .table tbody tr td {
    vertical-align: middle
  }

  .table thead th {
    text-align: center
  }

</style>
