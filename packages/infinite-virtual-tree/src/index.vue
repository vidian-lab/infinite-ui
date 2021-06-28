<template>
  <div
    class="el-tree"
    :style="{ height: option.height + 'px' }"
    ref="scroller"
    @scroll="handleScroll"
  >
    <div
      class="infinite-tree__phantom"
      :style="{ height: contentHeight }"
    ></div>
    <div
      v-for="item in visibleData"
      :key="item.id"
      class="el-tree-node"
      :style="{
        paddingLeft: 18 * (item.level - 1) + 'px',
        height: option.itemHeight + 'px',
      }"
    >
      <div
        class="el-tree-node__content"
        :style="{ transform: `translateY(${offset}px)` }"
      >
        <span
          v-if="(item.children && item.children.length) || option.lazy"
          class="el-tree-node__expand-icon el-icon-caret-right"
          :class="item.expand ? 'expanded' : ''"
          @click="toggleExpand(item)"
        >
        </span>
        <span v-else style="margin-right: 5px"></span>
        <div class="el-tree-node__label">
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let lastTime = 0;
import minxin from "./mixin";
export default {
  name: "InfiniteVirtualTree",
  mixins: [minxin],
  data() {
    return {
      offset: 0, // translateY偏移量
      contentHeight: "0px",
      visibleData: [],
    };
  },

  computed: {
    flattenTree() {
      const _defaultExpand = this.defaultExpand;

      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        parent = null,
        defaultExpand = _defaultExpand
      ) {
        let arr = [];

        list.forEach((item) => {
          item.level = level;
          if (item.expand === undefined) {
            item.expand = defaultExpand;
          }
          if (item.visible === undefined) {
            item.visible = true;
          }
          if (!parent.visible || !parent.expand) {
            item.visible = false;
          }
          item.parent = parent;
          arr.push(item);
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            );
          }
        });
        return arr;
      };
      return flatten(this.tree, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: [],
      });
    },
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight);
    },
  },
  mounted() {
    this.updateView();
  },
  methods: {
    updateView() {
      this.getContentHeight();
      this.$emit("update", this.tree);
      this.handleScroll();
    },
    handleScroll() {
      let currentTime = +new Date();
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.scroller.scrollTop);
        lastTime = currentTime;
      }
    },
    updateVisibleData(scrollTop = 0) {
      let start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2);
      start = start < 0 ? 0 : start;
      const end = start + this.visibleCount * 2;
      const allVisibleData = (this.flattenTree || []).filter(
        (item) => item.visible
      );
      this.visibleData = allVisibleData.slice(start, end);
      this.offset = start * this.option.itemHeight;
    },

    getContentHeight() {
      this.contentHeight =
        (this.flattenTree || []).filter((item) => item.visible).length *
          this.option.itemHeight +
        "px";
    },

    toggleExpand(item) {
      // 支持懒加载
      if (this.option.lazy) {
        // 挂载子节点
        const loadFn = this.option.load;
        if (loadFn) {
          loadFn(item, (data) => {
            // 挂载子节点
            item.children = [];
            data.forEach((child) => {
              child.level = item.level + 1;
              child.visible = true;
              child.expand = false;
              child.parent = {
                id: item.id,
                label: item.name,
                level: item.level,
              };
              item.children.push(child);
            });
            const isExpand = item.expand;
            if (isExpand) {
              this.collapse(item, true); // 折叠
            } else {
              this.expand(item, true); // 展开
            }
            this.updateView();
          });
        }
      } else {
        const isExpand = item.expand;
        if (isExpand) {
          this.collapse(item, true); // 折叠
        } else {
          this.expand(item, true); // 展开
        }
        this.updateView();
      }
    },

    //展开节点
    expand(item) {
      item.expand = true;
      this.recursionVisible(item.children, true);
    },
    //折叠节点
    collapse(item) {
      item.expand = false;
      this.recursionVisible(item.children, false);
    },

    //折叠所有
    collapseAll(level = 1) {
      this.flattenTree.forEach((item) => {
        item.expand = false;
        if (item.level != level) {
          item.visible = false;
        }
      });
      this.updateView();
    },

    //展开所有
    expandAll() {
      this.flattenTree.forEach((item) => {
        item.expand = true;
        item.visible = true;
      });

      this.updateView();
    },

    //递归节点
    recursionVisible(children, status) {
      children.forEach((node) => {
        node.visible = status;
        if (node.children) {
          this.recursionVisible(node.children, status);
        }
      });
    },
    // 刷新树节点
    referesh() {
      this.updateView();
    },
  },
};
</script>

<style scoped>
</style>