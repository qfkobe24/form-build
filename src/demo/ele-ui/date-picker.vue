<template>
  <div class="input-demo">
    <date-picker></date-picker>
    <date-range-picker></date-range-picker>
    <date-time-picker></date-time-picker>
  </div>
</template>

<script>
import datePicker from './date-picker/date'
import dateRangePicker from './date-picker/date-range'
import dateTimePicker from './date-picker/date-time'
export default {
  components: {
    datePicker,
    dateRangePicker,
    dateTimePicker
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
