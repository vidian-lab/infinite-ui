<template>
  <div
    class="infinite-card"
    :style="{
      'padding': padding
    }"
    :class="{
      'is-round': round,
      'shadow':shadow === 'always',
      'hover-shadow':shadow === 'hover',
      'medium':size === 'medium',
      'large':size === 'large',
    }"
  >
  <img
    v-if="shadowBackground && shadowBackground.url"
    :src="shadowBackground.url"
    :style="shadowBackground"
    alt=""
  />
  <!--title具名插槽-->
  <slot name="title">
    <i :class="icon" v-if="icon"> </i>
  </slot>
  <!--内容插槽-->
  <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'InfiniteCard',
  props: {
    // 边距
    padding: {
      type: String,
      default: '16px 20px'
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    shadow: {
      type: String,
      default: 'never',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['never', 'always', 'hover'].indexOf(value) !== -1
      }
    },
    // 背景色图片
    shadowBackground: {
      type: Object,
      validator: function (value) {
        // url 为必需值。
        const keys = Object.keys(value)
        if (keys.length) return keys.includes('url')
        return true
      }
    }
  },
  methods: {}
}
</script>
