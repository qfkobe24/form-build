import { VNodeData, VNode, PluginObject, PluginFunction, CreateElement } from 'vue'
import { RuleItem } from 'async-validator/dist-types'

type FormatFunc = (val: any, item: FormItem, model: any) => any
type RenderFunc = (h: CreateElement) => VNode

export type AnyFunction = (...args: any[]) => any
export type AnyObject = Record<string | number | symbol, any>

export interface FormItem extends VNodeData {
  id: string;
  component: 'input' | 'select';
  label: string;
  defaultValue?: any;
  rules?: RuleItem;
  inputFormat: FormatFunc;
  outputFormat: FormatFunc;
  renderStatic: RenderFunc;
  listen?: any;
  hidden: boolean;
}

interface FormBuild extends PluginObject<InstallOptions> {
  install: PluginFunction<any>
}

export interface InstallOptions {
  UIname: string,
  UIplugin?: AnyObject;
  UIcomponents?: any[];
}

export interface SelectOptions {
  label: string,
  value: string,
  disabled?: boolean,
  [propertyName: string]: any
}

export enum LabelPosition {
  left = 'left',
  top = 'top',
}

export enum LabelAlign {
  left = 'left',
  right = 'right',
  justify = 'justify'
}

export enum ContentAlign {
  left = 'left',
  right = 'right',
  center = 'center'
}

export enum ItemAlign {
  top = 'top',
  center = 'center'
}

export enum ElSize {
  medium = 'medium',
  small = 'small',
  mini = 'mini'
}

export type RenderOptionSlot = (h: CreateElement, option?: AnyObject, index?: number) => VNode

