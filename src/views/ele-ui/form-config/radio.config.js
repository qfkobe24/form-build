export default [{
  id: 'radio_1',
  component: 'radio',
  label: '单选1',
  options: [
    { label: 1, text: '红烧鱼', disabled: false, size: 'medium', border: true },
    { label: 2, text: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { label: 3, text: '烤鱼', disabled: false, size: 'medium', border: true }
  ]
}, {
  id: 'radio_2',
  component: 'radio-button',
  label: '单选2',
  options: [
    { label: 1, remain: 1, name: '红烧鱼', disabled: false, size: 'medium', border: true },
    { label: 2, remain: 2, name: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { label: 3, remain: 3, name: '烤鱼', disabled: false, size: 'medium', border: true }
  ],
  renderOptionSlot(h, option) {
    return h('span', {}, `${option.name}(剩余${option.remain}份)`)
  }
}]
