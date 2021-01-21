const TOOL_TIPS_PROPS = {
  // 是否可见
  visible: {
    type: Boolean,
    default: false
  },
  // 提示标线
  // 接受 true/false, 'x', 'cross'
  crosshairs: {
    type: Boolean | String,
    default: false
  },
  // 固定展示图层位置
  // 接受 {x,y} 形式参数
  showPoint: {
    type: Array | Boolean,
    default: false
  },
  // 漂移量，相对于X轴的漂移量
  offset: {
    type: Number | String,
    default: 10
  },
  // 辅助线配置
  crossLine: {
    type: Object,
    default: () => {
      return {
        stroke: '#666', // 辅助线的颜色
        lineWidth: 2, // 辅助线的宽度
        lineDash: [2, 3] // 设置虚线样式
      }
    }
  },
  // 展示边距
  padding: {
    type: Array,
    default: (x) => {
      return [10]
    }
  },
  // 渲染提示层。外层
  containerTpl: {
    type: String | Boolean,
    default: false
  },
  // 渲染提示层。接受4个参数 index,color,name,value
  itemTpl: {
    type: String | Boolean,
    default: false
  },
  // 提示层dom样式
  domStyles: {
    type: Object
  },
  // 是否展示
  showItemMarker: {
    type: Boolean
  },
  shared: {
    type: Boolean
  }
}

export default TOOL_TIPS_PROPS
