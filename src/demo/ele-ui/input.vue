<template>
  <div class="input-demo">
    <base-input />
    <event-input />
  </div>
</template>

<script>
import baseInput from './input/base'
import eventInput from './input/event'
export default {
  components: {
    baseInput,
    eventInput
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
