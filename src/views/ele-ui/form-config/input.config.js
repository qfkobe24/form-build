export default [{
  id: 'name',
  component: 'input',
  label: '名字',
  // labelSuffix: '(选填)', 
  props: {
    value: 112,
    size: 'mini',
    placeholder: '请输入名字'
  },
  // style: {
  //   color: 'red',
  //   background: 'green',
  //   padding: '10px'
  // },
  inputFormat: (val) => {
    return val + ''
  },
  outputFormat: (val, { id }) => {
    return {
      [id]: '￥' + val
    }
  },
  listen: {
    'fullName:nameBlur': (val, item) => {
      console.log('fullName:nameBlur')
      item.label = 'fullName:nameBlur'
    }
  },
  required: true,
  rules: [{
    type: 'string',
    required: true,
    message: '请填写名字'
  }, {
    type: 'string',
    message: '名字只能是汉字',
    pattern: /^[\u4e00-\u9fa5]+$/g
  }]
}, {
  id: 'address',
  component: 'input',
  label: '地址',
  labelAlign: 'right',
  required: true
}, {
  id: 'input_1',
  component: 'input',
  label: 'labelWidth=150',
  labelAlign: 'right',
  required: true,
  labelWidth: 150,
  props: {
    placeholder: '请填写地址'
  },
}, {
  id: 'input_2',
  component: 'input',
  label: 'labelWidth为10rem',
  labelAlign: 'right',
  required: true,
  labelWidth: '10rem',
}, {
  id: 'age',
  component: 'input',
  label: '年龄',
  required: true,
  validateTrigger: 'change',
  labelPosition: 'top',
  labelAlign: 'justify',
  col: {
    span: 10,
    offset: 10,
    push: 10,
    pull: 20,
  },
  prepend: (h) => {
    return h('div', { style: { color: 'red', width: '60px' } }, '重要')
  },
  append: (h) => {
    return h('div', { style: { color: 'red', width: '150px' } }, '请仔细检查')
  },
  inputFormat: (val) => {
    return val.replace('岁', '')
  },
  outputFormat: (val) => {
    return {
      age: val + '岁'
    }
  },
  rules: {
    type: 'string',
    max: 100
  }
}]
