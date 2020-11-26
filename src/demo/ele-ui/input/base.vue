<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'input_base',
        label: '基础输入框',
        component: 'input',
        props: {
          placeholder: '请输入',
          clearable: true
        }
      }]  
    }
  }
}
</script>
