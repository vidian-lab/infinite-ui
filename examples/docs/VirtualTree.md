## VirtualTree

加载大数据虚拟tree，支持懒加载和滚动显示。

### 基础用法

:::demo 

```html
<template>
    <div class="main">
     <infinite-button @click="refereshData">刷新数据</infinite-button>
        <infinite-virtual-tree ref="virtualTree" :tree="treeData" :defaultExpand="false" :option="option">
            <template v-slot="{ item }">
                <div>{{ item.name }}</div>
            </template>
        </infinite-virtual-tree>
    </div>
</template>

<script>
    // const maxNode = 10000; //最大的节点数
    const childNodesNumber = [0, 0]; //子节点数
    const maxLevel = 6; //最大嵌套层级
    const childRate = 0; //拥有子节点的概率
    const label = "节点"; //节点label

    let index = 0;

    const randomInteger = function(min, max) {
        let result = min - 0.5 + Math.random() * (max - min + 1);
        result = Math.round(result);
        return result;
    };

    const generateId = function() {
        ++index;
        return (
            Math.random()
            .toString()
            .slice(3) * 1
        );
    };
    const generateNode = function() {
        const id = generateId();
        return {
            id: id,
            name: `${label}_${id}`
        };
    };
    const generateChild = function(tree, level = 1, maxNode) {
        if (index > maxNode - 1) return;
        tree.children = [];
        const childNumber = randomInteger(childNodesNumber[0], childNodesNumber[1]);
        for (let i = 0; i < childNumber; i++) {
            if (index > maxNode - 1) break;
            let obj = generateNode();

            if (Math.random() < childRate && level < maxLevel) {
                generateChild(obj, ++level);
            }
            tree.children.push(obj);
        }
    };
    const generateData = function(maxNode) {
        let data = [];
        for (let index = 0; index < maxNode; index++) {
            let obj = generateNode();
            index < maxNode && generateChild(obj);
            data.push(obj);
        }
        return data;
    };
    export default {
        data() {
            return {
                treeData: [],
                option: {
                    height: 200, //滚动容器的高度
                    itemHeight: 32, // 单个item的高度
                    lazy: true,
                    load: (node, resolve) => {
                        const data = generateData(1000);
                        resolve(data);
                    },
                }
            };
        },
        mounted() {
            this.getTreeData();
        },
        methods: {
            getTreeData() {
                this.treeData = generateData(100000);
                this.$nextTick(() => {
                    this.$refs.virtualTree.referesh();
                });
            },
            refereshData(){
                this.getTreeData()
            }
        }
    }
</script>
```

:::



### Attributes

| 参数          | 说明                                   | 类型    | 可选值 | 默认值 |
| ------------- | -------------------------------------- | ------- | ------ | ------ |
| tree          | 要渲染的数据                           | Array   | —      | —      |
| defaultExpand | 默认是否展开所有节点                   | Boolean | —      | false  |
| timeout       | 虚拟Tree数据更新频率，数值越小更新越快 | Number  | —      | 10     |
| option        | 节点编辑时，对应输入框按钮大小         | Object  | —      | —      |
| nodeKey       | tree绑定的唯一标识                     | String  | —      | id     |

### option

| 参数       | 说明               | 类型    | 可选值 | 默认值 |
| ---------- | ------------------ | ------- | ------ | ------ |
| lazy       | 是否启用懒加载     | Boolean | —      | —      |
| height     | 虚拟tree可视化高度 | Number  | —      | 500    |
| itemHeight | tree数据行所占高度 | Number  |        | 25     |

### Function

| 方法名 | 说明                               | 参数 |
| ------ | ---------------------------------- | ---- |
| update | 虚拟tree更新后返回的可视化区域数据 | data |

### 