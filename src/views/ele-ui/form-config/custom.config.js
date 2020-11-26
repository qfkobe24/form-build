import Vue from 'vue'

import fullName from '../components/full-name.vue'

export default [{
  id: 'formatFullName',
  component: fullName,
  defaultValue: '谢-敏',
  label: '格式化姓名',
  labelAlign: 'right',
  required: true
}, {
  id: 'fullName',
  label: '名',
  showErrorMessage: false,
  component: Vue.extend({
    template: '<div>谢：<input v-model="fullName" @input="inputChange" @blur="nameBlur"/><slot></slot></div>',
    props: {
      value: String
    },
    data() {
      return {
        fullName: ''
      }
    },
    watch: {
      value(val) {
        this.fullName = val
      }
    },
    methods: {
      inputChange() {
        this.$emit('input', this.fullName)
      },
      nameBlur() {
        this.$emit('nameBlur')
      }
    }
  }),
  renderSlots(h, value) {
    return h('span', { }, '隐藏错误提示')
  },
  on: {
    nameBlur() {
      console.log('nameBlur')
    }
  },
  listen: {
    'address:blur': (val, item) => {
      item.label = '1123123'
    }
  },
  inputFormat: (val) => {
    return val ? val.replace(/^谢/, '') : val
  },
  outputFormat: (val, { id }) => {
    return {
      [id]: `谢${val}`
    }
  },
  // component:nameComp,
  rules: [{
    type: 'string',
    required: true,
    message: '请填写名字'
  }, {
    type: 'string',
    message: '名字只能是汉字',
    pattern: /^[\u4e00-\u9fa5]+$/g
  }]
}]
