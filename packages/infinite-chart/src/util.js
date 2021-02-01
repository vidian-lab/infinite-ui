/**
 * @description 根据数据获取通用的缩放配置
 * @param {Array} data
 * @param {Number} tick 传入的间隔
 * @returns {Object}
 */
const getCommonScale = function (data, tick) {
  // 通用配置5段，可以从外部传入控制
  // 获取大小值
  if (!Array.isArray(data)) return '请传入数组参数'
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
 * @returns chart chart 对象
 */
const setScale = function (chart, lineArray, data, config) {
  // 首先获取 配置数据
  const result = []
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
  const { min, max } = getCommonScale(result)
  // 设置通用配置值
  const defaultScale = { min, max, nice: true }
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
    return config.find((item) => {
      return item.name === name
    })?.config || {}
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
  if (!ToolTips.length) {
    chart.tooltip(false)
  } else {
    // 读取slot 对应的配置信息
    // 获取 itemTplFunc
    if (ToolTips[0].itemTplFunc) {
      const itemTpl = ToolTips[0].itemTplFunc()
      ToolTips[0].itemTpl = itemTpl
      chart.tooltip(ToolTips[0])
    } else {
      chart.tooltip()
    }
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
  // 首先判断当前的Gemo 类型 , 柱状图
  if (type === 'interval') {
    // 如果是 组合柱状图，必须传入选择的固定类型
    // 优先获取Chart内部的配置
    let config
    if (intervalConfig && intervalConfig.type) {
      config = intervalConfig
    } else if (GemoConfig.length) {
      config = GemoConfig[0]
    } else {
      // 都没有，那就挂了
      return '请最少传入一个配置'
    }
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

export {
  getCommonScale,
  setScale,
  setToolTips,
  setGemo,
  setAxis,
  isInteger
}
