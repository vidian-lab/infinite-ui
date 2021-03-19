<script>
import ElStep from 'element-ui/lib/step'
export default {
  name: 'InfiniteStep',
  inheritAttrs: false,
  components: {
    ElStep
  },
  data () {
    return {
      steps: [],
      childStep: {}
    }
  },
  computed: {
    active () {
      return this.$parent.active
    },
    alignCenter () {
      return this.$parent.alignCenter
    },
    simple () {
      return this.$parent.simple
    },
    stepOffset () {
      return this.$parent.stepOffset
    },
    direction () {
      return this.$parent.direction
    },
    finishStatus () {
      return this.$parent.finishStatus
    },
    processStatus () {
      return this.$parent.processStatus
    },
    space () {
      return this.$parent.space
    }
  },
  mounted () {
    // 将el-step注入至父节点el-steps内
    this.$parent.steps.push(this.steps[0])
    this.childStep = this.steps[0]
    // 由于el-step使用父节点的 steps、 $children，这里设置 steps、 $children 为父节点的steps
    this.$children = this.steps = this.$parent.steps
  },
  render (h) {
    return h('el-step', {
      props: this.$attrs,
      nativeOn: {
        click: () => {
          const crtIndex = this.childStep.index
          const parentVm = this.$parent.$parent
          if (parentVm.isSkipMethod(crtIndex)) {
            parentVm.$emit('input', crtIndex)
          }
        }
      },
      on: this.$listeners,
      scopedSlots: {
        icon: () => {
          return this.$slots.icon
        },
        title: () => {
          return this.$slots.title
        },
        description: () => {
          return this.$slots.description
        }
      },
      'class': 'infinite-step'
    }, [])
  }

}
</script>
