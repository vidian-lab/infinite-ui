<script>
import ElOption from 'element-ui/lib/option'
export default {
  name: 'infiniteOption',
  inheritAttrs: false,
  components: {
    ElOption
  },
  render (h) {
    return h('el-option', {
      props: this.$attrs,
      on: this.$listeners
    }, [this.$slots.default])
  }
}
</script>
