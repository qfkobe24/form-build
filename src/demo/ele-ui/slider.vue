<template>
  <form-build :form-list="formList" ref="form"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'slider_1',
        component: 'slider',
        label: '滑块',
        props: {
          max: 50,
          min: -50,
          step: 10
        }
      }, {
        id: 'mark',
        label: '展示标识',
        component: 'slider',
        props: {
          marks: {
            0: '0°C',
            8: '8°C',
            37: '37°C',
            50: {
              style: {
                color: '#1989FA'
              },
              label: this.$createElement('strong', '50%')
            }
          }
        },
      }]
    }
  }
}
</script>
