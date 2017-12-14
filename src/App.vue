<template>
  <div id="app">
    <loading v-show="showLoading"></loading>
    <app-header v-if="$isAuthenticated()"></app-header>
    <div class="container">
      <div>
        <router-view/>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from './components/Header'
import AppFooter from './components/Footer'
import Loading from './components/Loading'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      showLoading: 'showLoading'
    })
  },
  components: {
    AppHeader,
    AppFooter,
    Loading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #879659;
  padding-top: 50px;
  padding-bottom: 20px;
}
</style>
