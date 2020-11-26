<template>
  <form-build :form-list="formList" ref="form" labelWidth="140px" :model="model">
    <template slot="action-button">
      <el-button block type="primary" @click="submit">校验</el-button>
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
        id: 'requiredItem',
        label: '必填项',
        component: 'input',
        required: true
      }, 
      {
        id: 'checkbox',
        label: '多选',
        component: 'checkbox',
        required: true,
        options: [
          { label: 1, text: '选项1', disabled: false, size: 'medium', border: true },
          { label: 2, text: '选项2', disabled: false, size: 'medium', border: true },
          { label: 3, text: '选项3', disabled: false, size: 'medium', border: true }
        ],
      }, {
        id: 'email',
        label: '内置类型校验',
        component: 'input',
        rules: [{
          type: 'email',
          message: '请填写正确的邮箱',
        }]
      }, {
        id: 'muti',
        label: '多个校验规则',
        component: 'input',
        rules: [{
          validator: (rule, value) => value.startsWith('@'),
          message: '内容必须含以`@`开头',
        }, {
          validator: (rule, value) => value.endsWith('_'),
          message: '内容必须含以`_`结尾',
        }]
      }, {
        id: 'custom',
        label: '自定义校验',
        component: 'input',
        rules: [{
          validator: (rule, value) => value.startsWith('_'),
          message: '内容必须含以`_`开头',
        }]
      }, {
        id: 'asyncCustom',
        label: '异步校验',
        component: 'input',
        rules: {
          asyncValidator(rule, value) {
            return new Promise((resolve, reject) => {
              if (isNaN(+value)) {
                reject(new Error('内容必须为数字'))
              } else if (value < 18) {
                reject(new Error('必须大于18')) // reject with error message
              } else {
                resolve()
              }
            })
          }
        }
      }, {
        id: 'deep',
        label: '深层校验',
        component: 'input',
        props: {
          placeholder: '请输入：省-市-区'
        },
        rules: {
          type: 'object',
          transform(val) {
            const [province, city, area] = val.split('-')
            return {
              province,
              city,
              area, 
            }
          },
          fields: {
            province: { type: 'string', required: true, message: '省为必填' },
            city: { type: 'string', required: true, message: '市为必填' },
            area: { type: 'enum', required: true, enum: ['海珠', '荔湾', '越秀'], message: '区只能是海珠、荔湾、越秀' },
          },
        }
      }]  
    }
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
