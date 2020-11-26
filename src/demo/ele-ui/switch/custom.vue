<template>
  <form-build :form-list="formList" ref="form" :model="model" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        switch_3: 'yes'
      },
      formList: [{
        id: 'switch_1',
        label: '自定义样式',
        component: 'switch',
        props: {
          width: 45,
          activeColor: '#13ce66',
          inactiveColor: '#ff4949',
        }
      }, {
        id: 'switch_2',
        label: '自定义值',
        component: 'switch',
        props: {
          activeValue: 'yes',
          inactiveValue: 'no',
        },
        on: {
          input: (val) => {
            this.$message('当前值：' + val)
          },
        }
      }, {
        id: 'switch_3',
        label: '自定义文字',
        component: 'switch',
        props: {
          activeText: '开',
          inactiveText: '关',
        }
      },]
    }
  }
}
</script>
