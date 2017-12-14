<template>
  <div>
    <div class="col-md-4"></div>
    <div class="input-group col-md-4" style="margin:20px 0;">
      <input type="text" v-model="searchTextLive" @keyup.enter="search" class="form-control" placeholder="enter the keyword" />
      <span class="input-group-btn">
        <button class="btn btn-info btn-search" @click="search">Search</button>
        <button class="btn btn-info" style="margin-left:3px;">＋New</button>
      </span>
    </div>
    <div class="col-md-4"></div>
    <div v-if="users.length > 0" class="table-responsive col-md-12">
      <table class="table table-hover">
        <col style="width:30%;" />
        <col style="width:30%;" />
        <col style="width:30%;" />
        <col style="width:10%;" />
        <thead>
          <th v-for="col in columns" :key="col" v-text="col"></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-for="col in columns" :key="col" v-text="user[col]"></td>
            <td>
              <span class="input-group-btn">
                <button class="btn btn-info">查看详情</button>
              </span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
              <pagination :cur-page-index.sync="pageIndex" :total-page-count="totalPageCount" :query-func="_query"></pagination>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="alert">暂无数据！</div>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination'
import Api from '../../utils/api'

export default{
  data() {
    return {
      columns: ['username', 'fullName', 'email'],
      users: [],
      curUser: {},
      originalUser: {},
      showModal: false,
      isNew: false,
      isEditing: false,

      searchText: '',
      searchTextLive: '',
      totalPageCount: 1,
      pageSize: 2,
      pageIndex: 1
    }
  },
  components: {
    Pagination
  },
  methods: {
    _query(pageIndex) {
      var _self = this
      pageIndex = pageIndex || _self.pageIndex
      Api.getUsers({
        searchText: _self.searchText,
        pageIndex: pageIndex,
        pageSize: _self.pageSize
      }).then(function(response) {
        if (response.success) {
          _self.users = response.users
          _self.totalPageCount = response.totalPageCount
          _self.pageIndex = pageIndex
        }
      })
    },
    search() {
      this.searchText = this.searchTextLive
      this._query(1)
    }
  },
  created() {
    this._query()
  }
}
</script>

<style>
  .table tbody tr td{
    vertical-align:middle
  }
  .table thead th{
    text-align: center
  }
</style>
