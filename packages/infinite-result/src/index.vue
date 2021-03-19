<script>
export default {
  name: 'InfiniteResult',
  props: {
    status: {
      type: String,
      default: 'info'
    },
    title: String,
    subTitle: String
  },
  methods: {
    getElStatus () {
      return this.$createElement('div', {
        class: `infinite-result-status is-${!this.$slots.icon ? this.status : ''}`
      }, [this.$slots.icon || this.$createElement('i', { class: `el-icon-${this.status}` })])
    },
    getElTitle () {
      if (this.title) {
        return this.$createElement('div', {
          class: `infinite-result-title`,
          domProps: {
            innerHTML: this.title
          }
        })
      }
      return []
    },
    getElsubTitle () {
      if (this.subTitle) {
        return this.$createElement('div', {
          class: `infinite-result-subtitle`,
          domProps: {
            innerHTML: this.subTitle
          }
        })
      }
      return []
    },
    getSlotDefault () {
      if (this.$slots.default) {
        return this.$createElement('div', {
          class: 'infinite-result-extra'
        }, [this.$slots.default])
      }
      return []
    }
  },
  render (h) {
    return h('div', {
      class: 'infinite-result'
    }, [this.getElStatus(), this.getElTitle(), this.getElsubTitle(), this.getSlotDefault()])
  }
}
</script>
