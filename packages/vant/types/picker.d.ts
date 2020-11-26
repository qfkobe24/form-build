/** **********SelectedItem*************/
// 字符串类型
type StringSelectedItem = string | number

// 多列选项类型
interface NormalSelectedItem {
  values: StringSelectedItem[] | any[];
}

// 级联列选项类型
interface CascaderSelectedItem {
  children: StringSelectedItem[] | CascaderSelectedItem[]
}

// picker选项类型
export type SelectedItem = StringSelectedItem | NormalSelectedItem | CascaderSelectedItem
export type SelectedItems = SelectedItem[]
export type SelectedOption = SelectedItem | SelectedItems
/** **********SelectedItem*************/


/** **********SelectedValue*************/
// 字符串类型
type StringSelectedValue = string | number

// picker选项类型
export type SelectedValue = StringSelectedValue | StringSelectedValue[]
/** **********SelectedValue*************/


/** ********** SelectedIndex*************/
// 字符串类型
type StringSelectedIndex = number

// picker选项类型
export type SelectedIndex = StringSelectedIndex | StringSelectedIndex[]
/** **********SelectedIndex*************/


/** ********** PickerSeekIndex*************/
// export type ColumnDatas = SelectedItem[]
/** **********PickerSeekIndex*************/

/** ********** PickerSeekIndex*************/
export interface PickerIndex {
  selectedItem: SelectedOption;
  selectedIndex: SelectedIndex;
  
}
/** **********PickerSeekIndex*************/


/** ********** PickerSeekValue*************/
export interface PickerValue {
  selectedItem: SelectedOption;
  selectedValue: SelectedValue;
}
/** **********PickerSeekValue*************/


/** ********** SeekMethods*************/
export interface SeekMethods {
  getIndexByValue: (data: any[], val: SelectedValue, valueKey: string) => any;
  getValueByIndex: (data: any[], selectedIndex: SelectedIndex, valueKey: string) => any;
}
/** **********SeekMethods*************/
