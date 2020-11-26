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
        id: 'datetime-picker_time',
        component: 'datetime-picker',
        label: '时间',
        props: {
          placeholder: '请选择时间',
          displayFormat: 'HH时mm分',
          injectProps: {
            type: 'time',
          }
        },
      }, {
        id: 'datetime-picker_yearmonth',
        component: 'datetime-picker',
        label: '年月',
        props: {
          placeholder: '请选择时间',
          injectProps: {
            type: 'year-month',
            displayFormat: 'YY月MM月'
          }
        },
      }, {
        id: 'datetime-picker_month_day',
        component: 'datetime-picker',
        label: '月日',
        props: {
          placeholder: '请选择时间',
          displayFormat: 'MM月DD日',
          injectProps: {
            type: 'month-day',
          }
        },
      }]
    }
  }
}
</script>
