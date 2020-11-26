export default [{
  id: 'radio_1',
  component: 'radio',
  label: '单选1',
  props: {
    direction: 'vertical-cell',
    iconSize: '14px'
  },
  options: [
    { name: 2, text: '红烧鱼', disabled: false },
    { name: 4, text: '酸菜鱼', disabled: false },
    { name: 6, text: '烤鱼', disabled: false }
  ]
}, {
  id: 'radio_2',
  component: 'radio',
  label: '单选2',
  props: {
    direction: 'horizontal',
    iconSize: '14px'
  },
  options: [
    { name: 2, text: '红烧鱼', disabled: false },
    { name: 4, text: '酸菜鱼', disabled: false },
    { name: 6, text: '烤鱼', disabled: false }
  ]
}, {
  id: 'radio_3',
  component: 'radio',
  label: '单选3',
  props: {
    direction: 'vertical',
    iconSize: '14px'
  },
  options: [
    { name: 2, text: '红烧鱼', disabled: false },
    { name: 4, text: '酸菜鱼', disabled: false },
    { name: 6, text: '烤鱼', disabled: false }
  ]
}, {
  id: 'radio_4',
  component: 'radio-popup',
  label: '单选弹框',
  props: {
    iconSize: '14px',
    contentStyle: {
      'max-height': '300px'
    }
  },
  options: [
    { name: 1, text: '红烧鱼', disabled: false },
    { name: 2, text: '酸菜鱼', disabled: false },
    { name: 3, text: '烤鱼', disabled: false },
    { name: 4, text: '红烧鱼', disabled: false },
    { name: 5, text: '酸菜鱼', disabled: false },
    { name: 6, text: '烤鱼', disabled: false },
    { name: 7, text: '红烧鱼', disabled: false },
    { name: 8, text: '酸菜鱼', disabled: false },
    { name: 9, text: '烤鱼', disabled: false },
    { name: 10, text: '红烧鱼', disabled: false },
    { name: 21, text: '酸菜鱼', disabled: false },
    { name: 32, text: '烤鱼', disabled: false },
    { name: 42, text: '红烧鱼', disabled: false },
    { name: 52, text: '酸菜鱼', disabled: false },
    { name: 62, text: '烤鱼', disabled: false },
    { name: 72, text: '红烧鱼', disabled: false },
    { name: 82, text: '酸菜鱼', disabled: false },
    { name: 92, text: '烤鱼', disabled: false }
  ],
  renderOptionSlot(h, option) {
    return h('span', {}, [option.text, h('span', { style: { color: 'red' } }, '(即将售罄)')])
  }
}]
