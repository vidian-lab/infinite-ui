## Tree

### 编辑功能使用

Tree 增删改及自定义编辑功能。
:::demo

```html
<template>
  <div>
    <infinite-button @click="addRootNode">添加根节点</infinite-button>
    <infinite-button @click="editSwitch">编辑开关</infinite-button>
    <infinite-tree
      ref="infiniteTreeRef"
      :data="treeData"
      :is-edit-node="isEditNode"
      :edit-inputs="editInputs"
      :before-delete="beforeDelete"
      @addNodeBefore="addNodeBefore"
      @editNodeBefore="editNodeBefore"
      @handlerSave="handlerSave"
      @handlerDelete="handlerDelete"
    >
    </infinite-tree>
    <infinite-button @click="confirm">提交</infinite-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        treeData: [
          {
            id: 10,
            label: '资源1',
            number: '1',
            children: [
              {
                id: 11,
                label: '资源11',
                number: '11',
                children: [
                  {
                    id: 111,
                    label: '资源111',
                    number: '111',
                  },
                ],
              },
            ],
          },
          {
            id: 20,
            label: '资源2',
            number: '2',
            children: [
              {
                id: 21,
                label: '资源21',
                number: '21',
                children: [
                  {
                    id: 211,
                    label: '资源211',
                    number: '211',
                  },
                ],
              },
              {
                id: 22,
                label: '资源22',
                number: '22',
                children: [
                  {
                    id: 212,
                    label: '资源221',
                    number: '221',
                  },
                ],
              },
            ],
          },
        ],
        localNotify: null,
        isEditNode: true,
        // 编辑中输入框
        editInputs: [
          {
            id: 'label',
            placeholder: '请输入资源名称',
            sameNameError: '资源名称重复',
            sameNameValiMode: 'local',
            validateFun: (value, node) => {
              const regEN = /[`~!@#$%^&*()-+<>?:="{}\_,.\/;'[\]]/im;
              const regCN = /[·！#￥（——）：；”“‘’，……|《。》？、【】[\]]/im;
              const regCEN = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
              if (!value) {
                return '请输入资源名称';
              } else if (
                !this.validLength(value, 0) ||
                this.validLength(value, 42)
              ) {
                return '请输入1-42位资源名称';
              } else if (
                regEN.test(value) ||
                regCN.test(value) ||
                regCEN.test(value)
              ) {
                return '资源名称仅支持中文、数字、英文';
              } else {
                return '';
              }
            },
          },
          {
            id: 'number',
            placeholder: '资源ID,支持数字、英文、"-"，1-16位',
            disabled: false,
            hidden: false,
            sameNameError: '资源编号重复',
            sameNameValiMode: 'overall',
            validateFun: (value) => {
              const regNum = new RegExp(
                '^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,16}$'
              );
              if (!value) {
                return '请输入资源编号';
              } else if (!regNum.test(value)) {
                return "资源ID,支持数字、英文、' - '，1-16位";
              } else {
                return '';
              }
            },
          },
        ],
      };
    },
    methods: {
      // 长度校验
      validLength(value, maxLength) {
        const count = this.parseLength(value);
        return this.getStrlength(value) > maxLength || count > maxLength;
      },
      getStrlength(str) {
        let len = 0;
        for (let i = 0; len < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      parseLength(value) {
        const regChinese = /[\u4e00-\u9fa5]/g;
        const regEning = /[A-Za-z]/g;
        const cLength = value.match(regChinese)
          ? value.match(regChinese).length
          : 0;
        const eLength = value.match(regEning)
          ? value.match(regEning).length
          : 0;
        const count = cLength * 2 + eLength * 1;
        return count || 0;
      },
      // 新增节点之前
      addNodeBefore() {
        // 开放资源ID输入框
        this.editInputs[1].disabled = false;
      },
      // 编辑节点之前
      editNodeBefore(data, node) {
        // 禁用资源ID输入框
        this.editInputs[1].disabled = !data.outer;
      },
      // 添加根节点
      addRootNode() {
        this.editInputs[1].disabled = false;
        this.$refs.infiniteTreeRef.addRootNode();
      },
      // 编辑开关
      editSwitch() {
        this.$refs.infiniteTreeRef.isInOperation(() => {
          this.isEditNode = !this.isEditNode;
        });
      },
      // 移除之前,如果存在子集，不允移除
      beforeDelete(node) {
        if (node.childNodes && node.childNodes.length) {
          this.$message.warning('存在子节点，不能移除');
          return false;
        } else {
          return true;
        }
        return;
      },
      // 删除完成
      handlerDelete() {
        const h = this.$createElement;
        // 删除提示
        this.localNotify && this.localNotify.close();
        this.localNotify = this.$notify({
          type: 'success',
          title: '操作提示',
          message: h('div', [
            '删除成功',
            h(
              'infiniteButton',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    // 撤销功能
                    this.$refs.infiniteTreeRef.revocationDel();
                    this.localNotify.close();
                  },
                },
              },
              '撤销'
            ),
          ]),
          dangerouslyUseHTMLString: true,
          duration: 3000,
        });
      },
      // 保存完成
      handlerSave() {
        this.$notify({
          type: 'success',
          title: '操作提示',
          message: '保存成功！',
          duration: 2000,
        });
      },
      confirm() {
        this.$refs.infiniteTreeRef.isInOperation(() => {
          console.log(this.treeData);
        });
      },
    },
  };
