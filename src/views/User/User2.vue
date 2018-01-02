<template>
  <div>
    <div class="filter-container">
      <div class="col-md-4"></div>
      <div class="input-group col-md-4" style="margin:20px 0;">
        <input type="text" v-model="listQuery.searchText" class="form-control" placeholder="enter the keyword" />
        <span class="input-group-btn">
        </span>
      </div>
      <div class="col-md-4"></div>
    </div>
    <simple-grid ref="usrLst" :search-query="listQuery" :grid-config="gridConfig"></simple-grid>
  </div>
</template>

<script>
  import SimpleGrid from '../../components/SimpleGrid'

  export default {
    data() {
      return {
        gridConfig: {
          key: 'id',
          restUrl: this.$api.USER,
          columns: [
            { name: 'username', title: 'Username', width: '20%', isLink: true },
            { name: 'fullName', title: 'FullName', width: '30%' },
            { name: 'email', title: 'Email', width: '30%' }
          ],
          operation: { title: 'Operation', width: '20%', canEdit: true, canDelete: true }
        },
        listQuery: {
          searchText: ''
        }
      }
    },
    components: {
      SimpleGrid
    }
  }

</script>
