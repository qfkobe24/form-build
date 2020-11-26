<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'select',
        label: '对象类型value',
        component: 'select',
        props: {
          placeholder: '请选择',
          valueKey: 'cityId'
        },
        options: [
          { value: { cityId: 1 }, label: '红烧鱼', disabled: false },
          { value: { cityId: 2 }, label: '酸菜鱼', disabled: false },
          { value: { cityId: 3 }, label: '烤鱼', disabled: false }
        ]
      }]
    }
  }
}
</script>
