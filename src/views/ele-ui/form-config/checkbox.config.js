export default [{
  id: 'checkbox_1',
  component: 'checkbox',
  label: '多选1',
  options: [
    { label: 1, trueLabel: 1, falseLabel: 10, text: '红烧鱼', disabled: false, size: 'medium', border: true },
    { label: 2, text: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { label: 3, text: '烤鱼', disabled: false, size: 'medium', border: true }
  ],
  listen: {
    'checkbox_2:change': (val3, item, model) => {
      item.label = 'sdfds'
      item.props = {}
      item.props.disabled = true
      item.options = [{ 
        label: 4, 
        text: '水煮鱼',
        disabled: false, 
        size: 'medium',
        border: true 
      }]
      console.log('checkbox1 监听')
    }
  }
}, {
  id: 'checkbox_2',
  component: 'checkbox-button',
  label: '多选2',
  on: {
    change: [val1 => {
      console.log('checkbox_2本身的change1111')
    }, val2 => {
      console.log('checkbox_2本身的change2222')
    }]
  },
  options: [
    { label: 1, text: '红烧鱼', disabled: false, size: 'medium', border: true },
    { label: 2, text: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { label: 3, text: '烤鱼', disabled: false, size: 'medium', border: true }
  ]
}, {
  id: 'checkbox_3',
  component: 'checkbox',
  label: '自定义选项内容',
  options: [
    { label: 1, remain: 1, name: '红烧鱼', disabled: false, size: 'medium', border: true },
    { label: 2, remain: 2, name: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { label: 3, remain: 3, name: '烤鱼', disabled: false, size: 'medium', border: true }
  ],
  renderOptionSlot(h, option) {
    return h('span', {}, `${option.name}(剩余${option.remain}份)`)
  }
}]
