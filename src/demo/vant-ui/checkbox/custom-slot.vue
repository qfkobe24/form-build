<template>
  <form-build 
    ref="form" 
    :form-list="formList" 
    :model="model"/>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      formList: [{
        id: 'name',
        component: 'checkbox',
        label: '复选框',
        required: true,
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
      }]
    }
  }
}
</script>
