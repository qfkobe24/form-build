export default [{
  id: 'slider_1',
  component: 'slider',
  label: '滑块',
  props: {
    max: 50,
    min: -50,
    step: 10,
    'active-color': '#556edd'
  },
}, {
  id: 'slider_2',
  component: 'slider',
  label: '自定义按钮',
  renderSlots(h, value) {
    return [h('div', { class: 'custom-slider-button1', slot: 'button' }, value)]
  },  
}]
