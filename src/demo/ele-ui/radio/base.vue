<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'radio',
        component: 'radio',
        label: '单选框组',
        options: [
          { label: 1, text: '红烧鱼' },
          { label: 2, text: '酸菜鱼' },
          { label: 3, text: '烤鱼', disabled: true }
        ]
      }]
    }
  }
}
</script>
