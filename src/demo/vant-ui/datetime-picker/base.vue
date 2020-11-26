<template>
  <form-build 
    ref="form" 
    :form-list="formList" 
    :model="model"/>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        id: 'datetime-picker_date',
        component: 'datetime-picker',
        label: '日期',
        required: true,
        props: {
          placeholder: '请选择日期',
          displayFormat: 'YYYY-MM-DD',
          injectProps: {
            type: 'date',
            visibleItemCount: 4
          }
        }
      }]
    }
  }
}
</script>
