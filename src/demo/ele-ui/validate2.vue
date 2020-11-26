<template>
  <div class="container">
    <form-build :form-list="formList" ref="form"  :model="model" />
    <div class="footer">
      <div class="password-hint">
        <p style="font-size: 13px;" v-if="errorMessages.length">您的密码需要满足以下条件:</p>
        <ul class="errorMessages">
          <li v-for="message in errorMessages" :key="message">{{message}}</li>
        </ul>
      </div>
      <div class="btn-group">
        <el-button block type="primary" @click="submit">提交</el-button>
        <el-button block @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>

const passwordRules = [{ 
  validator(rule, value) {
    return /\d/.test(value) || /[~!@#$%^&*()_+{}[\]:;'"<>?/.,`\\]/.test(value)
  }, 
  message: '至少包含一个数字或一个符号' 
}, { 
  validator(rule, value) {
    return /[A-Z]/.test(value) && /[a-z]/.test(value)
  }, 
  message: '同时包括大写和小写字母'
}, { 
  validator(rule, value) {
    return value.length >= 8
  }, 
  message: '至少为8个字符长'
}]
export default {
  data() {
    return {
      sendText: '发送验证码',
      countDown: 60,
      canSend: true,
      errorMessages: [],
      model: {},
      formList: [{
        id: 'mobile',
        label: '绑定手机号',
        component: 'input',
        required: true,
        renderSlots: (h) => {
          return <el-button 
            slot="append" 
            onClick={this.sendCode} 
            class="code"
            disabled={!this.canSend}
          >{this.sendText}</el-button>
        },
        rules: [{
          required: true,
          message: '请输入绑定手机号',
          detail: 'aaa'
        }, {
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          message: '请输入有效的手机号码'
        }]
      }, {
        id: 'code',
        label: '验证码',
        component: 'input',
        required: true,        
        rules: [{
          asyncValidator: (rule, value, cb) => {
            setTimeout(() => {
              if (value === '123456') {
                cb()
              } else {
                cb(new Error('invalid code'))
              }
            }, 100)
          },
          message: '验证码校验失败'
        }]
      }, {
        id: 'newPassword1',
        label: '新密码',
        validateTrigger: 'change',
        component: 'input',
        required: true,
        rules: [{
          validator: (rule, value) => {
            const errorMessages = []
            passwordRules.forEach(item => {
              console.log(item.message, item.validator(rule, value))
              if (!item.validator(rule, value)) {
                errorMessages.push(item.message)
              }
            })
            this.errorMessages = errorMessages
            return !errorMessages.length
          },
          message: '密码强度不够'
        }]
      }, {
        id: 'newPassword2',
        label: '确认密码',
        component: 'input',
        validateTrigger: 'blur',
        required: true,
        rules: [
          {
            required: true,
            message: '请再输一次新密码'
          }, {
            validator: (rule, value) => {
              return value === this.model.newPassword1
            },
            message: '确认密码不一致'
          },
        ]
      }]  
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate({ firstFields: false }).then(() => {
        this.errorMessages = []
        // alert(JSON.stringify(model))
        this.$message({ message: '校验成功' })
      }).catch(fields => {
        console.warn('以下字段校验不通过：', fields)
      })
    },
    async sendCode() {
      await this.$refs.form.validateField('mobile')
      this.canSend = false
      this.sendText = `${this.countDown}s`
      const intervalId = setInterval(() => {
        const { countDown } = this
        const next = countDown - 1
        this.countDown = next >= 0 ? next : 0
        this.sendText = `${next}s`
        if (!next) {
          this.canSend = true
          this.sendText = '发送验证码'
          clearInterval(intervalId)
        }
      }, 1000)
      this.$message({ message: '验证码为123456' })
    },
    getIsInvalid(message) {
      return this.errorMessages.includes(message)
    },
    reset() {
      this.$refs.form.reset()
      this.errorMessages = []
    }
  }
}
</script>

<style>
.code {
  font-size: 12px !important;
  padding: 10px;
}
.password-hint {
  margin-top: 40px;
}
.errorMessages {
  font-size: 12px;
  padding-inline-start: 20px;
  color: red;
  margin-bottom: 20px;
}
</style>
