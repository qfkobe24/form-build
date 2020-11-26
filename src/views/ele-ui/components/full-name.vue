<template>
  <div>
    <div>姓：<input v-model="firstName"/></div>
    <div>名：<input v-model="lastName"/></div>
    <slot></slot>
  </div>
</template>
<script>
import { isString } from '../../../../packages/utils'
export default {
  props: {
    value: String
  },
  data() {
    return {
      // fullName: ''
    }
  },
  computed: {
    firstName: {
      get() {
        return isString(this.value) ? this.value.split('-')[0] : ''
      },
      set(val) {
        this.$emit('input', val + '-' + this.lastName)
      }
    },
    lastName: {
      get() {
        return isString(this.value) ? this.value.split('-')[1] : ''
      },
      set(val) {
        this.$emit('input', this.firstName + '-' + val)
      }
    }
  }
}
</script>
