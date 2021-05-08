<template>
  <div
    class="infinite-drag-container"
    ref="InfiniteDragContainerWrapper"
    v-show="visible"
    @click.stop="handleAction('click')"
    @mousedown.stop="(ev) => {handleMousedown(ev)}">
      <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  methods: {
    handleRemove (action) {
      window.removeEventListener('mouseup', this.handleMouseup)
      window.removeEventListener('mousemove', this.handleMousemove)
    },
    handleAdd (action) {
      window.addEventListener('mouseup', this.handleMouseup)
      window.addEventListener('mousemove', this.handleMousemove)
    },
    handleAction (action) {
      this.action = action
      const flag = Math.abs(this.cx - this.targetLeft) < 1 && Math.abs(this.cy - this.targetTop) < 1
      setTimeout(() => {
        if (this.action && ['function'].includes(typeof this.click)) this.click(this.action, flag, this)
      })
    },
    handleMousedown (ev) {
      this.handleAdd()
      this.move = false
      ev.preventDefault()
      ev.stopPropagation()
      const { InfiniteDragContainerWrapper } = this.$refs
      this.clientWidth = document.body.clientWidth // 屏幕的宽
      this.clientHeight = document.body.clientHeight  
      this.targetLeft = ev.clientX // 点击点在视图的位置
      this.targetTop = ev.clientY
      this.targetOffsetWidth = InfiniteDragContainerWrapper.offsetWidth // 拖拽容器的宽
      this.targetOffsetHeight = InfiniteDragContainerWrapper.offsetHeight
      const { right, bottom } = getComputedStyle(InfiniteDragContainerWrapper, null)
      this.initialRight = parseInt(right.replace('px', '')) // 拖拽容器右下角的定位位置
      this.initialBottom = parseInt(bottom.replace('px', ''))
      this.move = true
    },
    handleMousemove (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      if (this.move) {
        const { InfiniteDragContainerWrapper } = this.$refs
        this.cx = ev.clientX // 移动点在视图的位置
        this.cy = ev.clientY
        // /** 元素在视图的定位 */
        let fx = this.targetLeft - this.cx + this.initialRight
        let fy = this.targetTop - this.cy + this.initialBottom

        /** 防止超出父元素范围 */
        if (fx < 0) fx = 0
        if (fy < 0) fy = 0
        if (fx > this.clientWidth - this.targetOffsetWidth) fx = this.clientWidth - this.targetOffsetWidth
        if (fy > this.clientHeight - this.targetOffsetHeight) fy = this.clientHeight - this.targetOffsetHeight
        switch (this.dragDirection) {
          case 'horizontal': // 水平
            InfiniteDragContainerWrapper.setAttribute('style', `right:${fx}px;`)    
            break
          case 'vertical': // 垂直
            InfiniteDragContainerWrapper.setAttribute('style', `bottom:${fy}px;`)    
            break
          default:
            InfiniteDragContainerWrapper.setAttribute('style', `right:${fx}px;bottom:${fy}px`)
            break
        }
      }
    },
    handleMouseup (ev) {
      this.cx = ev.clientX
      this.cy = ev.clienty
      ev.preventDefault()
      ev.stopPropagation()
      this.move = false
      this.handleRemove()
    }
  },
  data () {
    return {
      move: false,
      clientWidth: 0, // 网页可见区域宽
      clientHeight: 0, // 网页可见区域高
      initialRight: 0,
      initialBottom: 0,
      targetLeft: 0,
      targetTop: 0,
      cx: 0,
      cy: 0,
      targetOffsetWidth: 0,
      targetOffsetHeight: 0,
      action: '',
      callback: null,
      click: null,
      platform: null,
      style: {},
      visible: false,
      dangerouslyUseHTMLString: false,
      dragDirection: 'normal'
    }
  }
}
</script>
