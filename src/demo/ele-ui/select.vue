<template>
  <div class="select-demo">
    <base-select />
    <object-value-select />
    <option-slot-select />
    <remote-select />
    <group-select />
  </div>
</template>

<script>
import baseSelect from './select/base'
import objectValueSelect from './select/object-value'
import optionSlotSelect from './select/option-slot'
import remoteSelect from './select/remote'
import groupSelect from './select/group'
export default {
  components: {
    baseSelect,
    optionSlotSelect,
    objectValueSelect,
    remoteSelect,
    groupSelect
  }
}
</script>

<style scoped>
  .base-demo .box-card{
    margin: 40px 10px;
  }
</style>
