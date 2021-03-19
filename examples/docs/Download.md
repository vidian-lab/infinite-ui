## Download 下载

用于数据流的下载方法

### 基础用法

当`$InfiniteDownload`已经挂在到 Vue 上后，我们就可以这样去使用了
:::demo `mode` 默认 `stream`

```html
<el-row>
  <infinite-button type="primary" @click="download">默认下载</infinite-button>
</el-row>
<script>
  export default {
    data() {
      return {
        resouce: new Blob(['Hello Infinite!']),
      };
    },
    methods: {
      download() {
        this.$InfiniteDownload({
          resouce: this.resouce,
          name: 'infinite.txt',
        });
      },
    },
  };
</script>
```

:::

### 使用 mode 方式下载

还可以直接根据 `mode` 属性来调用下载 `infiniteDownload`
:::demo 第一个参数接受一个 Blob（数据流）,第二个参数接受一个文件名称

```html
<el-row>
  <infinite-button type="primary" @click="download"
    >直接使用stream下载</infinite-button
  >
</el-row>
<script>
  export default {
    data() {
      return {
        resouce: new Blob(['Hello Infinite!']),
      };
    },
    methods: {
      download() {
        this.$InfiniteDownload.stream(this.resouce, 'infinite.txt');
      },
    },
  };
</script>
```

:::

### 使用请求方式进行下载

调整 `mode` 属性为'url'来调用下载
:::demo 只接受一个参数`resouce`，这里的`resouce`是一个 get 请求的地址,文件名字取决于资源默认名称，所以这里不需要配置参数 `name`

```html
<el-row>
  <infinite-button type="primary" @click="download">链接下载</infinite-button>
</el-row>
<script>
  export default {
    methods: {
      download() {
        const resouce =
          'https://trust.pingan.com/ncfbupload/img/historyimg/e0f21488-4ea1-4f2d-b813-8a349d88438f.doc';
        this.$InfiniteDownload({
          resouce: resouce,
          mode: 'url',
        });
        // or
        // this.$InfiniteDownload.url(resouce);
      },
    },
  };
</script>
```

:::

### Attributes

| 参数    | 说明     | 类型   | 可选值       | 默认值 |
| ------- | -------- | ------ | ------------ | ------ |
| mode    | 模式     | String | stream / url | stream |
| resouce | 下载资源 | -      | -            | -      |
| name    | 资源名称 | String | -            | -      |
