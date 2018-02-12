<!--
eg.
-->
<template id="simple-grid-template">
<div class="table-responsive col-md-12">
  <table v-if="sortedData && sortedData.length > 0" >
    <thead>
      <tr>
        <th v-for="col in gridConfig.columns" :key="col.name" @click="sortBy(col.name)" :class="{active: sortCol === col.name}" :style="{width: col.width}">
            {{col.title}}
            <span class="arrow" v-show="sortCol === col.name" :class="sortOrder == '+' ? 'asc': 'desc'"></span>
        </th>
        <th v-if="gridConfig.operation" :style="{width: gridConfig.operation.width}">{{gridConfig.operation.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in sortedData" :key="entry[0]">
        <td v-for="col in gridConfig.columns" :key="col.name">
            <span v-if="col.isLink"><a href="javascript:;" @click="edit(entry[gridConfig.key])">{{entry[col.name]}}</a></span>
            <span v-else>{{entry[col.name]}}</span>
        </td>
        <td class="text-center" v-if="gridConfig.operation">
            <button class="btn-info" v-if="gridConfig.operation.canEdit" @click="edit(entry[gridConfig.key])">Edit</button>
            <button class="btn-danger" v-if="gridConfig.operation.canDelete" @click="deleteItem(entry[gridConfig.key])">delete</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="gridConfig.columns.length+(gridConfig.operation?1:0)" class="text-right">
          <pagination :cur-page-index.sync="searchQuery.pageIndex" :total-page-count="totalPageCount" :query-func="_query"></pagination>
        </td>
      </tr>
    </tfoot>
  </table>
  <div v-else class="alert">No matches found.</div>
</div>
</template>
<script>
import Pagination from './Pagination'

export default {
  props: {
    gridConfig: {},
    searchQuery: {}
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      totalPageCount: 0,
      sortCol: '',
      sortOrder: '+',
      sortedData: []
    }
  },
  components: {
    Pagination
  },
  watch: {
    searchQuery: {
      handler: function(val, oldVal) {
        this._query()
      },
      deep: true
    }
  },
  methods: {
    _query: _.debounce(function() {
      var queryParams = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        sortCol: this.sortCol,
        sortOrder: this.sortOrder
      }
      for (var name in this.searchQuery) {
        queryParams[name] = this.searchQuery[name]
      }
      this.$http.GET(this.gridConfig.restUrl, queryParams).then(data => {
        this.sortedData = data.users
        this.totalPageCount = data.totalPageCount
      })
    }, 500),
    sortBy(colName) {
      if (this.sortCol === colName) {
        this.sortOrder = this.sortOrder === '+' ? '-' : '+'
      } else {
        this.sortCol = colName
        this.sortOrder = '+'
      }
      this._query()
    },
    edit(key) {
      alert(`edit ${key}`)
    },
    deleteItem(key) {
      alert(`delete ${key}`)
    }
  },
  created() {
    this._query()
  }
}
</script>
<style scoped>
table,
td,
th {
	border-collapse: collapse;
	border-spacing: 0
}

table {
	width: 100%;
}

td,
th {
	border: 1px solid #bcbcbc;
	padding: 5px 10px;
}

th {
	padding: 10px;
	font-weight: 400;
	color: #fff;
	background: #0090d3;
	cursor: pointer;
  text-align: center;
}

th.active {
  color: #fff;
  font-weight: bold;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.desc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

tr:nth-of-type(odd) {
	background: #fff
}

tr:nth-of-type(even) {
	background: #eee
}
</style>

