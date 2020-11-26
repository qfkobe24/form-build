<template>
  <div class="field-demo">
    <text-field />
    <textrea-field />
  </div>
</template>

<script>
import textField from './field/text'
import textreaField from './field/text-area'
export default {
  components: {
    textField,
    textreaField
  }
}
</script>

<style scoped>
  .field-demo .box-card{
    margin: 40px 10px;
  }
</style>
