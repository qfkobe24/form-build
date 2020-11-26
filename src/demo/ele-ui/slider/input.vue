<template>
  <form-build :form-list="formList" ref="form" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'sliderInput',
        label: '带输入框',
        component: 'slider',
        props: {
          showInput: true,
        }
      }]
    }
  }
}
</script>
