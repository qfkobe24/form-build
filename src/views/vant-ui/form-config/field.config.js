export default [{
  id: 'field_address',
  component: 'field',
  label: '地址',
  required: true,
  validateTrigger: 'change',
  props: {
    placeholder: '请输入地址',
  }
}, {
  id: 'field_phone',
  component: 'field',
  label: '电话',
  props: {
    type: 'tel',
    size: 'mini',
    placeholder: '请填写电话',
  },
}, {
  id: 'field_password',
  component: 'field',
  label: '密码',
  props: {
    type: 'password',
    size: 'mini',
    placeholder: '请输入密码',
  },
},]
