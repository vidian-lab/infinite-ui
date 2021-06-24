<template>
  <div
    class="infinite-virtual-tree"
    ref="scroller"
    :style="{ height: option.height + 'px' }"
    @scroll="handleScroll"
  >
    <infinite-tree
      ref="virtualTree"
      :data="visibleData"
      :style="{ height: contentHeight, transform: `translateY(${offset}px)` }"
      v-bind="treeOptions"
      :load="loadFn"
      :default-expanded-keys="defaultExpandedKeys"
      :node-collapse="nodeCollapse"
    >
      <span slot-scope="{ data }">{{ data.name }}</span>
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
      start: 0,
      defaultExpandedKeys: [],
    };
  },
  computed: {
    visibleCount() {
      return Math.floor(this.option.height / this.option.itemHeight);
    },
  },
  mounted() {
    this.lazyData = this.data;
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
      this.visibleData = this.getVisibleData(this.allNodeData, scrollTop);
      this.offset = this.start * this.option.itemHeight;
    },

    getVisibleData(allNodeData, scrollTop, isShowVisible = true) {
      let _visibleData = [];
      let _start = this.start;
      _start =
        Math.floor(scrollTop / this.option.itemHeight) -
        Math.floor(this.visibleCount / 2);

      _start = _start < 0 ? 0 : _start;
      const end = _start + this.visibleCount * 2;
      const allVisibleData = isShowVisible
        ? (allNodeData || []).filter((item) => item.visible)
        : allNodeData;
      _visibleData = [...allVisibleData.slice(_start, end)];
      this.start = _start;
      return _visibleData;
    },
    getContentHeight() {
      this.contentHeight =
        (this.allNodeData || []).filter((item) => item.visible).length *
          this.option.itemHeight +
        "px";
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
    expand() {},
    // 折叠节点
    collapse(item) {
      item.expand = false;
      this.recursionVisible(item.children, false);
    },

    nodeCollapse(data, node, self) {
  
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
          // 挂载子节点
          const nodeData = node.data;
          this.defaultExpandedKeys.push(nodeData.id);
          nodeData.expand = true;
          nodeData.children = [];
          const _data = that.getVisibleData(
            data,
            this.$refs.scroller.scrollTop || 0,
            false
          );
          _data.forEach((child) => {
            child.level = nodeData.level + 1;
            child.visible = true;
            child.expand = false;
            child.parent = {
              id: nodeData.id,
              label: nodeData.name,
              level: nodeData.level,
            };
            nodeData.children.unshift(child);
          });
          data = _data;
        }
        return resolve(data);
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
    flatten(
      list,
      childKey = "children",
      level = 1,
      parent = null,
      defaultExpand = this.defaultExpand
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
            ...this.flatten(
              item[childKey],
              childKey,
              level + 1,
              item,
              defaultExpand
            )
          );
        }
      });
      this.allNodeData = arr;
      return arr;
    },

    flattenTree() {
      const cumputedData = this.treeOptions[0].lazy ? this.lazyData : this.data;
      return this.flatten(cumputedData, "children", 1, {
        level: 0,
        visible: true,
        expand: true,
        children: cumputedData,
      });
    },
  },
};
</script>
