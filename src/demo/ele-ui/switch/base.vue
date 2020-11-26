<template>
  <form-build :form-list="formList" ref="form" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'switch',
        label: '基础开关',
        component: 'switch',
      }]
    }
  }
}
</script>
