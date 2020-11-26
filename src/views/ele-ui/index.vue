<template>
  <form-build :formList="formList" :model="model" ref="form">
    <template slot="action-button">
      <button @click="submit">提交</button>
      <button @click="reset">重置</button>
    </template>
  </form-build>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import formConfig from './form-config'

@Component({})
export default class EleUI extends Vue {
  formList = formConfig;
  model = {
    select_multiple: [],
    name: 'joe'
  };

  submit() {
    (this.$refs.form as any).submit().then((model: any) => {
      console.log('校验通过：', model)
    }).catch((fields: any) => {
      console.error('以下校验字段未通过', fields)
    })
  }

  reset() {
    (this.$refs.form as any).reset()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
