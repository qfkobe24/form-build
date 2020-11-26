<template>
  <div class="input-number-demo">
    <base-input-number />
    <!-- <event-input-number /> -->
  </div>
</template>

<script>
import baseInputNumber from './input-number/base'
// import eventInput from './input-number/event'
export default {
  components: {
    baseInputNumber,
    // eventInput
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
