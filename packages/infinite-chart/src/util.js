/**
 * @description 根据数据获取通用的缩放配置
 * @param {Array} data
 * @param {Number} tick 传入的间隔
 * @returns {Object}
 */
const getCommonScale = function (data, tick) {
  // 通用配置5段，可以从外部传入控制
  // 获取大小值
  if (!isArray(data)) return '请传入数组参数'
  if (!data.length) return '数组长度必须大于1'
  const division = getArraysBoundary(data)
  const result = getDivision(division, tick)
  return {
    min: result[0],
    max: result[1]
  }
}

/**
 * @description 获取数组边界值
 * @param {Array} array 传入数组
 * @returns Object
 */
const getArraysBoundary = function (array) {
  const value = array.sort((a, b) => {
    return a - b
  })
  const min = value.shift()
  const max = value.pop()
  return {
    min, max
  }
}

/**
 * @description 获取格式化之后的边界值
 * @param {Object} division
 * @param {Number} tick
 * @returns Array
 */
const getDivision = function (division, tick = 4) {
  // 首先判断 边界值是否是倍数值.
  const { min, max } = division
  const result = (max - min) / tick
  // 根据类型，扩展到最完整的值。
  // 根据 差值长度，判断是否需要多层次判断。根据差值的长度来判断
  // 获取步进差值, 最大值为3位数，10，2位数则为1
  let step = Math.pow(10, (max + '').length - 2)

  let realStep = Math.ceil(result / step) * step
  let endStep = Math.ceil(max / step) * step
  let startStep = endStep - tick * realStep
  return [startStep, endStep]
}

/**
 * @description 判断是不是整数
 * @param {Number} value
 * @returns Boolean
 */
const isInteger = function (value) {
  return (typeof value === 'number') && value % 1 === 0
}

/**
 * @param {Object} chart chart 对象
 * @param {Array} lineArray Gemo的配置
 * @param {Array} data 原始数据
 * @param {Array/Object} config
 * @returns {chart} chart 对象
 */
const setScale = function (chart, lineArray, data, config) {
  // 首先获取 配置数据
  const result = []
  let { tickCount = 5 } = config
  lineArray.forEach(item => {
    // position 必选
    const { position } = item
    const name = position.split('*')[0]
    const key = position.split('*')[1]
    data.forEach(i => {
      if (i[name] && i[key]) {
        result.push(i[key])
      }
    })
  })
  const { min, max } = getCommonScale(result, tickCount)
  // 设置通用配置值
  const defaultScale = { min, max, nice: true, tickCount }
  // 传入一个配置，并且没有指明name
  // 统一配置各配置的配置
  if (typeof config === 'object' && !Array.isArray(config)) {
    Object.assign(defaultScale, config)
  }
  // 遍历设置scale
  lineArray.forEach(item => {
    const { position } = item
    const key = position.split('*')[1]
    const lastConfig = Object.assign(getConfig(config, key), defaultScale)
    chart.scale(key, lastConfig)
  })

  function getConfig (config = [], name) {
    // 增加类型判断
    if (Array.isArray(config)) {
      return config.find((item) => {
        return item.name === name
      })?.config || {}
    } else {
      return config || {}
    }
  }
  return chart
}

/**
 * @param {*} chart chart
 * @param {Array} ToolTips 提示配置
 * @returns chart chart 对象
 */
const setToolTips = function (chart, ToolTips = []) {
  // 配置提示框
  const toolConfig = ToolTips[0]
  if (!ToolTips.length) {
    chart.tooltip(false)
  } else {
    // 读取slot 对应的配置信息
    // 获取 itemTplFunc
    // 对单独的tooltips 执行判断
    const { visible } = toolConfig
    // 如果不展示， 默认不读取
    if (!visible) {
      chart.tooltip(false)
      return chart
    }
    chart.tooltip(toolConfig)
  }
  return chart
}

/**
 * @description 设置图形类
 * @param {Object} chart chart 对象
 * @param {String} type 图形类型
 * @param {Object} intervalConfig 柱状图配置
 * @param {Array} GemoConfig 图形配置
 * @returns chart chart 对象
 */
const setGemo = function (chart, type, intervalConfig, GemoConfig = []) {
  // 首先判断当前的Gemo 类型 , 柱状图, 如果是柱状图，也可以走下面的
  if (type === 'interval' && intervalConfig && intervalConfig.type) {
    // 如果是 组合柱状图，必须传入选择的固定类型
    // 优先获取Chart内部的配置
    let config = intervalConfig
    const { position, multiName, adjust = [{
      type: 'dodge'
    }] } = config
    if (!position) return '请传入合法的position值'
    chart.interval().position(position).color(multiName).adjust(adjust)
  } else {
    // 获取line 相关的配置，也可能没有配置，也可能有多个的配置，比如多线条，
    GemoConfig.length && GemoConfig.forEach(item => {
      let {
        position,
        size = 1,
        shape = 'smooth',
        color
      } = item
      let gemo = chart[type]({
        sortable: true
      })
      if (position) {
        gemo.size(size).position(position).shape(shape)
      }
      if (color) {
        gemo.color(color)
      }
    })
  }
  return chart
}

/**
 * @description 设置坐标轴类
 * @param {Object} chart chart 对象
 * @param {Array} type 坐标轴类配置
 * @returns chart chart 对象
 */
