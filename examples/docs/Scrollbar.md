## 网页自定义滚动条


### 基础用法

基础的按钮用法。
:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<el-row>
  <infinite-scrollbar>默认按钮</infinite-scrollbar>
</el-row>
<script>
  export default {
    methods: {
      handleClick(val) {
        console.log(val, 'clicked the button');
      },
    },
  };
</script>
```



:::

### Attributes

| 参数     | 说明         | 类型    | 可选值                                             | 默认值 |
| -------- | ------------ | ------- | -------------------------------------------------- | ------ |
| size     | 尺寸         | string  | medium / small / mini                              | —      |
| type     | 类型         | string  | primary / success / warning / danger / info / text | —      |
| plain    | 是否朴素按钮 | boolean | —                                                  | false  |
| round    | 是否圆角按钮 | boolean | —                                                  | false  |
| disabled | 是否禁用状态 | boolean | —                                                  | false  |
| icon     | 图标类名     | string  | —                                                  | —      |
