## Steps

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤。

### 基础功能

简单的步骤条，设置 v-model 属性，接受一个 Number，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置 space 属性即可，它接受 Number，单位为 px，如果不设置，则为自适应。设置 finish-status 属性可以改变已经完成的步骤的状态。
:::demo

```html
<template>
  <div>
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      finish-status="success"
      :space="200"
      @change="change"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-edit',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-upload',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
            icon: 'el-icon-picture',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      change(val) {
        console.log(val);
      },
    },
  };
</script>
```

:::

### 直接使用 infinite-step 的步骤条

不通过数据使用 infinite-step 配合自定义插槽来构建步骤块
:::demo

```html
<template>
  <div>
    <infinite-steps v-model="active" finish-status="success">
      <infinite-step>
        <template slot="title">步骤 1</template>
        <template slot="description">这里是步骤二的一些基本描述</template>
        <template slot="icon"><i class=" el-icon-edit"></i></template>
      </infinite-step>
      <infinite-step title="步骤 2">
        <template slot="description">这里是步骤二的一些基本描述</template>
      </infinite-step>
      <infinite-step title="步骤 3">
        <template slot="description">这里是步骤二的一些基本描述</template>
      </infinite-step>
      <infinite-step title="步骤 4">
        <template slot="description">这里是步骤二的一些基本描述</template>
      </infinite-step>
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
      };
    },
    methods: {
      next() {
        if (this.active++ > 3) this.active = 0;
      },
    },
  };
</script>
```

:::

### 有描述的步骤条

每个步骤有其对应的步骤状态描述
:::demo

```html
<template>
  <div>
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      finish-status="success"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤一的一些基本描述',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
    },
  };
</script>
```

:::

### 居中的步骤条

标题和描述都将居中
:::demo

```html
<template>
  <div>
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      align-center
      finish-status="success"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤一的一些基本描述',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
    },
  };
</script>
```

:::

### 竖式步骤条

竖直方向的步骤条
:::demo

```html
<template>
  <div>
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      direction="vertical"
      finish-status="success"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤一的一些基本描述',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
    },
  };
</script>
```

:::

### 竖式-标题在底部的步骤条

竖直方向且标题及描述在图标的底部的步骤条
:::demo

```html
<template>
  <div style="height: 300px;margin-bottom: 40px;">
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      direction="vertical"
      :combinationDirection="combinationDirection"
      finish-status="success"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤一的一些基本描述',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
          },
        ],
        combinationDirection: 'vertical',
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
    },
  };
</script>
```

:::

### 简洁风格的步骤条

设置 simple 可应用简洁风格，该条件下 align-center / description / direction / space 都将失效
:::demo

```html
<template>
  <div>
    <div>
      <infinite-steps v-model="active" :stepsData="stepsData" simple>
      </infinite-steps>
      <infinite-button style="margin-top: 12px;" @click="next"
        >下一步</infinite-button
      >
    </div>
    <div style="margin-top: 20px">
      <infinite-steps
        v-model="active2"
        finish-status="success"
        :stepsData="stepsData2"
        simple
      >
      </infinite-steps>
      <infinite-button style="margin-top: 12px;" @click="next2"
        >下一步</infinite-button
      >
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-edit',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-upload',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
            icon: 'el-icon-picture',
          },
        ],
        active2: 0,
        stepsData2: [
          {
            title: '步骤一',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      next2() {
        if (this.active2++ > 2) this.active2 = 0;
      },
    },
  };
</script>
```

:::

### 点击 step 跳跃步骤条

点击 step 跳跃步骤条 设置 `is-skip-method` ，接受一个 Function，根据返回的 `Boolean` 状态来决定是否允许跳跃步骤
:::demo

```html
<template>
  <div>
    <infinite-steps
      v-model="active"
      :stepsData="stepsData"
      finish-status="success"
      :space="200"
      :is-skip-method="isSkipMethod"
    >
    </infinite-steps>
    <infinite-button style="margin-top: 12px;" @click="next"
      >下一步</infinite-button
    >
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        stepsData: [
          {
            title: '步骤一',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-edit',
          },
          {
            title: '步骤二',
            description: '这里是步骤二的一些基本描述',
            icon: 'el-icon-upload',
          },
          {
            title: '步骤三',
            description: '这里是步骤三的一些基本描述',
            icon: 'el-icon-picture',
          },
        ],
      };
    },
    methods: {
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      isSkipMethod(index) {
        return index % 2;
      },
    },
  };
</script>
```

:::

### Steps Attributes

| 参数           | 说明                                               | 类型              | 可选值                                    | 默认值        |
| -------------- | -------------------------------------------------- | ----------------- | ----------------------------------------- | ------------- |
| v-model        | 设置当前激活步骤。                                 | Number            | —                                         | 0             |
| space          | 每个 step 的间距，不填写将自适应间距。支持百分比。 | number / string   | —                                         | —             |
| direction      | 显示方向                                           | string            | vertical/horizontal                       | horizontal    |
| process-status | 设置当前步骤的状态                                 | string            | wait / process / finish / error / success | finish        |
| finish-status  | 设置结束步骤的状态，finish 为橙色，success 为绿色  | String            | wait / process / finish / error / success | finish        |
| align-center   | 进行居中对齐                                       | Boolean           | —                                         | false         |
| simple         | 是否应用简洁风格                                   | boolean           | —                                         | false         |
| is-skip-method | 是否跳跃步骤方法                                   | Function(index){} | —                                         | `return true` |

### Step Attributes

| 参数        | 说明                                            | 类型                                                       | 可选值                                    | 默认值 |
| ----------- | ----------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- | ------ |
| title       | 标题                                            | string                                                     | —                                         | —      |
| description | 描述性文字                                      | string                                                     | —                                         | —      |
| icon        | 图标                                            | 传入 icon 的 class 全名来自定义 icon，也支持 slot 方式写入 | —                                         | —      |
| status      | 设置当前步骤的状态，不设置则根据 steps 确定状态 | string                                                     | wait / process / finish / error / success | —      |

### Step Slot OR stepsData Attributes

| 参数        | 说明             |
| ----------- | ---------------- |
| icon        | 自定义图标       |
| title       | 自定义标题       |
| description | 自定义描述性文字 |

### stepsData Attributes

| 参数        | 说明                 | 类型   | 可选值                                    | 默认 |
| ----------- | -------------------- | ------ | ----------------------------------------- | ---- |
| icon        | 自定义图标           | String | —                                         | —    |
| title       | 自定义标题           | String | —                                         | —    |
| description | 自定义描述性文字     | String | —                                         | —    |
| status      | 自定义当前步骤的状态 | String | wait / process / finish / error / success | —    |
