## Tooltips

Tooltips工具提示    

### 基础用法

:::demo 

```html
<template>
    <infinite-tool-tips :options="options" :render-text="tipsText" :tips-content="tipsContent" :max-width="160"></infinite-tool-tips>
</template>

<script>
    export default {
        data() {
            return {
                options:[{
                    offset:300
                }],
                tipsText: 'Tooltips工具提示，有时被称为气球帮助。是当鼠标停止在某一个工具元件时，界面对用户的提示信息。为了做出更美观的Tooltips，通常会用层模拟创建一个Tooltips效果。',
                tipsContent: 'Tooltips工具提示，有时被称为气球帮助。是当鼠标停止在某一个工具元件时，界面对用户的提示信息。为了做出更美观的Tooltips，通常会用层模拟创建一个Tooltips效果。'
            };
        }
    }
</script>
```

:::
