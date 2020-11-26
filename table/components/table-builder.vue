<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import { isFunction, isObject } from '../../packages/utils'

@Component
export default class tableBuilder extends Vue {
  @Prop({ default: () => [] }) columnList!: []

  render (h: CreateElement) {
    return h('el-table', {
      props: this.$attrs,
      on: this.$listeners,
    }, [
      ...this.renderElTableColumn(h)
    ])
  }

  renderElTableColumn (h: CreateElement) {
    let { columnList } = this
    return this.columnList
      .map((item: any) => {
      return h('el-table-column', {
        props: item,
        key: `el-table-column-${item.prop}`,
        // scopedSlots: isFunction(item.children) ? {
        //   default: (scope: any) => item.children(h, scope)
        // } : {}
      })
    })
  }
}
</script>
