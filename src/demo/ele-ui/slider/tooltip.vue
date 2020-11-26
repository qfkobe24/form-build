<template>
  <form-build :form-list="formList" ref="form"  labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'hinde',
        label: '隐藏Tooltip',
        component: 'slider',
        props: {
          showTooltip: false
        }
      }, {
        id: 'format',
        label: '格式化Tooltip',
        component: 'slider',
        props: {
          formatTooltip: this.formatTooltip
        }
      }]
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    }
  }
}
</script>
