## VirtualTree

加载大数据tree，支持滚动加载

### 基础用法

:::demo 

```html
<template>
    <div class="main">
        <infinite-virtual-tree ref="virtualTree" :treeData="treeData" :option="option" :lazy="true" :load="loadChildNode">
            <template v-slot="{ item, index }">
                <div>{{ item.label }}</div>
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
            label: `${label}_${id}`
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
                option: {
                    height: 200, //滚动容器的高度
                    itemHeight: 25 // 单个item的高度
                }
            };
        },
        computed: {
            treeData() {
                return generateData(10000);
            },
        },
        methods: {
            collapseAll() {
                this.$refs.virtualTree.collapseAll();
            },
            expandAll() {
                this.$refs.virtualTree.expandAll();
            },
            loadChildNode(node, resolve) {
                // 异步加载子节点
                const child = generateData(5)
                resolve(child)
            }
        }
    }
</script>
```

:::
