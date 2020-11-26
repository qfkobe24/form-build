export default [{
  id: 'checkbox_1',
  component: 'checkbox',
  label: '多选1',
  props: {
    direction: 'vertical-cell',
    iconSize: '14px'
  },
  options: [
    { name: 1, remain: 1, text: '红烧鱼', disabled: false, size: 'medium', border: true },
    { name: 2, remain: 2, text: '酸菜鱼', disabled: false, size: 'medium', border: true },
    { name: 3, remain: 3, text: '烤鱼', disabled: false, size: 'medium', border: true }
  ],
  renderOptionSlot(h, option) {
    return h('span', {}, `${option.text}(剩余${option.remain}份)`)
  }
}, {
  id: 'checkbox_2',
  component: 'checkbox',
  label: '多选2',
  props: {
    direction: 'horizontal',
    iconSize: '14px'
  },
  options: [
    { name: 2, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 4, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 6, text: '烤鱼', disabled: false, shape: 'squire' }
  ]
}, {
  id: 'checkbox_3',
  component: 'checkbox',
  label: '多选3',
  props: {
    direction: 'vertical',
    iconSize: '14px'
  },
  options: [
    { name: 2, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 4, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 6, text: '烤鱼', disabled: false, shape: 'squire' }
  ]
}, {
  id: 'checkbox_4',
  component: 'checkbox-popup',
  label: '多选弹框',
  props: {
    iconSize: '14px',
    contentStyle: {
      'max-height': '300px'
    }
  },
  options: [
    { name: 1, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 2, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 3, text: '烤鱼', disabled: false, shape: 'squire' },
    { name: 4, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 5, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 6, text: '烤鱼', disabled: false, shape: 'squire' },
    { name: 7, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 8, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 9, text: '烤鱼', disabled: false, shape: 'squire' },
    { name: 10, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 21, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 32, text: '烤鱼', disabled: false, shape: 'squire' },
    { name: 42, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 52, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 62, text: '烤鱼', disabled: false, shape: 'squire' },
    { name: 72, text: '红烧鱼', disabled: false, shape: 'squire' },
    { name: 82, text: '酸菜鱼', disabled: false, shape: 'squire' },
    { name: 92, text: '烤鱼', disabled: false, shape: 'squire' }
  ],
  renderOptionSlot(h, option) {
    return h('span', {}, [option.text, h('span', { style: { color: 'red' } }, '(即将售罄)')])
  }
}]
