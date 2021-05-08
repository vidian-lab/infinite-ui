// 时间格式化
export const dateFormat = function (dateTime, valueFormat) {
  const WEEKS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let newDate = new Date(dateTime)
  valueFormat = valueFormat || 'yyyy-MM-dd'
  let date = {
    'yy': newDate.getFullYear(),
    'MM': newDate.getMonth() + 1,
    'dd': newDate.getDate(),
    'hh': newDate.getHours(),
    'mm': newDate.getMinutes(),
    'ss': newDate.getSeconds(),
    'D': WEEKS[newDate.getDay()]
  }
  // 输出年 y+:匹配1个到多个y,i:忽略大小写
  if (/(y+)/i.test(valueFormat)) {
    valueFormat = valueFormat.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 输出月、日、时、分、秒、星期
  Object.keys(date).forEach(function (i) {
    // 只有写成`(${i})`形式，才能在正则表达式中捕获子匹配，进而才能用到RegExp.$1的值
    if (new RegExp(`(${i})`).test(valueFormat)) {   
      // 判断，如果时间为一位数，则在前面加'0'
      if (RegExp.$1.length === 2) {
        if (date[i] < 10) {
          date[i] = `0${date[i]}`
        }
      }
      // 替换初始化函数时候传入yyyy-mm-dd hh:mm:ss D
      valueFormat = valueFormat.replace(RegExp.$1, date[i])
    }
  })
  return valueFormat
}

// 处理百分比
export const percentFormat = function (value) {
  if (!value) return '0%'
  value = value * 100
  return String(value).indexOf('.') > 0 ? `${value.toFixed(1)}%` : `${parseInt(value)}%`
}

// 处理千位分隔
export const numFormat = function (value) {
  if (!value) return 0
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  if (String(value).indexOf('.') > 0) {
    const list = value.toFixed(1).split('.')
    list[0] = String(list[0]).replace(reg, '$&,')
    return list.join('.')
  } else {
    return String(value).replace(reg, '$&,')
  }
}

// 驼峰转中划线
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

// 处理浮点数或整数(浮点数取一位/整数不做处理)  问题: floatIntFormat(0.58*100) 返回 58.0
export const floatIntFormat = function (value) {
  if (!value) return 0
  if (String(value).indexOf('.') > 0) {
    return value.toFixed(1)
  } else {
    return value
  }
}

// 颜色组
export const color = ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864']

// axis配置类
export class AxisOption {
  constructor (type, axisColor, showGrid) {
    let axisOption = { label: { textStyle: { fill: axisColor.labelColor } }, line: {} }
    if (type === 'x' || type === 'name') {
      axisOption['line']['stroke'] = axisColor.lineColor
      return axisOption
    } else {
      if (showGrid === false) {
        axisOption['grid'] = null
      }
      return axisOption
    }
  }
}

// json数据平铺
/**
 * @param {Array} json 数据源
 * @param {Object} props 传入的配置，目前值提供children
 * @param {Boolean} beforeInsert 是否提前插入
 * @param {Number} hierarchy 遍历层级，默认所有级别
 * 
*/
export const jsonFlat = function (json, props = { children: 'children' }, beforeInsert, hierarchy) {
  const { children } = props
  const result = []
  const jsonFlatting = (data, cpdHierarchy = 1) => {
    data.forEach(item => {
      // 相同级别移除children
      if (hierarchy === cpdHierarchy) {
        delete item[children]
      }
      beforeInsert && result.push(item)
      if (item[children] && item[children].length && (!hierarchy || hierarchy >= cpdHierarchy)) {
        jsonFlatting(item[children], cpdHierarchy + 1)
      }
      !beforeInsert && result.push(item)
    })
  }
  jsonFlatting(json)
  return result
}
export const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
export default {
  dateFormat,
  percentFormat,
  numFormat,
  floatIntFormat,
  color,
  AxisOption,
  jsonFlat,
  uuidv4,
  hyphenate
}
