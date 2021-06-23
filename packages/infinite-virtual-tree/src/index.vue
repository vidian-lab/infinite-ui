<template>
  <div
    class="infinite-virtual-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <infinite-tree
      ref="virtualTree"
      node-key="id"
      :style="{ height: contentHeight, transform: `translateY(${offset}px)` }"
      v-bind="treeOptions"
      :load="loadFn"
    >
      <span slot-scope="{ data }">{{ data.label }}</span>
    </infinite-tree>
  </div>
</template>

<script>
let lastTime = 0;
import minxin from "./mixin";
// import ElTree from "element-ui/lib/tree";
import InfiniteTree from "../../infinite-tree/src/index.vue";
export default {
  name: "InfiniteVirtualTree",
  components: {
    InfiniteTree,
  },
  mixins: [minxin],
  data() {
    return {
      offset: 0, // translateY偏移量
      contentHeight: "0px",
      lazyData: [],
      visibleData: [],
      allNodeData: [],
      translateY: 0,
    };
  },
  computed: {
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight);
    },
  },
  mounted() {
    this.flattenTree();
    this.updateView();
  },
  methods: {
    handleScroll() {
      let currentTime = +new Date();
      if (currentTime - lastTime > this.timeout) {
        this.updateVisibleData(this.$refs.scroller.scrollTop);
        lastTime = currentTime;
        this.translateY = "";
      }
    },
    updateView() {
      this.getContentHeight();
      this.$emit("update", this.data);
      this.handleScroll();
    },
    updateVisibleData(scrollTop = 0) {
      this.visibleData = [];
      let start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2);

      start = start < 0 ? 0 : start;

      console.log(`scrollTop:${scrollTop}`,start);
      const end = start + this.visibleCount * 2;

      const allVisibleData = (this.allNodeData || []).filter(
        (item) => item.visible
      );

      this.visibleData = [...allVisibleData.slice(start, end)];
      this.offset = start * this.option.itemHeight;
    },
    getContentHeight() {
      this.contentHeight =
        (this.allNodeData || []).filter((item) => item.visible).length *
          this.option.itemHeight +
        "px";
    },

    toggleExpand(item) {
      // 点击支持异步加载
      if (this.lazy && this.load) {
        const loadFn = this.load;
        loadFn(item, (data) => {
          // 挂载子节点
          const nodeIndex =
            this.allNodeData.findIndex((t) => t.id === item.id) + 1;

          data.forEach((child, index) => {
            child.level = item.level + 1;
            child.visible = true;
            child.expand = false;
            child.parent = {
              id: item.id,
              label: item.label,
              level: item.level,
            };
            item.children.unshift(child);
            this.allNodeData.splice(nodeIndex + index, 0, child);
          });
          this.expandStateChange(item);
        });
      } else {
        this.expandStateChange(item);
      }
    },

    expandStateChange(item) {
      const isExpand = item.expand;
      if (isExpand) {
        this.collapse(item, true); // 折叠
      } else {
        this.expand(item, true); // 展开
      }
      this.updateView();
    },

    // 展开节点
    expand(item) {
      item.expand = true;
      this.recursionVisible(item.children, true);
    },
    // 折叠节点
    collapse(item) {
      item.expand = false;
      this.recursionVisible(item.children, false);
    },

    // 折叠所有
    collapseAll(level = 1) {
      this.flattenTree.forEach((item) => {
        item.expand = false;
        if (item.level !== level) {
          item.visible = false;
        }
      });
      this.updateView();
    },

    // 展开所有
    expandAll() {
      this.flattenTree.forEach((item) => {
        item.expand = true;
        item.visible = true;
      });

      this.updateView();
    },

    loadFn(node, resolve) {
      const loadChildFn = this.treeOptions[0].loadFn;
      const that = this;
      if (!loadChildFn) {
        return;
      }
      loadChildFn(node, async (data) => {
        if (node.level === 0) {
          that.lazyData = data;
        } else {
          // 处理子节点
        }
        await that.flattenTree();
        await that.updateView();
        return resolve(that.visibleData);
      });
    },

    // 递归节点
    recursionVisible(children, status) {
      children.forEach((node) => {
        node.visible = status;
        if (node.children) {
          this.recursionVisible(node.children, status);
        }
      });
    },
    flattenTree() {
      const that = this;
      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        parent = null,
        defaultExpand = that.defaultExpand
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
          item.parent = {
            id: parent.id,
            expand: parent.expand,
            label: parent.label,
            level: parent.level,
            visible: parent.visible,
          };
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
        that.allNodeData = arr;
        return arr;
      };
      const cumputedData = this.treeOptions[0].lazy ? this.lazyData : this.data;
      return flatten(cumputedData, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: cumputedData,
      });
    },
  },
};
</script>
