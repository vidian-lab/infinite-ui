## DragContainer 拖拽容器

常用的操作。

### 基础用法

基础的拖拽操作。
:::demo 在main.js中加载组件并执行Vue.prototype.$InfiniteDragContainer = InfiniteDragContainer使用，若是局部引入，则加载组件后直接使用InfiniteDragContainer

```html
<el-row>
  <infinite-button type="primary" @click="open">点击生成</infinite-button>
  <infinite-button type="primary" @click="open({dragDirection: 'horizontal'})">点击生成水平拖拽的</infinite-button>
  <infinite-button type="primary" @click="openComp">点击生成组件型</infinite-button>
</el-row>
<el-row>
  <infinite-button type="primary" @click="remove">点击移除</infinite-button>
</el-row>
<script>
  export default {
    data() {
      return {
        el: null,
      };
    },
    methods: {
      open(option = {}) {
        this.$InfiniteDragContainer.remove()
        this.$InfiniteDragContainer({
          platform: (h) => {
            return h('div', {
              'data-lot': '66'
            }, [
              h('span', null, '拖拽 '),
              h('i', { style: 'color: teal' }, '内容')
            ])
          },
          style: {
            right: '20px',
            bottom: '20px'
          },
          dragDirection: option.dragDirection || 'normal',
          click: action => {
            
          }  
        })
      },
      openComp(option = {}) {
        this.$InfiniteDragContainer.remove()
        this.$InfiniteDragContainer({
          platform: (h) => {
            return h('infinite-button', {
              attrs: {
                type: 'primary',
                size: 'medium'
              },
            }, 'this is infinite-button')
          },
          style: {
            right: '20px',
            bottom: '20px'
          },
          dragDirection: option.dragDirection || 'normal',
          click: action => {
            
          }  
        })
      },
      close() {
        this.$InfiniteDragContainer.close()
      },
      remove() {
        this.$InfiniteDragContainer.remove()
      },
    },
  };
</script>
```

:::

### Attribute

| 参数   | 说明     | 参数           |
| ------ | -------- | -------------- |
| platform  | 拖拽的节点 | vNode / 含闭合标签的string     |
| style  | 拖拽的起点样式 | {right: 0, bottom: 0}         |
| click  | 点击事件为click | click      |
| dragDirection  | 可拖拽方向 | normal / horizontal / vertical   |
### Function

| 参数   | 说明     | 参数           |
| ------ | -------- | -------------- |
| creat  | 创建/显示节点 | Option         |
| close  | 隐藏节点 |  |
| remove | 移除节点 |  |
