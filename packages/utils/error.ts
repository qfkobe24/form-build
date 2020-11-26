const errorPrefix: string = 'form-build:'
enum errorLevel {log = 'log', warn = 'warn', error = 'error'}

/**
 * 类型报错提示
 * @param expected 期望类型
 * @param got 实际类型
 * @param err 原生报错
 */
export function handleFormatError(id: string, expected: string, got: string, err?: Error) {
  try {
    console.error(`[${errorPrefix}:表单控件值类型错误] id为${id}的控件，期望值类型为${expected}，实际为${got}`)
  } catch (e) {
    if (err instanceof Error) {
      console.error(err)
    }
    console.error(e)
  }
}


/**
 * 类型报错提示
 * @param title 错误标题/类型
 * @param message 自定义报错信息
 * @param level 错误级别
 */
export function handleError(title: string, message: string, level = 'error') {
  console[errorLevel[level] || 'error'](`[Form-build ${level || errorLevel.error}]:[${title || 'unknown type'}] ${message || '未知错误'}`)
}

