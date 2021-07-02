<template>
  <el-tooltip
    :effect="effect"
    :content="tipsContentText"
    :placement="placement"
    :enterable="enterable"
    :open-delay="openDelay"
    :disabled="getToolTipsDisabled"
    :popper-class="popperClass"
    v-bind="options"
  >
    <span
      class="infinite-tooltips"
      :style="{ width: maxWidth + 'px' }"
      :class="{
        'infinite-tooltips-hover': !getToolTipsDisabled,
        'infinite-tooltips-slot-text': $slots.tipsContent,
      }"
    >
      <template v-if="!$slots.tipsContent">
        {{ renderText }}
      </template>
      <slot v-else name="tipsContent"></slot>
    </span>
  </el-tooltip>
</template>

<script>
import ElTooltip from 'element-ui/lib/tooltip'
import { getTextWidth } from 'infinite-ui/packages/utils/index'
export default {
  name: 'InfiniteToolTips',
  components: {
    ElTooltip
  },
  props: {
    effect: {
      type: String,
      default: 'dark'
    },
    renderText: {
      type: String,
      default: ''
    },
    tipsContent: {
      type: String,
      default: ''
    },
    enterable: {
      type: Boolean,
      default: false
    },
    openDelay: {
      type: Number,
      default: 500
    },
    placement: {
      type: String,
      default: 'top-start'
    },
    popperClass: {
      type: String,
      default: 'infinite-text-tooltips'
    },
    maxWidth: {
      type: Number,
      default: 300
    },
    showTips: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tipsContentText: ''
    }
  },
  computed: {
    getToolTipsDisabled () {
      return this.showTips
        ? false
        : getTextWidth(this.tipsContentText || this.renderText) < this.maxWidth
    }
  },
  mounted () {
    this.getTipsContentText()
  },
  methods: {
    getTipsContentText () {
      if (!this.$slots.tipsContent) {
        this.tipsContentText = this.renderText
      }
    }
  }
}
</script>