const setAxis = function (chart, axisConfig) {
  // 坐标轴会是一个数组，可以针对多坐标轴
  if (Array.isArray(axisConfig) && axisConfig && axisConfig.length) {
    axisConfig.forEach(axisConfig => {
      const { name } = axisConfig
      // 如果没有配置name, 那么针对的就是所有的坐标轴
      if (!name) {
        chart.axis(axisConfig)
      } else {
        chart.axis(name, axisConfig)
      }
    })
    return chart
  }
}

/**
 * @description 获取Chart对应的配置项的颜色属性
 * @param {*} chart
 */
const getChartColor = function (chart) {
  const result = []
  chart.geometries.forEach(geom => {
    const { theme, attributeOption } = geom
    if (!theme) {
      const { color, position } = attributeOption
      result.push({
        position,
        color
      })
    }
  })
  return result
}

const getGeomColor = function (colors, name) {
  if (!isArray(colors)) return '入参不符合规范'
  const result = colors.find((color) => {
    if (color.position && isArray(color.position.fields)) {
      return color.position.fields.includes(name)
    }
  })
  if (result && result.color && result.color.fields) {
    return result.color.fields
  } else {
    // 如果获取不到对应的color。那么直接抛出chart 内部的colors
    return []
  }
}

/**
 * @description 返回chart被使用的name
 * @param {Object} chart 对象
 * @param {Array} legends 图例组件
 * @returns {Array} 绑定使用的names
 */
const getNames = function (legends) {
  const result = []
  legends.forEach(legend => {
    const { names } = legend
    // 属性判断
    if (isArray(names)) {
      result.concat(names)
    } else if (isString(names)) {
      // 如果是按照字符串连接的，那么需要切割
      result.push(names.split(','))
    }
  })
  if (isArray([...new Set(result)][0])) {
    return [...new Set(result)][0]
  } else {
    return []
  }
  // return [...new Set(result)][0] || []
}

const getIntervalColor = function (chart, name, intervalConfig, data) {
  const { themeObject } = chart
  const { colors10 } = themeObject
  // 获取names 对应的排序。
  // 首先获取names 正确的排序
  const { multiName } = intervalConfig
  const names = []
  data.forEach(item => {
    let ele = item[multiName]
    if (ele && !names.includes(item[multiName])) {
      names.push(ele)
    }
  })
  const index = names.indexOf(name)
  return colors10[index]
}

/**
 * @description 设置图例的相关方法
 * @param {*} chart chart 对象
 * @param {Array} legends 内部从组件内继承的配置
 * @param {Array} config legend 的配置对象
 * @param {Object} intervalConfig intervalConfig 配置对象
 * @param {String} type type chart 类型
 * @param {Array} data 原始数据
 */
const setLegend = function (chart, legends, config, intervalConfig, type, data) {
  // 优先取Chart 内部的配置
  const names = getNames(legends)
  const colors = getChartColor(chart)
  function getConfig (legends, name) {
    // 获取所有包含当前name的图例配置
    const result = legends.filter(item => {
      return item.names.includes(name)
    })
    // 柱状图特殊处理
    let fillColor = getGeomColor(colors, name)[0]
    if (type === 'interval' && isObject(intervalConfig)) {
      fillColor = getIntervalColor(chart, name, intervalConfig, data)
    }
    let defaultMarker = {
      symbol: 'square',
      style: {
        fill: fillColor
      }
    }
    if (result.length) {
      result.forEach(i => {
        // 获取 legend上的所有配置
        const { marker = {} } = i
        defaultMarker = mergeDeep(defaultMarker, marker)
      })
      // 获取默认的legend的配置数据，默认最下面。默认值+方块+默认颜色
      // 配置各个属性
      return {
        name,
        value: name,
        marker: defaultMarker
      }
    } else {
      // return {
      //   name,
      //   value: name,
      //   marker: defaultMarker
      // }
    }
  }

  function setConfig (names, legends) {
    const items = []
    names.forEach(item => {
      const defaultConfig = getConfig(legends, item)
      items.push(defaultConfig)
    })
    return {
      custom: true,
      items: items
    }
  }

  function getGolbalConfig (legends) {
    let result = {}
    legends.forEach(item => {
      result = mergeDeep(result, item)
    })
    return result
  };

  // 优先走默认的Chart组件上的配置，然后再走legend的配置。如果都没有则走系统默认的配置
  if (config && isObject(config)) {
    chart.legend(setConfig(names, config))
  } else if (isArray(legends) && legends.length) {
    const defaultConfig = setConfig(names, legends)
    // 获取通用的全局配置
    // getGolbalConfig
    const golbalConfig = getGolbalConfig(legends)
    const lastConfig = Object.assign(golbalConfig, defaultConfig)
    chart.legend(lastConfig)
  } else {
    chart.legend(false)
  }
  return chart
}

function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

function isString (value) {
  return Object.prototype.toString.call(value) === '[object String]'
}

function mergeDeep (...objects) {
  const isObject = obj => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      const pVal = prev[key]
      const oVal = obj[key]
      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = pVal.concat(...oVal)
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

export {
  getCommonScale,
  setScale,
  setToolTips,
  setGemo,
  setAxis,
  isInteger,
  getArraysBoundary,
  getDivision,
  setLegend,
  getGeomColor,
  mergeDeep
}