</script>
```

:::

### 拖拽使用

Tree 自定义增删改，新增拖拽成功后撤回功能。
:::demo

```html
<template>
  <div>
    <infinite-button @click="addRootNode">添加根节点</infinite-button>
    <infinite-tree
      ref="infiniteTreeRef"
      :data="treeData"
      :is-edit-node="isEditNode"
      :edit-inputs="editInputs"
      :draggable="true"
      @addNodeBefore="addNodeBefore"
      @editNodeBefore="editNodeBefore"
      @handlerSave="handlerSave"
      @handlerDelete="handlerDelete"
      @node-drop="nodeDrop"
    >
    </infinite-tree>
    <infinite-button @click="confirm">提交</infinite-button>
    <infinite-button @click="resetData">刷新数据</infinite-button>
    <infinite-dialog
      v-model="visible"
      title="重复节点名称"
      width="450px"
      @close="close"
      @confirm="dialogConfirm"
    >
      <span>
        <el-input v-model="nodeLabel"></el-input>
      </span>
    </infinite-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        nodeLabel: '',
        visible: false,
        backupsData: null,
        dragging: null,
        treeData: [
          {
            id: 10,
            label: '资源1',
            number: '1',
            children: [
              {
                id: 11,
                label: '资源11',
                number: '11',
                children: [
                  {
                    id: 111,
                    label: '资源111',
                    number: '111',
                  },
                ],
              },
            ],
          },
          {
            id: 20,
            label: '资源2',
            number: '2',
            children: [
              {
                id: 21,
                label: '资源21',
                number: '21',
                children: [
                  {
                    id: 211,
                    label: '资源211',
                    number: '211',
                  },
                ],
              },
              {
                id: 22,
                label: '资源22',
                number: '22',
                children: [
                  {
                    id: 212,
                    label: '资源221',
                    number: '221',
                  },
                ],
              },
            ],
          },
        ],
        localNotify: null,
        isEditNode: true,
        // 编辑中输入框
        editInputs: [
          {
            id: 'label',
            placeholder: '请输入组织名称',
            sameNameError: '资源名称重复',
            sameNameValiMode: 'local',
            validateFun: (value) => {
              const regEN = /[`~!@#$%^&*()-+<>?:="{}\_,.\/;'[\]]/im;
              const regCN = /[·！#￥（——）：；”“‘’，……|《。》？、【】[\]]/im;
              const regCEN = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
              if (!value) {
                return '请输入组织名称';
              } else if (
                !this.validLength(value, 0) ||
                this.validLength(value, 42)
              ) {
                return '请输入1-42位组织名称';
              } else if (
                regEN.test(value) ||
                regCN.test(value) ||
                regCEN.test(value)
              ) {
                return '组织名称仅支持中文、数字、英文';
              } else {
                return '';
              }
            },
          },
          {
            id: 'number',
            disabled: true,
            hidden: false,
          },
        ],
      };
    },
    methods: {
      // 长度校验
      validLength(value, maxLength) {
        const count = this.parseLength(value);
        return this.getStrlength(value) > maxLength || count > maxLength;
      },
      getStrlength(str) {
        let len = 0;
        for (let i = 0; len < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      parseLength(value) {
        const regChinese = /[\u4e00-\u9fa5]/g;
        const regEning = /[A-Za-z]/g;
        const cLength = value.match(regChinese)
          ? value.match(regChinese).length
          : 0;
        const eLength = value.match(regEning)
          ? value.match(regEning).length
          : 0;
        const count = cLength * 2 + eLength * 1;
        return count || 0;
      },
      // 新增节点之前
      addNodeBefore() {
        // 开放资源ID输入框
        this.editInputs[1].hidden = true;
      },
      // 编辑节点之前
      editNodeBefore(data) {
        this.editInputs[1].disabled = true;
        this.editInputs[1].hidden = !data.number;
      },
      // 添加根节点
      addRootNode() {
        this.editInputs[1].hidden = true;
        this.$refs.infiniteTreeRef.addRootNode();
      },
      // 删除完成
      handlerDelete() {
        const h = this.$createElement;
        // 删除提示
        this.localNotify && this.localNotify.close();
        this.localNotify = this.$notify({
          type: 'success',
          title: '操作提示',
          message: h('div', [
            '删除成功',
            h(
              'infiniteButton',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    // 撤销功能
                    this.$refs.infiniteTreeRef.revocationDel();
                    this.localNotify.close();
                  },
                },
              },
              '撤销'
            ),
          ]),
          dangerouslyUseHTMLString: true,
          duration: 3000,
        });
      },
      // 保存完成
      handlerSave() {
        this.$notify({
          type: 'success',
          title: '操作提示',
          message: '保存成功！',
          duration: 2000,
        });
      },
      // 提交时可以做当前操作众的判断后获取数据
      confirm() {
        this.$refs.infiniteTreeRef.isInOperation(() => {
          console.log(this.treeData);
        });
      },
      // 初始化数据
      resetData() {
        this.treeData = JSON.parse(JSON.stringify(this.backupsData));
      },
      // 节点名称是否相同
      isSameNodeLabel(nodes) {},
      nodeDrop(dragging, dropNode) {
        const crtId = dragging.data.id;
        const crtNode = this.$refs.infiniteTreeRef.getNode(crtId);
        // 获取相同级别的所有数据，这里特殊处理根节点
        const sameLevelNodes =
          crtNode.parent.data.children || crtNode.parent.data;
        // 假设当前节点没有重复
        let flag = false;
        sameLevelNodes.forEach((item) => {
          //排除自身节点
          if (item.id !== crtId && !flag && item.label === crtNode.data.label) {
            flag = true;
          }
        });
        // 当前节点重复判断
        if (flag) {
          this.nodeLabel = dragging.data.label;
          this.dragging = dragging;
          this.visible = true;
        }
      },
      // 关闭弹窗
      close() {
        // 恢复仅上一次拖拽成功的节点
        this.$refs.infiniteTreeRef.revocationDrag();
      },
      // 弹窗确定
      dialogConfirm() {
        if (this.dragging.data.label === this.nodeLabel) {
          this.$message.error('节点名称重复');
          return;
        }
        this.visible = false;
        this.dragging.data.label = this.nodeLabel;
      },
    },
    mounted() {
      this.backupsData = JSON.parse(JSON.stringify(this.treeData));
    },
  };
</script>
```

:::

### 配置节点操作按钮

Tree 根据配置对象操作按钮
:::demo `node-operation-btns-prop`属性可以配置增删改按钮的 icon 及创建前的回调来控制按钮显隐

```html
<template>
  <div>
    <infinite-button @click="addRootNode">添加根节点</infinite-button>
    <infinite-button @click="editSwitch">编辑开关</infinite-button>
    <infinite-tree
      ref="infiniteTreeRef"
      :data="treeData"
      :is-edit-node="isEditNode"
      :edit-inputs="editInputs"
      :node-operation-btns-prop="nodeOperationBtnsProp"
      @addNodeBefore="addNodeBefore"
      @editNodeBefore="editNodeBefore"
      @handlerSave="handlerSave"
      @handlerDelete="handlerDelete"
    >
    </infinite-tree>
    <infinite-button @click="confirm">提交</infinite-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        treeData: [
          {
            id: 10,
            label: '资源1',
            number: '1',
            children: [
              {
                id: 11,
                label: '资源11',
                number: '11',
                children: [
                  {
                    id: 111,
                    label: '资源111',
                    number: '111',
                  },
                ],
              },
            ],
          },
          {
            id: 20,
            label: '资源2',
            number: '2',
            children: [
              {
                id: 21,
                label: '资源21',
                number: '21',
                children: [
                  {
                    id: 211,
                    label: '资源211',
                    number: '211',
                  },
                ],
              },
              {
                id: 22,
                label: '资源22',
                number: '22',
                children: [
                  {
                    id: 212,
                    label: '资源221',
                    number: '221',
                  },
                ],
              },
            ],
          },
        ],
        localNotify: null,
        isEditNode: true,
        // 编辑中输入框
        editInputs: [
          {
            id: 'label',
            placeholder: '请输入资源名称',
            sameNameError: '资源名称重复',
            sameNameValiMode: 'local',
            validateFun: (value) => {
              const regEN = /[`~!@#$%^&*()-+<>?:="{}\_,.\/;'[\]]/im;
              const regCN = /[·！#￥（——）：；”“‘’，……|《。》？、【】[\]]/im;
              const regCEN = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g;
              if (!value) {
                return '请输入资源名称';
              } else if (
                !this.validLength(value, 0) ||
                this.validLength(value, 42)
              ) {
                return '请输入1-42位资源名称';
              } else if (
                regEN.test(value) ||
                regCN.test(value) ||
                regCEN.test(value)
              ) {
                return '资源名称仅支持中文、数字、英文';
              } else {
                return '';
              }
            },
          },
          {
            id: 'number',
            placeholder: '资源ID,支持数字、英文、"-"，1-16位',
            disabled: false,
            hidden: false,
            sameNameError: '资源编号重复',
            sameNameValiMode: 'overall',
            validateFun: (value) => {
              const regNum = new RegExp(
                '^(?=.*[A-Za-z0-9])[A-Za-z0-9-]{1,16}$'
              );
              if (!value) {
                return '请输入资源编号';
              } else if (!regNum.test(value)) {
                return "资源ID,支持数字、英文、' - '，1-16位";
              } else {
                return '';
              }
            },
          },
        ],
        // 操作按钮配置对象
        nodeOperationBtnsProp: {
          add: {
            icon: 'el-icon-plus',
            beforeCreate(node) {
              if (node.level === 3) {
                return false;
              }
              return true;
            },
          },
          delete: {
            icon: 'el-icon-minus',
            beforeCreate(node) {
              if (node.data.children && node.data.children.length) {
                return false;
              }
              return true;
            },
          },
          edit: {
            beforeCreate() {
              return false;
            },
          },
        },
      };
    },
    methods: {
      // 长度校验
      validLength(value, maxLength) {
        const count = this.parseLength(value);
        return this.getStrlength(value) > maxLength || count > maxLength;
      },
      getStrlength(str) {
        let len = 0;
        for (let i = 0; len < str.length; i++) {
          if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
            len += 2;
          } else {
            len++;
          }
        }
        return len;
      },
      parseLength(value) {
        const regChinese = /[\u4e00-\u9fa5]/g;
        const regEning = /[A-Za-z]/g;
        const cLength = value.match(regChinese)
          ? value.match(regChinese).length
          : 0;
        const eLength = value.match(regEning)
          ? value.match(regEning).length
          : 0;
        const count = cLength * 2 + eLength * 1;
        return count || 0;
      },
      // 新增节点之前
      addNodeBefore() {
        // 开放资源ID输入框
        this.editInputs[1].disabled = false;
      },
      // 编辑节点之前
      editNodeBefore(data, node) {
        // 禁用资源ID输入框
        this.editInputs[1].disabled = !data.outer;
      },
      // 添加根节点
      addRootNode() {
        this.editInputs[1].disabled = false;
        this.$refs.infiniteTreeRef.addRootNode();
      },
      // 编辑开关
      editSwitch() {
        this.$refs.infiniteTreeRef.isInOperation(() => {
          this.isEditNode = !this.isEditNode;
        });
      },
      // 删除完成
      handlerDelete() {
        const h = this.$createElement;
        // 删除提示
        this.localNotify && this.localNotify.close();
        this.localNotify = this.$notify({
          type: 'success',
          title: '操作提示',
          message: h('div', [
            '删除成功',
            h(
              'infiniteButton',
              {
                props: {
                  type: 'text',
                },
                on: {
                  click: () => {
                    // 撤销功能
                    this.$refs.infiniteTreeRef.revocationDel();
                    this.localNotify.close();
                  },
                },
              },
              '撤销'
            ),
          ]),
          dangerouslyUseHTMLString: true,
          duration: 3000,
        });
      },
      // 保存完成
      handlerSave() {
        this.$notify({
          type: 'success',
          title: '操作提示',
          message: '保存成功！',
          duration: 2000,
        });
      },
      confirm() {
        this.$refs.infiniteTreeRef.isInOperation(() => {
          console.log(this.treeData);
        });
      },
    },
  };
