<template>
  <form-build :form-list="formList" ref="form" labelWidth="120"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'discrete_1',
        label: '不显示间断点',
        component: 'slider',
        props: {
          step: 5,
        }
      }, {
        id: 'discrete_2',
        label: '显示间断点',
        component: 'slider',
        props: {
          step: 10,
          showStops: true,
        }
      }]
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100
    }
  }
}
</script>
