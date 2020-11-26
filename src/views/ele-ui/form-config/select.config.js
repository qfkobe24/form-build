
let selectSingleOptions = []

export default [{
  id: 'select_single',
  component: 'select',
  label: '单选',
  props: {
    placeholder: '请选择',
    filterable: true,
    remote: true,
    remoteMethod(query) {
      setTimeout(() => {
        selectSingleOptions.push(
          { value: 1, label: '红烧鱼', disabled: false },
          { value: 2, label: '酸菜鱼', disabled: false },
          { value: 3, label: '烤鱼', disabled: false })
      }, 1000)
    }
  },
  options: selectSingleOptions,
  renderOptionSlot(h, option, index) {
    return h('div', {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, [
      h('span', {}, option.label),
      h('span', {}, option.value)
    ])
  },
  rules: {
    validitor(rule, val) {
      return val !== '烤鱼'
    },
    message: '烤鱼已售完'
  }
}, {
  id: 'select_multiple',
  component: 'select',
  label: '多选',
  defaultValue: [1, 2],
  props: {
    placeholder: '请选择',
    multiple: true
  },
  options: [
    { value: 1, label: '红烧鱼', disabled: false },
    { value: 2, label: '酸菜鱼', disabled: false },
    { value: 3, label: '烤鱼', disabled: false }
  ],
  rules: {
    validator(rule, val) {
      console.log(val)
      return val !== '烤鱼'
    },
    message: '烤鱼已售完'
  }
}]
