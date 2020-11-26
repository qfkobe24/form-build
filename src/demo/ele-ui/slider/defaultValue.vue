<template>
  <form-build :form-list="formList" ref="form" :model="model" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        default: 50,
      },
      formList: [{
        id: 'default',
        label: '自定义初始值',
        component: 'slider',
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
