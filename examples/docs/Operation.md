## InfiniteOperation

Operation自定义列生成

### 基础用法

:::demo 

```html
<template>
        <infinite-operation icon="el-icon-edit" :bindData="bindData" :callBack="callBackHandler" :tips="tipsContent"></infinite-operation>
</template>

<script>
    export default {
        data() {
            return {
                bindData: {
                    id: 'test'
                },
                tipsContent:'编辑'
            };
        },
        methods: {
            callBackHandler(data) {
                console.log(data);
            }
        }

    }
</script>
```

:::
