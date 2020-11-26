<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'select',
        label: '固定时间点',
        component: 'time-select',
        props: {
          placeholder: '请选择',
          pickerOptions: {
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }
        }
      }]
    }
  }
}
</script>
