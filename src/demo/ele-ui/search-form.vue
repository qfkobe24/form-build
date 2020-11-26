<template>
  <form-build :form-list="formList" ref="form" :model="model" :span="6" :inline="true">
    <template slot="action-button">
      <el-button block type="primary" @click="submit">搜索</el-button>
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
        id: 'name',
        component: 'input',
        props: {
          placeholder: '请输入商品名称'
        }
      }, {
        id: 'order',
        component: 'input',
        props: {
          placeholder: '请输入订单号'
        }
      }, {
        id: 'phone',
        component: 'input',
        props: {
          placeholder: '请输入收货人手机'
        },
        rules: [{
            validator: function (rule, value, callback) {
                if (value && !(/^[1]([3-9])[0-9]{9}$/.test(value))) {
                    let msg = '手机号码有误'
                    rule.message = msg
                    callback(new Error(msg))
                }
                callback()
            }
        }]
      }]  
    }
  },

  methods: {
    submit() {
      this.$refs.form.submit().then(model => {
        var obj = {}
        Object.keys(model).forEach(key => {
          if (model[key]) {
            obj[key] = model[key]
          }
        });
        alert(JSON.stringify(obj))
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

<style>
.tips{
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
</style>