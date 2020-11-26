<template>
  <form-build :form-list="formList" ref="form" :model="model">
    <template slot="action-button">
      <el-button block type="primary" @click="submit">提交</el-button>
      <el-button block @click="reset">重置</el-button>
    </template>
  </form-build>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        id: 'list',
        label: '上线渠道',
        component: 'checkbox',
        required: true,
        inputFormat (val) {
          return val && val.split(',')
        },
        outputFormat (val) {
          return val && val.join(',')
        },
        options: [{
          label: '1',
          text: 'app'
        }, {
          label: '2',
          text: '微信'
        }]
      }, {
        id: 'price',
        label: '价格',
        component: 'input-number',
        props: {
          step: 0.1
        },
        inputFormat (val) {
          return val && parseFloat(val.replace('¥', ''))
        },
        outputFormat (val, item, model) {
          // 也可以返回对象，这样可以处理多个key
          return {
            [item.id]: '¥' + val
          }
        }
      }]  
    }
  },

  created () {
    setTimeout(() => {
      //模拟api
      this.model = {
        id: '100',
        list: '1,2', // select组件需要的是array
        price: '¥9.9'// input-number组件需要的是int
      }
    }, 2000)
  },

  methods: {
    submit() {
      this.$refs.form.submit().then(model => {
        alert(JSON.stringify(model))
      }).catch(fields => {
        console.warn('以下字段校验不通过：', fields)
      })
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
