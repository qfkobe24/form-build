<template>
  <form-build :form-list="formList" ref="form" labelWidth="150"></form-build>
</template>

<script>
export default {
  data() {
    return {
      formList: [{
        id: 'slider',
        component: 'slider',
        label: '自定义按钮',
        renderSlots(h, value) {
          return [h('div', { class: 'custom-slider-button', slot: 'button' }, value)]
        },  
      }]
    }
  }
}
</script>

<style>
.custom-slider-button {
  width: 26px;
  color: rgb(255, 255, 255);
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #10a517;
  border-radius: 100px;
}
</style>
