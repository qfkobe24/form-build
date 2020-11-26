<template>
  <div class="datetime-picker-demo">
    <base-datetime-picker />
    <format-datetime-picker />
  </div>
</template>

<script>
import baseDatetimePicker from './datetime-picker/base'
import formatDatetimePicker from './datetime-picker/format'
export default {
  components: {
    baseDatetimePicker,
    formatDatetimePicker
  }
}
</script>

<style scoped>
  .datetime-picker-demo .box-card{
    margin: 40px 10px;
  }
</style>
