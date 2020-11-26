<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'switch',
        component: 'switch',
        label: '开关'
      }]
    }
  }
}
</script>
