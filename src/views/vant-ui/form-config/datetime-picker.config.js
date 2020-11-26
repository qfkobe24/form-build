export default [{
  id: 'datetime-picker_date',
  component: 'datetime-picker',
  label: '日期',
  required: true,
  props: {
    placeholder: '请选择日期',
    displayFormat: 'YYYY-MM-DD',
    injectProps: {
      type: 'date',
      'visible-item-count': 4
    }
  },
}, {
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
