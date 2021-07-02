<script>
import ElTooltip from 'element-ui/lib/tooltip'

export default {
  name: 'InfiniteOperation',
  components: { ElTooltip },
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    callBack: {
      type: Function,
      default: () => {}
    },
    bindData: {
      type: Object,
      default: () => ({})
    },
    tips: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    }
  },

  render (h) {
    const { icon, text, callBack, bindData, placement, tips } = this
    const enterable = false
    const vnodes = []
    if (icon) {
      return (
        <el-tooltip
          enterable={enterable}
          effect="light"
          content={tips}
          close-delay={0}
          open-delay={100}
          placement={placement}
        >
          <span
            onClick={(e) => {
              typeof callBack === 'function' && callBack(bindData)
            }}
          >
            <i class={icon}></i>
          </span>
        </el-tooltip>
      )
    }
    if (text) {
      vnodes.push(
        <span
          slot="title"
          onClick={(e) => {
            typeof callBack === 'function' && callBack(bindData)
          }}
          class={tips}
        >
          {text}
        </span>
      )
    }
    return vnodes
  }
}
</script>
