<template>
  <div>
    <form-build :formList="formList" ref="form" :model="model" labelWidth="100px">
      <template slot="action-button">
        <div class="button-group">
          <el-button size="large" type="primary" @click="validate">确定</el-button>
          <el-button size="large" @click="reset">取消</el-button>
        </div>
      </template>
    </form-build>
  </div>
</template>

<script>

const servicesOptions = [
  { value: 1, label: '增值服务A' },
  { value: 2, label: '增值服务B' },
  { value: 3, label: '增值服务C' },
  { value: 4, label: '增值服务D' },
  { value: 5, label: '增值服务E' },
]
export default {
  data() {
    return {
      model: {
        isActive: true
      },
      formList: [{
        id: 'isActive',
        component: 'switch',
        label: '是否开通套餐',
        required: true,
      }, {
        id: 'type',
        label: '套餐类型',
        component: 'radio',
        required: true,
        options: [{
          label: 1,
          text: '基础套餐'
        }, {
          label: 2,
          text: '进阶套餐'
        }, {
          label: 3,
          text: '豪华套餐'
        }, {
          label: 4,
          text: '尊贵套餐'
        }],
        listen: {
          'isActive:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'name',
        component: 'input',
        label: '姓名',
        required: true,
        props: {
          placeholder: '请输入姓名',
        },
        listen: {
          'isActive:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        }
      }, {
        id: 'basicService',
        component: 'select',
        label: '基础服务',
        required: true,
        options: [
          { value: 1, label: '基础服务A' },
          { value: 2, label: '基础服务B' },
          { value: 3, label: '基础服务C' },
        ],  
        listen: {
          'isActive:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        },
      }, {
        id: 'service',
        component: 'select',
        label: '增值服务',
        required: true,
        hidden: true,
        options: servicesOptions,
        props: {
          multiple: true,
        },
        listen: {
          'type:change': (val, item) => {
            item.hidden = +val === 1
            item.props = { ...item.props }
            if (val === 2) {
              item.options = servicesOptions.slice(0, 3)
              item.props.multipleLimit = 2
            } else if (val === 3) {
              item.options = servicesOptions.slice(0, 4)
              item.props.multipleLimit = 3
            } else if (val === 4) {
              item.options = servicesOptions
              item.props.multipleLimit = 4
            }
          },
          'isActive:change': (val, item) => {
            item.props = { ...item.props }
            item.props.disabled = !val
          }
        },
      }]
    }
  },

  methods: {
    validate() {
      this.$refs.form.submit().then(model => {
        alert(JSON.stringify(model))
      }).catch(fields => {
        console.warn('以下字段校验不通过：', fields)
      })
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>>
