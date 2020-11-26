<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'input_number_base',
        label: '计数器',
        component: 'input-number',
        props: {
          placeholder: '大于0的整数'
        }
      }]
    }
  }
}
</script>
