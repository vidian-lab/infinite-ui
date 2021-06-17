<template>
  <div
    class="vir-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <div class="vir-tree__phantom" :style="{ height: contentHeight }"></div>
    <div
      class="vir-tree__content"
      :style="{ transform: `translateY(${offset}px)` }"
    >
      <div
        v-for="(item, index) in visibleData"
        :key="item.id"
        class="vir-tree__list-view"
        :style="{
          paddingLeft: 18 * (item.level - 1) + 'px',
          height: option.itemHeight + 'px',
        }"
      >
        <i
          :class="item.expand ? 'vir-tree__expand' : 'vir-tree__close'"
          class="el-icon-caret-right"
          @click="toggleExpand(item)"
          v-if="(item.children && item.children.length) || lazy"
        />
        <span v-else style="margin-right: 5px"></span>
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
let lastTime = 0
export default {
  name: 'InfiniteVirtualTree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    defaultExpand: {
      type: Boolean,
      default: false
    },
    timeout: {
      // 刷新频率
      type: Number,
      default: 10
    },
    option: {
      // 配置对象
      type: Object,
      default: () => ({
        height: 500, // 滚动容器的高度
        itemHeight: 25 // 单个item的高度
      })
    },
    lazy: {
      // 是否懒加载
      type: Boolean,
      default: false
    },
    load: {
      type: [Function, undefined],
      default: undefined
    }
  },
  data () {
    return {
      offset: 0, // translateY偏移量
      contentHeight: '0px',
      visibleData: [],
      allNodeData: []
    }
  },
  computed: {
    visibleCount () {
      return Math.floor(this.option.height / this.option.itemHeight)
    }
  },
  mounted () {
    this.flattenTree()
    this.updateView()
  },
  methods: {
    handleScroll () {
      let currentTime = +new Date()
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.scroller.scrollTop)
        lastTime = currentTime
      }
    },
    updateView () {
      this.getContentHeight()
      this.$emit('update', this.treeData)
      this.handleScroll()
    },
    updateVisibleData (scrollTop = 0) {
      let start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2)
      start = start < 0 ? 0 : start
      const end = start + this.visibleCount * 2
      const allVisibleData = (this.allNodeData || []).filter(
        (item) => item.visible
      )

      this.visibleData = allVisibleData.slice(start, end)
      this.offset = start * this.option.itemHeight
    },
    getContentHeight () {
      this.contentHeight =
        (this.allNodeData || []).filter((item) => item.visible).length *
          this.option.itemHeight +
        'px'
    },

    toggleExpand (item) {
      // 点击支持异步加载
      if (this.lazy && this.load) {
        const loadFn = this.load
        loadFn(item, (data) => {
          // 挂载子节点
          const nodeIndex =
            this.allNodeData.findIndex((t) => t.id === item.id) + 1

          data.forEach((child, index) => {
            child.level = item.level + 1
            child.visible = true
            child.expand = false
            child.parent = {
              id: item.id,
              label: item.label,
              level: item.level
            }
            item.children.unshift(child)
            this.allNodeData.splice(nodeIndex + index, 0, child)
          })
          this.expandStateChange(item)

          // data.forEach((d) => {
          //   d.visible = true;
          // });
          // item.children = data;
          // debugger;
          // this.updateView();
        })
      } else {
        this.expandStateChange(item)
      }
    },

    expandStateChange (item) {
      const isExpand = item.expand
      if (isExpand) {
        this.collapse(item, true) // 折叠
      } else {
        this.expand(item, true) // 展开
      }
      this.updateView()
    },

    // 展开节点
    expand (item) {
      item.expand = true
      this.recursionVisible(item.children, true)
    },
    // 折叠节点
    collapse (item) {
      item.expand = false
      this.recursionVisible(item.children, false)
    },

    // 折叠所有
    collapseAll (level = 1) {
      this.flattenTree.forEach((item) => {
        item.expand = false
        if (item.level !== level) {
          item.visible = false
        }
      })
      this.updateView()
    },

    // 展开所有
    expandAll () {
      this.flattenTree.forEach((item) => {
        item.expand = true
        item.visible = true
      })

      this.updateView()
    },

    // 递归节点
    recursionVisible (children, status) {
      children.forEach((node) => {
        node.visible = status
        if (node.children) {
          this.recursionVisible(node.children, status)
        }
      })
    },
    flattenTree () {
      const that = this
      const flatten = function (
        list,
        childKey = 'children',
        level = 1,
        parent = null,
        defaultExpand = that.defaultExpand
      ) {
        let arr = []
        list.forEach((item) => {
          item.level = level
          if (item.expand === undefined) {
            item.expand = defaultExpand
          }
          if (item.visible === undefined) {
            item.visible = true
          }
          if (!parent.visible || !parent.expand) {
            item.visible = false
          }
          item.parent = {
            id: parent.id,
            expand: parent.expand,
            label: parent.label,
            level: parent.level,
            visible: parent.visible
          }
          arr.push(item)
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            )
          }
        })
        that.allNodeData = arr
        return arr
      }
      return flatten(this.treeData, 'children', 1, {
        level: 0,
        visible: true,
        expand: true,
        children: this.treeData
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.vir-tree {
  position: relative;
  overflow-y: scroll;
  &__phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }

  &__content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 100px;
  }

  &__list-view {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &__content__item {
    padding: 5px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    cursor: pointer;
  }
  &__content__item:hover,
  &__content__item__selected {
    background-color: #d7d7d7;
  }
  &__content__item__icon {
    position: absolute;
    left: 0;
    color: #c0c4cc;
    z-index: 10;
  }
  &__expand {
    transform: rotate(90deg);
  }
}
</style>
