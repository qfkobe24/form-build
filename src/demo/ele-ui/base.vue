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
        renderStatic: h => {
          return <div style='padding:10px; margin-top:10px 0; background-color:#eee; font-size:15px;'>这是一个静态项</div>
        }
      }, {
        id: 'channelList',
        label: '上线渠道',
        component: 'checkbox',
        required: true,
        options: [{
          label: 1,
          text: 'app'
        }, {
          label: 2,
          text: '微信'
        }]
      }, {
        id: 'showLocation',
        label: '展示位置',
        component: 'radio',
        required: true,
        options: [{
          text: '首页banner',
          label: 1
        }, {
          text: '商品详情页',
          label: 2
        }],
        rules: [{
          type: 'number',
          message: '请选择展示位置',
          trigger: 'blur'
        }]
      }, {
        id: 'title',
        label: '公告标题',
        component: 'input',
        required: true,
        props: {
          maxlength: 40
        },
        append: h => {
          const length = this.model && this.model.title && this.model.title.length || 0
          return <span class="tips">注意：可输入{length}/40字</span>
        },
        rules: [{
          type: 'string',
          message: '请填写公告标题',
          trigger: 'blur'
        }]
      }, {
        id: 'content',
        label: '公告内容',
        component: 'input',
        required: true,
        props: {
          type: 'textarea',
          maxlength: 100,
          autosize: { minRows: 3, maxRows: 6 }
        },
        append: h => {
          const length = this.model && this.model.content && this.model.content.length || 0
          return <span class="tips">注意：可输入{length}/100字</span>
        },
        rules: [{
          type: 'string',
          required: true,
          message: '请填写公告内容',
          trigger: 'blur'
        }]
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

<style>
.tips{
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
</style>