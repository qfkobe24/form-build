<template>
  <div>
    <div style="color:plum">{{tip}}</div>
    <form-build :form-list="formList" ref="form"></form-build>
  </div>
</template>

<script>
export default {
  data() {
    const that = this

    return {
      tip: '',
      formList: [{
        id: 'input_event',
        label: '事件监听',
        component: 'input',
        props: {
          placeholder: '请输入'
        },
        on: {
          change(val) {
            that.tip = `change triggered: ${val}`
          }
        },
        renderSlots(h, val) {
          return [
            h('span', { slot: 'prepend' }, 'https://'),
            h('span', { slot: 'append' }, '.com')
          ]
        }
      }]
    }
  }
}
</script>
