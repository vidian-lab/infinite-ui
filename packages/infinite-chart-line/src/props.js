const LINE_PROPS = {
  shape: {
    type: String
  },
  smooth: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    required: true,
    validator: function (value) {
      // 必须包含 *
      return value.indexOf('*') > 0
    }
  },
  size: {
    type: Number | String
  },
  color: {
    type: String
  }
}

export default LINE_PROPS
