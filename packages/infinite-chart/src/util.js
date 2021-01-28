/**
 * @description 根据数据获取通用的缩放配置
 * @param {Array} data
 * @param {Number} tick 传入的间隔
 * @returns {Object}
 */
const getCommonScale = function (data, tick) {
  // 通用配置5段，可以从外部传入控制
  // 获取大小值
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
 */
const getArraysBoundary = function (array) {
  if (!Array.isArray(array)) return '请传入数组'
  const value = array.sort((a, b) => {
    return a - b
  })
  const min = value.shift()
  const max = value.pop()
  return {
    min, max
  }
}

const getDivision = function (division, tick = 4) {
  // 首先判断 边界值是否是倍数值.
  const { min, max } = division
  const result = (max - min) / tick
  const length = (Math.ceil(result) + '').length
  // 根据类型，扩展到最完整的值。
  // 根据 差值长度，判断是否需要多层次判断。根据差值的长度来判断
  const newTick = Math.ceil(result / Math.pow(10, length - 1)) * Math.pow(10, length - 1)
  return [0, newTick * tick]
}

const isInteger = function (value) {
  return (typeof value === 'number') && value % 1 === 0
}

/**
 *
 * @param {Obejct} chart chart 对象
 * @param {*} lineArray 原始数据
 * @param {*} config
 */
const setScale = function (chart, lineArray, data, config) {
  // 首先获取 配置数据
  const result = []
  lineArray.forEach(item => {
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
 * @returns
 */
const setToolTips = function (chart, ToolTips) {
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

export {
  getCommonScale,
  setScale,
  setToolTips
}
