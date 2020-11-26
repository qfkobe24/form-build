<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'date',
        label: '选择时间范围',
        component: 'date-picker',
        props: {
          valueFormat: 'yyyy-MM-dd HH:mm',
          startPlaceholder: '开始时刻',
          endPlaceholder: '结束时刻',
          type: 'datetimerange',
          clearable: true
        }
      }]
    }
  }
}
</script>
