<script>
import ElSelect from 'element-ui/lib/select'

export default {
  name: 'InfiniteSelect',
  inheritAttrs: false,
  components: {
    ElSelect
  },
  methods: {
    visibleChange (val) {
      !val && this.$refs.infiniteSelect.blur()
    }
  },
  render (h) {
    const slots = ['default', 'prefix', 'empty'].map(slot => (<template slot={slot}>{this.$slots[slot]}</template>))
    return h('el-select', {
      ref: 'infiniteSelect',
      props: this.$attrs,
      on: {
        'visible-change': this.visibleChange,
        ...this.$listeners
      }
    }, slots)
  }
}
</script>
