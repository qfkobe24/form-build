<template>
  <form-build :formList="formList" :model="model" ref="form">
    <template slot="action-button">
      <van-button block type="primary" @click="submit">提交</van-button>
      <van-button block>取消</van-button>
    </template>
  </form-build>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import formConfig from './form-config'

@Component({})
export default class VantUI extends Vue {
  formList = formConfig;
  model = {
  };
  
  submit() {
    (this.$refs.form as any).submit().then((model: any) => {
      console.log('校验通过：', model)
    }).catch((fields: any) => {
      console.error('以下校验字段未通过', fields)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type:none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.custom-slider-button1 {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #4306d1;
  border-radius: 100px;
}
</style>