</script>
```

:::

### 高亮/复选框/禁用使用

Tree 新增高亮方法。
:::demo

```html
<template>
  <div>
    <infinite-tree
      ref="infiniteTreeRef"
      :data="treeData"
      :show-checkbox="true"
      :default-expand-all="true"
    >
    </infinite-tree>
    <infinite-button @click="setHighlightNode">切换资源112高亮</infinite-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        treeData: [
          {
            id: 10,
            label: '资源1(1)',
            disabled: true,
            children: [
              {
                id: 11,
                label: '资源11(11)',
                children: [
                  {
                    id: 111,
                    label: '资源111(111)',
                  },
                  {
                    id: 112,
                    label: '资源112(112)',
                  },
                ],
              },
            ],
          },
        ],
        highlightStatus: false,
      };
    },
    methods: {
      setHighlightNode() {
        this.$refs.infiniteTreeRef.setHighlightNode(
          112,
          (this.highlightStatus = !this.highlightStatus)
        );
      },
    },
  };
</script>
```

:::

### 插槽使用

Tree 自定义插槽内容
:::demo

```html
<template>
  <div>
    <infinite-tree
      ref="infiniteTreeRef"
      :data="treeData"
      :default-expand-all="true"
    >
      <template slot-scope="{node, data}">
        <i v-if="node.childNodes.length" class="el-icon-folder-opened"></i>
        <i v-else class="el-icon-document"></i>
        {{node.label}}
      </template>
    </infinite-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        treeData: [
          {
            id: 10,
            label: '资源1(1)',
            disabled: true,
            children: [
              {
                id: 11,
                label: '资源11(11)',
                children: [
                  {
                    id: 111,
                    label: '资源111(111)',
                  },
                  {
                    id: 112,
                    label: '资源112(112)',
                  },
                ],
              },
            ],
          },
        ],
        highlightStatus: false,
      };
    },
  };
