import { isString, isNumber, isEmpty, isObject, isArray, noop } from '../../../utils'
import { handleError } from '../../../utils/error'
import { SelectedItem, SelectedItems, SelectedValue, SelectedIndex, PickerIndex, PickerValue, SeekMethods } from '../../types/picker'

export default (function PickerSeek() {
  function getSeeker(type: string): SeekMethods {
    switch (type) {
    case 'col': // 单列
      return ColSeek
    case 'cols': // 多列
      return MultipleColSeek
    case 'cascader': // 级联
      return CascaderSeek
    }

    return { getIndexByValue: noop, getValueByIndex: noop }
  }

  return {
    getIndexByValue(data: any[], val: SelectedValue, type: string, valueKey: string): any {
      return getSeeker(type).getIndexByValue(data, val, valueKey)
    },
  
    getValueByIndex(data: any[], selectedIndex: SelectedIndex, type: string, valueKey: string): any {
      return getSeeker(type).getValueByIndex(data, selectedIndex, valueKey)
    }
  }
})()

// export default PickerSeek()

// 单列查找
const ColSeek = {
  getIndexByValue(data: any[], val: any, valueKey: string): PickerIndex {
    let selectedIndex: SelectedIndex = -1
    let selectedItem: SelectedItem = ''

    const firstItem: any = data[0]
    if (isEmpty(firstItem)) { noop() } else if (isString(firstItem) || isNumber(firstItem)) { // 单列，选项为简单类型
      const index: number = data.findIndex((column: SelectedItem) => column === val)
      selectedItem = index >= 0 ? data[index] : null
      selectedIndex = index
    } else if (isObject(firstItem)) { // 单列，选项为对象类型
      const index: number = data.findIndex(column => column[valueKey] === val)
      selectedItem = index >= 0 ? data[index] : null
      selectedIndex = index
    } else {
      handleError('picker', 'col(单列)类型的picker传入的columns格式不正确，请检查')
    }

    return { selectedItem, selectedIndex }
  },

  getValueByIndex(data: any[], selectedIndex: any, valueKey: string): PickerValue {
    let selectedValue: SelectedValue = -1
    const selectedItem: SelectedItem = data[selectedIndex]

    if (isString(selectedItem) || isNumber(selectedItem)) { // 单列，选项为简单类型
      selectedValue = selectedItem as SelectedValue
    } else if (isObject(selectedItem)) { // 单列，选项为对象类型
      selectedValue = selectedItem[valueKey]
    }

    return { selectedValue, selectedItem }
  }
}


// 多列查找
const MultipleColSeek = {
  getIndexByValue(data: any[], val: any, valueKey: string): PickerIndex {
    const selectedIndex: SelectedIndex = []
    const selectedItem: SelectedItems = []
    data.forEach((columnObj, columnIndex) => {
      const columnData = columnObj.values
      if (isEmpty(columnData)) {
        return { selectedIndex, selectedItem }
      }

      // if (!(columnData instanceof Array)) {
      if (!isArray(columnData)) {
        handleError('picker', 'cols(多列)类型的picker传入的columns格式不正确，请检查')
        return { selectedIndex, selectedItem }
      }

      const firstItem = columnData[0]

      if (isString(firstItem) || isNumber(firstItem)) { // 选项为简单类型
        // console.log('columnData', columnData.findIndex, JSON.stringify(columnData))
        const index: number = columnData.findIndex((column: any) => column === val[columnIndex])

        selectedItem.push(index >= 0 ? columnData[index] : null)
        selectedIndex.push(index)
      } else if (isObject(firstItem)) { // 选项为对象类型
        const index: number = columnData.findIndex((column: any) => column[valueKey] === val[columnIndex])

        selectedItem.push(index >= 0 ? columnData[index] : null)
        selectedIndex.push(index)
      } else {
        handleError('picker', 'cols(多列)类型的picker传入的columns格式不正确，请检查')
      }
    })

    return { selectedItem, selectedIndex }
  },

  getValueByIndex(data: any[], selectedIndex: any, valueKey: string): PickerValue {
    const selectedValue: SelectedIndex = []
    const selectedItem: SelectedItems = []
    
    try {
      selectedIndex.forEach((columnSelectedIndex: number, columnIndex: number) => {
        // debugger
        const column = data[columnIndex].values

        const curSelectedItem = column[columnSelectedIndex]
        selectedItem.push(curSelectedItem)

        if (isString(curSelectedItem) || isNumber(curSelectedItem)) { // 单列，选项为简单类型
          selectedValue.push(curSelectedItem as number)
        } else if (isObject(curSelectedItem)) { // 单列，选项为对象类型
          selectedValue.push(curSelectedItem[valueKey])
        } else {
          selectedValue.push(-1)
        }
      })
    } catch (e) {
      handleError('picker', 'cols(多列)类型的picker传入的columns格式不正确，请检查')
    }
    
    return { selectedValue, selectedItem }
  }
}

// 级联查找
const CascaderSeek = {
  getIndexByValue(data: any[], val: any, valueKey: string): PickerIndex {
    const selectedIndex: SelectedIndex = []
    const selectedItem: SelectedItems = []

    let columns = data

    while (columns && columns.length) {
      const index = columns.findIndex(columnData => columnData[valueKey] === val[valueKey])

      // TODO 赋值为无children属性的对象
      selectedItem.push(index >= 0 ? columns[index] : null)
      selectedIndex.push(index)

      columns = (columns as any).children
    }

    return { selectedItem, selectedIndex }
  },

  getValueByIndex(data: any[], selectedIndex: any, valueKey: string): PickerValue {
    const selectedValue: SelectedIndex = []
    const selectedItem: SelectedItems = []


    let columns = data
    
    selectedIndex.forEach((columnSelectedIndex: number, columnIndex: number) => {
      const curSelectedItem = columns[columnSelectedIndex]
      selectedItem.push(curSelectedItem)
      selectedValue.push(curSelectedItem[valueKey])

      columns = curSelectedItem.children || []
    })

    return { selectedValue, selectedItem }
  }
}
