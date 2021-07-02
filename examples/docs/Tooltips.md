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
                options:[
                    {
                    offset:300
                    }
                ],
                tipsText: 'Tooltips工具提示，有时被称为气球帮助。是当鼠标停止在某一个工具元件时，界面对用户的提示信息。为了做出更美观的Tooltips，通常会用层模拟创建一个Tooltips效果。',
                tipsContent: 'Tooltips工具提示，有时被称为气球帮助。是当鼠标停止在某一个工具元件时，界面对用户的提示信息。为了做出更美观的Tooltips，通常会用层模拟创建一个Tooltips效果。'
            };
        }
    }
</script>
```

:::

### Attributes

| 参数        | 说明                                 | 类型    | 可选值     | 默认值                 |
| ----------- | ------------------------------------ | ------- | ---------- | ---------------------- |
| effect      | 气泡主题                             | String  | dark/light | dark                   |
| renderText  | 需要渲染的文本                       | String  | —          | —                      |
| enterable   | 是否允许鼠标移入气泡内               | Boolean | —          | false                  |
| openDelay   | 延迟弹出tips                         | Number  | —          | 500                    |
| placement   | 气泡弹出位置                         | String  | —          | top-start              |
| popperClass | 自定义tip气泡样式类名                | String  | —          | infinite-text-tooltips |
| maxWidth    | 当超过此宽度时，超出文本渲染成缺省值 | Number  | —          | 300                    |
| showTips    | 是否显示tips，设置此值maxWidth无效   | Boolean | —          | false                  |
| options     | element-ui tooltips组件所有pops      | Array   | —          | []                     |

### 