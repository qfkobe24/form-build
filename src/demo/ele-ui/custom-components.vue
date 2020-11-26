<template>
  <form-build :form-list="formList" ref="form">
    <template slot="action-button">
      <el-button block type="primary" @click="submit">提交</el-button>
      <el-button block @click="reset">重置</el-button>
    </template>
  </form-build>
</template>

<script>
var cpm = {
  template: `<div>
    <el-radio-group v-model="radio" @change="change">
      <el-radio :label="1">全部分类</el-radio>
      <el-radio :label="2">指定分类</el-radio>
    </el-radio-group>

    <el-select v-show="radio == 2" multiple v-model="category" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>`,
  
  props: {
    value: Array
  },

  watch: {
    value: {
      immediate: true,
      handler: function (val, oldVal) {
        if (val && val.includes('all')) {
          this.radio = 1
        } else if (val){
          this.radio = 2
          this.category = val
        }
      }
    }
  },

  data () {
    return {
      radio: '',
      category: [],
      options: [{
        value: '1', label: '数据3C'
      }, {
        value: '2', label: '居家日用'
      }, {
        value: '3', label: '日用护肤'
      }]
    }
  },

  methods: {
    change () {
      let val = this.radio === 1 ? ['all'] : this.category
      val && this.$emit('input', val)
    }
  }
}

export default {
  data() {
    return {
      formList: [{
        id: 'categote',
        label: '指定分类',
        defaultValue: '',
        required: true,
        component: cpm,
        rule: [{
          type: 'string',
          message: '请选择指定分类',
          trigger: 'blur'
        }]
      }
      ]  
    }
  },

  methods: {
    submit() {
      this.$refs.form.submit().then(model => {
        alert(JSON.stringify(model))
      }).catch(fields => {
        console.warn('以下字段校验不通过：', fields)
      })
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
