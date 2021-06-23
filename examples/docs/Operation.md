## InfiniteOperation操作列

Operation自定义列生成，样式可以建议在父级容器处理，操作列主要处理icon和纯文本展示，相关事件绑定

### 基础用法

:::demo 

```html
<template>
 	<infinite-operation 
		:icon="icon" 
		:bindData="bindData" 
		:callBack="callBackHandler" 
		:tips="tipsContent"
 	>
	</infinite-operation>
</template>

<script>
	export default {
		data() {
			return {
				bindData: { id: 'test' },
				tipsContent:'编辑',
				icon: 'el-icon-edit'
			};
		},
		methods: {
			callBackHandler(data) {
				console.log(`响应回调 ${JSON.stringify(data)}`);
			}
		}
  }
</script>
```
:::

### 操作组

:::demo

```html
<template>
 	<div>
		<infinite-operation  
			v-for="item in operationData"
			:key="item.id"
			:icon="item.icon"
			:text="item.text"
			:bindData="item.bindData" 
			:tips="item.tipsContent"
			:callBack="item.callBack" 
		>
		</infinite-operation>
 	</div>
</template>

<script>
	export default {
		data() {
			return {
				operationData: [
					{      
						id: 1,
						text: '增加',
					},
					{      
						id: 2,
						icon:'el-icon-share',
						bindData: { id: 'share' },
						text: '分享',
						tipsContent:'分享',
						callBack: this.callBackHandler
					},
					{   
						id: 3,                
						icon:'el-icon-edit',
						bindData: {id: 'delete'},
						text: '删除',
						tipsContent:'删除'
					}
				]
			};
		},
		methods: {
			callBackHandler(data) {
					console.log(`响应回调 ${JSON.stringify(data)}`);
			}
		}
	}
</script>
```
:::

### Attributes

| 参数      | 说明      | 类型     | 可选值 | 默认值 |
| --------- | --------- | -------- | ------ | ------ |
| icon      | 图标      | string   | —      |
| bindData      | 一般会传入回调使用data | object   | —      |
| text      | 当text有值icon为空显示文本      | string   | —     |
| callBack  | 事件回调  | function | —      |
| tips      | tooltip的hover文本 | string   | —      |
| placement | tooltip的hover位置 | string   | —      |
