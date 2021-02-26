const TOOL_TIPS_PROPS = {
  // 是否可见
  visible: {
    type: Boolean,
    default: false
  },
  // 是否显示 tooltips 辅助线， 默认不展示
  showCrosshairs: {
    type: Boolean,
    default: false
  },
  // 提示标线的配置
  crosshairs: {
    type: Object,
    default: () => {
      return {
        type: 'x', // 接受 ‘x’, 'y', 'xy',
        follow: false, // 标线是否跟随鼠标活动
        textBackground: null, // 辅助线文本背景配置
        line: null, // 辅助线样式配置
        text: null // 文字样式配置
      }
    }
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
  // 是否展示自定义图形和提示的焦点配置
  showMarker: {
    type: Boolean,
    default: false
  },
  // 自定义焦点样式配置
  marker: {
    type: Object
  },
  shared: {
    type: Boolean
  },
  // 是否展示title，也就是X轴值
  showTitle: {
    type: Boolean
  }
}

export default TOOL_TIPS_PROPS
