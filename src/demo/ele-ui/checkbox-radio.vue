<template>
  <div class="checkbox-demo">
    <base-checkbox />
    <button-checkbox />
    <option-slot-checkbox />
    <base-radio />
    <button-radio />
    <option-slot-radio />
  </div>
</template>

<script>
import baseCheckbox from './checkbox/base'
import buttonCheckbox from './checkbox/button'
import optionSlotCheckbox from './checkbox/option-slot'
import baseRadio from './radio/base'
import buttonRadio from './radio/button'
import optionSlotRadio from './radio/option-slot'
export default {
  components: {
    baseCheckbox,
    buttonCheckbox,
    optionSlotCheckbox,
    baseRadio,
    buttonRadio,
    optionSlotRadio
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
