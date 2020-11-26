<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'select',
        label: '分组显示',
        component: 'select',
        props: {
          placeholder: '请选择',
          multiple: true,
          clearable: true,
          filterable: true
        },
        options: [
          {
            label: '招牌菜',
            options: [
              { value: 1, label: '红烧鱼', disabled: false },
              { value: 2, label: '酸菜鱼', disabled: false },
              { value: 3, label: '烤鱼', disabled: false }
            ]
          },
          {
            label: '新品',
            disabled: true,
            options: [
              { value: 4, label: '红焖肘子', disabled: false },
              { value: 5, label: '爆炒鱿鱼', disabled: false },
              { value: 6, label: '姜葱鸡', disabled: false }
            ]
          }
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
