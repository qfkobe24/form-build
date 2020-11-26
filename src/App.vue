<template>
  <div>
    <router-link
      class="nav-link"
      v-for="(item, index) in routes"
      :key="'key' + index" 
      :to="item.path"
    >{{ item.path }}</router-link>
    
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
@Component
export default class App extends Vue {
  get showNav() {
    return this.$route.path === '/'
  }

  get routes() {
    const router: any = this.$router
    return router.options.routes
  }
}
</script>

<style>
.nav-link {
  height: 50px;
  margin-right: 20px;
}
</style>
