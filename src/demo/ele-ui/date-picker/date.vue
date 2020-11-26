<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'date',
        label: '选择日期',
        component: 'date-picker',
        props: {
          placeholder: '选择日期',
          valueFormat: 'yyyy-MM-dd',
          clearable: true
        }
      }]
    }
  }
}
</script>
