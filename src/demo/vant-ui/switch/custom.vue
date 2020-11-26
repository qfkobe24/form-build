<template>
  <form-build :form-list="formList" ref="form" :model="model" labelWidth="200px"></form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {
        switch_1: true,
        switch_2: true,
        // switch_3: false,
        switch_4: 'yes',
        switch_5: true,
      },
      formList: [{
        id: 'switch_1',
        label: '加载状态',
        component: 'switch',
        props: {
          loading: true
        }
      }, {
        id: 'switch_2',
        label: '自定义颜色',
        component: 'switch',
        props: {
          activeColor: '#07c160',
          inactiveColor: '#ee0a24'
        }
      }, /* {
        id: 'switch_3',
        label: '异步控制',
        component: 'switch',
        on: {
          input: (val) => {          
            const res = this.$dialog.confirm({
              title: '提醒',
              message: '是否切换开关？',
            }).then(() => {
              // [TODO] 异步控制
              const nextVal = res ? val : !val
              this.model.switch_4 = nextVal
            })
          }
        }
      }, */ {
        id: 'switch_4',
        label: '自定义值',
        component: 'switch',
        props: {
          activeValue: 'yes',
          inactiveValue: 'no'
        },
        on: {
          change(val) {
            this.$toast('当前值：' + val)
          }
        }
      }, {
        id: 'switch_5',
        label: '自定义大小',
        component: 'switch',
        props: {
          size: '24px'
        }
      },
      
      ]
    }
  }
}
</script>

<style>
div {
  box-sizing: content-box !important;
}
</style>
