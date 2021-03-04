const propsConfig = {
  // 自适应
  autoFit: {
    type: Boolean,
    default: true
  },
  // 宽度
  width: {
    type: String | Number,
    default: 600
  },
  // 高度
  height: {
    type: String | Number,
    default: 400
  },
  // 数据来源
  chartData: {
    type: Array,
    require: true
  },
  // 接受度量衡缩放
  scale: {
    type: Object,
    default: () => {
      return []
    }
  },
  // 类型
  type: {
    type: String,
    default: 'line'
  },
  // 柱状图，是否采取分组模式，还是串行模式,以及配置
  intervalConfig: {
    type: Object
  }
}

export default propsConfig
