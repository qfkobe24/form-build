<template>
  <div class="checkbox-demo">
    <layout-checkbox />
    <custom-slot-checkbox></custom-slot-checkbox>
    <popup-checkbox></popup-checkbox>
  </div>
</template>

<script>
import layoutCheckbox from './checkbox/layout'
import customSlotCheckbox from './checkbox/custom-slot'
import popupCheckbox from './checkbox/popup'
export default {
  components: {
    layoutCheckbox,
    customSlotCheckbox,
    popupCheckbox
  }
}
</script>

<style scoped>
  .checkbox-demo .box-card{
    margin: 40px 10px;
  }
</style>
