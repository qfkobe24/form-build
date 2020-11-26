<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'time',
        label: '任意时间点',
        component: 'time-picker',
        props: {
          placeholder: '请选择',
          valueFormat: 'HH时mm分ss秒',
          pickerOptions: {
            selectableRange: '18:30:00 - 20:30:00'
          }
        }
      }, {
        id: 'time_range',
        label: '任意时间范围',
        component: 'time-picker',
        props: {
          isRange: true,
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          valueFormat: 'HH时mm分ss秒'
        }
      }]
    }
  }
}
</script>
