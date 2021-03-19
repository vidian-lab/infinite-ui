
<script>
import InfiniteStep from './infiniteStep'
import ElSteps from 'element-ui/lib/steps'
export default {
  name: 'InfiniteSteps',
  inheritAttrs: false,
  components: {
    InfiniteStep,
    ElSteps
  },
  model: {
    prop: 'active',
    event: 'input'
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    // steps的数据
    stepsData: {
      type: Array,
      default: () => []
    },
    // 是否跳跃步骤方法
    isSkipMethod: {
      type: Function,
      default: () => false
    }
  },
  render (h) {
    const { stepsData, active } = this

    // 获取根据数据驱动来的step组件
    const stepList = stepsData.map(step => {
      return (h('infinite-step', {
        attrs: step
      }))
    })

    // 优先使用stepsData去占位
    return h('el-steps', {
      props: {
        ...this.$attrs,
        active
      },
      on: this.$listeners,
      class: 'infinite-steps'
    }, [stepList.length ? stepList : this.$slots.default]
    )
  }
}
</script>
