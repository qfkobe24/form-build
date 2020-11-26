<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'date',
        label: '选择日期范围',
        component: 'date-picker',
        props: {
          valueFormat: 'yyyy-MM-dd',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
          type: 'daterange',
          clearable: true
        }
      }]
    }
  }
}
</script>
