<template>
  <form-build :form-list="formList" ref="form" labelWidth="150" :model="model"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        slider: 50
      },
      formList: [{
        id: 'slider',
        label: '自定义样式',
        component: 'slider',
        props: {
          barHeight: '4px',
          activeColor: '#ee0a24'
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
