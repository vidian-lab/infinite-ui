const LEGEND_PROPS = {
  // 绑定要配置属性的names
  names: {
    type: Array | String,
    required: true
  },
  // 布局方式
  layout: {
    type: String,
    validator: function (value) {
      const values = ['horizontal', 'vertical']
      return values.indexOf(value) !== -1
    }
  },
  // 图例的位置。
  position: {
    type: String,
    validator: function (value) {
      const values = ['top', 'top-left', 'top-right', 'right', 'right-top', 'right-bottom', 'left', 'left-top', 'left-bottom', 'bottom', 'bottom-left', 'bottom-right']
      return values.indexOf(value) !== -1
    }
  },
  // 背景框配置项
  background: {
    type: Object
  },
  // 分类图例，当图例项过多时是否进行分页。
  flipPage: {
    type: Boolean
  },
  // 适用于 连续图例，
  handler: {
    type: Object
  },
  // 适用于 分类图例，图例的高度，默认为 null。
  itemHeight: {
    type: Number
  },
  // 适用于 分类图例，图例的宽度，默认为 null。
  itemWidth: {
    type: Number
  },
  // 适用于 分类图例，图例的高度，默认为 null。
  itemName: {
    type: Object
  },
  // 适用于 分类图例，控制图例项水平方向的间距。
  itemSpace: {
    type: Number
  },
  // itemValue
  itemValue: {
    type: Object
  },
  // 动画开关
  animate: {
    type: Boolean
  },
  // 动画配置
  animateOption: {
    type: Object
  },
  // 适用于 连续图例，文本的配置项
  label: {
    type: Object
  },
  // 适用于 分类图例，图例项的 marker 图标的配置
  marker: {
    type: Object
  },
  // 适用于 连续图例，选择范围的最小值。
  min: {
    type: Number
  },
  // 适用于 连续图例，选择范围的最大值。
  max: {
    type: Number
  },
  // 适用于 分类图例， 图例项最大的宽度值
  maxWidth: {
    type: Number
  },
  // 适用于 分类图例， 图例项的最大高度值
  maxHeight: {
    type: Number
  },
  // 图例X方向的偏移距离
  offsetX: {
    type: Number
  },
  // 图例Y方向的偏移距离
  offsetY: {
    type: Number
  },
  // 适用于分类图例，图例背景色的配置
  rail: {
    type: Object
  },
  // 适用于 分类图例，是否将图例项逆序展示
  reversed: {
    type: Boolean
  },
  // 适用于连续图例，滑块是否可以滑动
  slidable: {
    type: Boolean
  },
  // 图例标题配置，默认不展示
  title: {
    type: Object
  },
  //  适用于 连续图例，选择范围的色块样式配置项。
  track: {
    type: Object
  },
  // 适用于 连续图例，选择的值。
  values: {
    type: Number
  },
  // 是否为自定义图例，当该属性为 true 时，需要声明 items 属性。
  custom: {
    type: Boolean
  },
  // 适用于 分类图例，用户自己配置图例项的内容
  items: {
    type: Object
  }
}

export default LEGEND_PROPS
