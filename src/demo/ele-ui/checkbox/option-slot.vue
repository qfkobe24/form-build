<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'checkbox',
        label: '自定义选项模板',
        component: 'checkbox',
        props: {
          placeholder: '请选择'
        },
        options: [
          { label: 1, text: '红烧鱼' },
          { label: 2, text: '酸菜鱼' },
          { label: 3, text: '烤鱼' }
        ],
        renderOptionSlot(h, option) {
          return h('span', {}, `${option.text}(招牌菜)`)
        }
      }]
    }
  }
}
</script>
