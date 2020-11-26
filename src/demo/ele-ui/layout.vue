<template>
  <div class="layout-demo">
    <col-layout />
    <label-layout />
  </div>
</template>

<script>
import colLayout from './layout/col-layout'
import labelLayout from './layout/label-layout'
export default {
  components: {
    colLayout,
    labelLayout
  }
}
</script>

<style>
  .layout-demo .box-card{
    margin: 40px 10px;
  }
</style>