const AXIS_PROPS = {
  visible: {
    type: Boolean,
    default: false
  },
  // 配置哪一个轴。
  name: {
    type: String
  },
  // 动画开关
  animate: {
    type: Boolean,
    default: true
  },
  // 网格线配置
  grid: {
    type: Object
  },
  // 设置坐标轴文本的样式
  label: {
    type: Object
  },
  // 设置坐标轴的刻度线。如果该属性值为 null 则表示不展示。
  tickLine: {
    type: Object
  },
  // 设置当前坐标轴的摆放位置，可设置的值为top、bottom、left、right
  position: {
    type: String
  },
  // 当前坐标轴标题是否需要显示,及其样式配置。是否显示轴的 title 是默认不显示。如果需要显示需要将此属性配置为 true
  title: {
    type: Boolean | Object
  },
  // 设置坐标轴线的样式，包括线的颜色、粗细等。如果该属性值为 false 则表示不展示坐标轴线。
  line: {
    type: Object
  },
  // 当前坐标轴次刻度线样式配置。
  subTickLine: {
    type: Object
  }
}

export default AXIS_PROPS
