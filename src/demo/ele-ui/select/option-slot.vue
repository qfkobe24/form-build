<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'select',
        label: '自定义选项模板',
        component: 'select',
        props: {
          placeholder: '请选择'
        },
        options: [
          { value: 1, label: '红烧鱼', disabled: false },
          { value: 2, label: '酸菜鱼', disabled: false },
          { value: 3, label: '烤鱼', disabled: false }
        ],
        renderOptionSlot(h, option, index) {
          return h('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between'
            }
          }, [
            h('span', {}, `${option.label}（招牌菜）`),
            h('span', {}, option.value)
          ])
        }
      }]
    }
  }
}
</script>
