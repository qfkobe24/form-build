<script lang="ts">
import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import tableBuilder from './table-builder.vue'
import formBuild from '../../packages/components/form.vue'
import { AnyObject, FormItem } from '../../packages/types'

import { isFunction, isObject } from '../../packages/utils'

@Component({
  components: {
    formBuild,
    // tableBuilder
  }
})
export default class TabelBuilderPro extends Mixins(tableBuilder) {
  private visible = false
  private rowModel = {}
  
  render (h: CreateElement) {
    return h('div', [
      this.renderElTable(h),
      this.renderFormBuilder(h)
    ])
  }

  private renderElTable (h: CreateElement) {
    return h('el-table', {
      props: this.$attrs,
      on: this.$listeners,
    }, [
      ...this.renderElTableColumn(h),
      this.renderOperColumn(h),
    ])
  }

  private renderFormBuilder (h: CreateElement) {
    return h('el-dialog', {
      props: {
        visible: this.visible,
        width: '50%'
      },
      on: {
        close: this.cancalEdit
      }
    }, [
      h(formBuild, {
        ref: 'form',
        props: {
          model: this.rowModel,
          formList: this.formList
        }
      }),
      h('el-button', {
        props: {
          type: "primary"
        },
        on: {
          click: this.submit
        }
      }, '修改')
    ])
  }

  private renderOperColumn (h: CreateElement) {
    return h('el-table-column', {
        props: {
          label: '操作'
        },
        scopedSlots: {
          default: props => this.$scopedSlots.operColumn({
            $index: props.$index,
            row: props.row,
            column: props.column
          })
        }
      })
  }                                       

  get formList () {
    return this.columnList
      .filter((item: any) => isObject(item.form))
      .map((item: any) => {
        const { prop, form, ...other } = item
        return {
          id: prop,
          ...form,
          ...other
        }
      })
  }

  private submit() {
    (this.$refs.form as formBuild).submit().then((model) => {
      console.log(1231);
      
      this.$emit('submitRow', model)
    }).catch((fields) => {
    })
  }

  private reset() {
    (this.$refs.form as formBuild).reset()
  }

  private editRow (row: any, index: number) {
    this.visible = true
    this.rowModel = row
  }

  private cancalEdit () {
    this.visible = false
    this.rowModel = {}
    // this.$emit('close')
  }
}
</script>

