<!--
<pagination :cur-page-index.sync="1" :total-page-count="3" :search-method="_query"></pagination>
-->
<template>
  <ul class="pagination" v-if="totalPageCount>0">
    <li @click="goto(1)" :class="{disabled: curPageIndex==1}">
      <a href="javascript:;">&lt;&lt;</a>
    </li>
    <li @click="goto(curPageIndex-1)" :class="{disabled: curPageIndex==1}">
      <a href="javascript:;">&lt;</a>
    </li>
    <li @click="goto(pageIndex)" v-for="pageIndex in pagesShow" :key="pageIndex" :class="{active: curPageIndex==pageIndex}">
      <a href="javascript:;" v-text="pageIndex"></a>
    </li>
    <li @click="goto(curPageIndex+1)" :class="{disabled: curPageIndex==totalPageCount}">
      <a href="javascript:;">&gt;</a>
    </li>
    <li @click="goto(totalPageCount)" :class="{disabled: curPageIndex==totalPageCount}">
      <a href="javascript:;">&gt;&gt;</a>
    </li>
  </ul>
</template>

<script>
export default{
  data() {
    return {
      capacity: 5
    }
  },
  props: {
    totalPageCount: {
      type: Number,
      required: true
    },
    queryFunc: {
      type: Function,
      required: true
    },
    curPageIndex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pagesShow() {
      const pages = []
      let minPageIndexToShow = 1
      let maxPageIndexToShow = this.totalPageCount
      if (this.curPageIndex < this.capacity) {
        minPageIndexToShow = 1
        maxPageIndexToShow = Math.min(this.capacity, this.totalPageCount)
      } else {
        maxPageIndexToShow = Math.min((this.curPageIndex + Math.floor(this.capacity / 2)), this.totalPageCount)
        minPageIndexToShow = maxPageIndexToShow - this.capacity + 1
      }
      for (let i = minPageIndexToShow; i <= maxPageIndexToShow; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  methods: {
    goto(index) {
      if (index < 1 || index > this.totalPageCount || index === this.curPageIndex) return
      this.$emit('update:curPageIndex', index)
      this.queryFunc(index)
    }
  }
}
</script>
