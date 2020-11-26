<template>
  <form-build :form-list="formList" ref="form" :model="model" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        default_1: 50,
      },
      formList: [{
        id: 'default_1',
        label: '自定义初始值',
        component: 'slider',
      }, {
        id: 'default_2',
        label: '自定义步长',
        component: 'slider',
        props: {
          step: 10
        },
        on: {
          input: (val) => {
            this.$toast('当前值：' + val)
          } 
        }
      }, {
        id: 'default_3',
        label: '自定义范围',
        component: 'slider',
        props: {
          min: -50,
          max: 50
        },
        on: {
          input: (val) => {
            this.$toast('当前值：' + val)
          } 
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