</script>
```

:::

### Attributes

| 参数                     | 说明                                                                                                                                         | 类型                                   | 可选值 | 默认值           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------ | ---------------- |
| data                     | 展示数据                                                                                                                                     | Array                                  | —      | —                |
| is-edit-node             | 是否可编辑子节点                                                                                                                             | Boolean                                | —      | false            |
| edit-inputs              | 编辑时对应的输入框，具体看下表                                                                                                               | Array                                  | —      | —                |
| edit-component-size      | 节点编辑时，对应输入框按钮大小                                                                                                               | String                                 | —      | 'mini'           |
| tree-line                | 节点连接线                                                                                                                                   | Boolean                                | —      | true             |
| same-operation-error     | 可编辑时，重复操作提示内容                                                                                                                   | String                                 | —      | 请先完成当前操作 |
| is-auto-expand-children  | 拖拽时，且拖拽至目标节点停留时，是否默认展开目标节点                                                                                         | Boolean                                | —      | true             |
| beforeAdd                | 添加节点前的 Callback，如果 callback 返回 true 则允 添加，否则不添加                                                                         | Function(node)                         | —      | true             |
| beforeEdit               | 编辑节点前的 Callback，如果 callback 返回 true 则允编辑，否则不编辑                                                                          | Function(node)                         | —      | true             |
| beforeDelete             | 移除节点前的 Callback，如果 callback 返回 true 则允移除，否则不移除                                                                          | Function(node)                         | —      | true             |
| node-operation-btns-prop | 节点上增删改操作按钮配置对象,这里提供 3 个按钮属性的配置，分别为`add` `delete` `edit` 可在 `node-operation-btns-prop Attributes`查看具体属性 | Object                                 | —      | —                |
| empty-text               | 内容为空的时候展示的文本                                                                                                                     | String                                 | —      | —                |
| node-key                 | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                                                                         | String                                 | —      | id               |
| props                    | 配置选项，具体看下表                                                                                                                         | object                                 | —      | —                |
| render-after-expand      | 是否在第一次展开某个树节点后才渲染其子节点                                                                                                   | boolean                                | —      | true             |
| load                     | 加载子树数据的方法，仅当 lazy 属性为 true 时生效                                                                                             | function(node, resolve)                | —      | —                |
| render-content           | 树节点的内容区的渲染 Function                                                                                                                | Function(h, { node, data, store }      | —      | —                |
| highlight-current        | 是否高亮当前选中节点，默认值是 false。                                                                                                       | boolean                                | —      | false            |
| default-expand-all       | 是否默认展开所有节点                                                                                                                         | boolean                                | —      | false            |
| expand-on-click-node     | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。                             | boolean                                | —      | true             |
| check-on-click-node      | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                                                             | boolean                                | —      | false            |
| auto-expand-parent       | 展开子节点的时候是否自动展开父节点                                                                                                           | boolean                                | —      | true             |
| default-expanded-keys    | 默认展开的节点的 key 的数组                                                                                                                  | array                                  | —      | —                |
| show-checkbox            | 节点是否可被选择                                                                                                                             | boolean                                | —      | false            |
| check-strictly           | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                                                                       | boolean                                | —      | false            |
| default-checked-keys     | 默认勾选的节点的 key 的数组                                                                                                                  | array                                  | —      | —                |
| current-node-key         | 当前选中的节点                                                                                                                               | string, number                         | —      | —                |
| filter-node-method       | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏                                              | Function(value, data, node)            | —      | —                |
| accordion                | 是否每次只打开一个同级树节点展开                                                                                                             | boolean                                | —      | false            |
| icon-class               | 自定义树节点的图标                                                                                                                           | string                                 | -      | -                |
| lazy                     | 是否懒加载子节点，需与 load 方法结合使用                                                                                                     | boolean                                | —      | false            |
| draggable                | 是否开启拖拽节点功能                                                                                                                         | boolean                                | —      | false            |
| allow-drag               | 判断节点能否被拖拽                                                                                                                           | Function(node)                         | —      | —                |
| allow-drop               | 拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后   | Function(draggingNode, dropNode, type) | —      | —                |

### props Attributes

| 参数     | 说明     | 类型   | 可选值 | 默认值 |
| -------- | -------- | ------ | ------ | ------ |
| label    | 选项标签 | String | —      | —      |
| children | 子选项   | String | —      | —      |

### edit-inputs Attributes

| 参数             | 说明                                                 | 类型            | 可选值             | 默认值 |
| ---------------- | ---------------------------------------------------- | --------------- | ------------------ | ------ |
| id               | 编辑节点的 key                                       | String          | —                  | label  |
| placeholder      | 占位符                                               | String          | —                  | —      |
| sameNameError    | 当该属性存在值时，自动开启同名校验，值则为同名的提示 | String          | —                  | —      |
| sameNameValiMode | 同名校验规则，这里默认为`local`当前层级校验          | String          | `overall`、`local` | local  |
| validateFun      | 输入框内容校验                                       | Function(value) | —                  | —      |
| disabled         | 是否禁用                                             | Boolean         | —                  | false  |
| hidden           | 是否隐藏，注意：这里隐藏后将不做输入框及同名校验     | Boolean         | —                  | false  |
| defaultValue     | 新增节点时，设置为默认的输入框值                     | String          | —                  | —      |

### node-operation-btns-prop Attributes

| 参数         | 说明                  | 类型             | 可选值 | 默认值        |
| ------------ | --------------------- | ---------------- | ------ | ------------- |
| icon         | 操作按钮的 icon-class | String           | —      | —             |
| beforeCreate | 创建按钮前的回调      | Function(node){} | —      | `return true` |

### Function

`Tree` 内部使用了 Node 类型的对象来包装用户传入的数据，用来保存目前节点的状态。 `Tree` 拥有如下方法：
| 方法名 | 说明 | 参数 |
| ------------- | -------- | ------- |
| addRootNode | 添加根节点 | —|
| isInOperation | 当`edit-inputs`设置校验规则后，该方法可以提供校验及成功后的回调 | callback 接受一个回调函数|
| revocationDel | 当某一个节点删除以后，该方法可以撤销上一次删除 | —|
| revocationDrag | 拖拽成功后撤销方法，该方法可以撤销上一次拖拽 | —|
| setHighlightNode | 设置需要高亮的节点 | 第一个参数 dataKeys 可以为数组或字符串或数字类型作为需要设置高亮的节点的 node-key，第二个参数则为设置高亮的开关|
| filter | 对树节点进行筛选操作 | 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数 |
| updateKeyChildren | 通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性 | (key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组 |
| getCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组 | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 `false` 2. 是否包含半选节点，默认值为 `false` |
| setCheckedNodes | 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (nodes) 接收勾选节点数据的数组 |
| getCheckedKeys | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false` |
| setCheckedKeys | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性 | (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的选中状态，默认值为 `false` |
| setChecked | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性 | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false |
| getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组 | - |
| getHalfCheckedKeys | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 | - |
| getCurrentKey | 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null | — |
| getCurrentNode | 获取当前被选中节点的 data，若没有节点被选中则返回 null | — |
| setCurrentKey | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点 |
| setCurrentNode | 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性 | (node) 待被选节点的 node |
| getNode | 根据 data 或者 key 拿到 Tree 组件中的 node | (data) 要获得 node 的 key 或者 data |
| remove | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 | (data) 要删除的节点的 data 或者 node |
| append | 为 Tree 中的一个节点追加一个子节点 | (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node |
| insertBefore | 为 Tree 的一个节点的前面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node |
| insertAfter | 为 Tree 的一个节点的后面增加一个节点 | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node |

### Events

| 事件名称         | 说明                                                  | 回调参数                                                                                                                                                           |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| addNodeBefore    | 添加节点之前，`is-edit-node`开启时会生效              | 共两个参数，操作节点的 `data`，操作节点的`node`                                                                                                                    |
| editNodeBefore   | 编辑节点之前，`is-edit-node`开启时会生效              | 共两个参数，操作节点的 `data`，操作节点的`node`                                                                                                                    |
| addNode          | 点击添加节点按钮，`is-edit-node`开启时会生效          | 共一个参数，操作节点的 `data`                                                                                                                                      |
| editNode         | 点击编辑节点按钮，`is-edit-node`开启时会生效          | 共一个参数，操作节点的 `data`                                                                                                                                      |
| handlerSave      | 节点保存成功，`is-edit-node`开启时会生效              | 共一个参数，保存的当前节点的 `data`                                                                                                                                |
| handlerDelete    | 节点删除成功，`is-edit-node`开启时会生效              | 共一个参数，删除的当前节点的 `data`                                                                                                                                |
| editChange       | 编辑节点时的变化状态                                  | 共一个参数，节点编辑切换时候的状态`status`                                                                                                                         |
| node-click       | 节点被点击时的回调                                    | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                  |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件                | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| check-change     | 节点选中状态发生变化时的回调                          | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                               |
| check            | 当复选框被点击的时候触发                              | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change   | 当前选中节点变化时触发的事件                          | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                                           |
| node-expand      | 节点被展开时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-collapse    | 节点被关闭时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-drag-start  | 节点开始拖拽时触发的事件                              | 共两个参数，依次为：被拖拽节点对应的 Node、event                                                                                                                   |
| node-drag-enter  | 拖拽进入其他节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event                                                                                            |
| node-drag-leave  | 拖拽离开某个节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event                                                                                            |
| node-drag-over   | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event                                                                                          |
| node-drag-end    | 拖拽结束时（可能未成功）触发的事件                    | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event                               |
| node-drop        | 拖拽成功完成时触发的事件                              | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event                                           |

### Scoped Slot

| name | 说明                                      |
| ---- | ----------------------------------------- |
| ---- | 自定义树节点的内容，参数为 { node, data } |
