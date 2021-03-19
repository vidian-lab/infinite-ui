## Result 结果

用于反馈一系列操作任务的处理结果。

### 成功用法

成功结果用法。
:::demo 成功的结果。

```html
<template>
  <infinite-result status="success" title="成功" subTitle="欢迎来到Infinite-ui">
    <infinite-button type="primary">主要按钮</infinite-button>
    <infinite-button>infinite-ui</infinite-button>
  </infinite-result>
</template>
```

:::

### 处理用法

处理结果用法。
:::demo 展示处理结果。。

```html
<template>
  <infinite-result title="您的操作已经执行">
    <infinite-button type="primary">infinite-ui</infinite-button>
  </infinite-result>
</template>
```

:::

### 警告类型用法

警告类型结果用法。
:::demo 展示警告类型结果。。

```html
<template>
  <infinite-result status="warning" title="你的操作有些问题">
    <infinite-button type="primary">infinite-ui</infinite-button>
  </infinite-result>
</template>
```

:::

### 错误用法

错误结果用法。
:::demo 展示错误结果。。

```html
<template>
  <infinite-result
    status="error"
    title="提交失败"
    subTitle="请检查并修改以下信息后再重新提交"
  >
    <infinite-button type="primary">infinite-ui</infinite-button>
  </infinite-result>
</template>
```

:::

### 自定义 icon 用法

自定义 icon 用法。
:::demo 展示自定义 icon 结果。。

```html
<template>
  <infinite-result title="等待中...">
    <template slot="icon">
      <i class="el-icon-loading"></i>
    </template>
    <infinite-button disabled>提交</infinite-button>
  </infinite-result>
</template>
```

:::

### Attributes

| 参数     | 说明                       | 类型   | 可选值                           | 默认值 |
| -------- | -------------------------- | ------ | -------------------------------- | ------ |
| status   | 结果的状态，决定图标和颜色 | String | success / error / info / warning | info   |
| title    | title 文字                 | String | —                                | —      |
| subTitle | subTitle 文字              | String | —                                | —      |

### Slots

| name    | 说明                                               |
| ------- | -------------------------------------------------- |
| default | 默认插槽                                           |
| icon    | 自定义 icon 插槽，当该插槽存在时，`status`属性失效 |
