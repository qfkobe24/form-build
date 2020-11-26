<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'select',
        label: '基础选择器',
        component: 'select',
        props: {
          placeholder: '请选择',
          multiple: true
        },
        options: [
          { value: 1, label: '红烧鱼', disabled: false },
          { value: 2, label: '酸菜鱼', disabled: false },
          { value: 3, label: '烤鱼', disabled: false }
        ]
      }]
    }
  }
}
</script>
