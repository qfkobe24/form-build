<template>
  <form-build :form-list="formList" ref="form" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'slider',
        label: '竖向',
        component: 'slider',
        props: {
          vertical: true,
          height: '200px',
        },
      }]
    }
  }
}
</script>
