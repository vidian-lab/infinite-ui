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
    required: true
  },
  size: {
    type: Number | String
  },
  color: {
    type: String
  }
}

export default LINE_PROPS
