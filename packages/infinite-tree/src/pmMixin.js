import TreeCtrl from './tree'
import { jsonFlat } from 'infinite-ui/packages/utils/index'
export default {
  props: {
    props: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'label'
        }
      }
    },
    nodeKey: { // 节点数据中的字段名称，必须唯一
      type: String,
      default: 'id'
    },
    draggable: { // 是否开启拖拽节点功能
      type: Boolean,
      default: false
    },
    isAutoExpandChildren: {// 拖拽时，是否自动展开子集
      type: Boolean,
      default: true
    },
    isEditNode: { // 是否可编辑树节点
      type: Boolean,
      default: false
    },
    // 编辑时输入框及按钮大小
    editComponentSize: {
      type: String,
      default: 'mini'
    },
    // 是否开启树的连接线
    treeLine: {
      type: Boolean,
      default: true
    },
    // 编辑中的输入框
    editInputs: {
      type: Array,
      default: () => [
        {
          id: 'label',
          placeholder: '请输入节点名称',
          sameNameError: '节点名称重复',
          validateFun: value => {
            return !value ? '节点名称不能为空' : ''
          }
        }
      ]
    },
    nodeOperationBtnsProp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    sameOperationError: {
      type: String,
      default: '请先完成当前操作'
    },
    beforeDelete: {
      type: Function,
      default: () => { return true }
    },
    beforeAdd: {
      type: Function,
      default: () => { return true }
    },
    beforeEdit: {
      type: Function,
      default: () => { return true }
    }
  },
  methods: {
    remove (data) {
      this.$refs.infiniteTreeRef.remove(data)
      this.addNotChildrenNodeAttr()
    },
    append (data, parentNode) {
      this.$refs.infiniteTreeRef.append(data, parentNode)
      this.addNotChildrenNodeAttr()
    },
    insertBefore (data, refNode) {
      this.$refs.infiniteTreeRef.insertBefore(data, refNode)
      this.addNotChildrenNodeAttr()
    },
    insertAfter (data, refNode) {
      this.$refs.infiniteTreeRef.insertAfter(data, refNode)
      this.addNotChildrenNodeAttr()
    },
    // 设置高亮节点
    setHighlightNode (dataKey, status = true) {
      // 设置高亮
      if (!dataKey) {
        // 所有节点高亮
        Object.keys(this.highlightNodeMap).forEach(key => {
          this.$set(this.highlightNodeMap, key, status)
        })
      } else if (Array.isArray(dataKey)) {
        // 数组遍历高亮
        dataKey.forEach(key => {
          this.$set(this.highlightNodeMap, key, status)
        })
      } else {
        // 单个节点高亮
        this.$set(this.highlightNodeMap, dataKey, status)
      }
    },
    // 设置无子节点的dom属性标识
    addNotChildrenNodeAttr () {
      this.$nextTick(() => {
        const treeNodes = this.$refs.infiniteTreeRef.$el.querySelectorAll('.el-tree-node')
        treeNodes.forEach(el => {
          const cDom = el.querySelector('.el-tree-node__children')
          el.setAttribute('not-children', cDom === null || cDom.innerHTML === '')
        })
      })
    },
    // 节点展开时
    nodeExpand () {
      this.addNotChildrenNodeAttr()
    },
    // input校验规则
    validateInput (item, node) {
      const editInputMapItem = this.editInputMap[item.id]
      editInputMapItem.validateError = item.validateFun ? item.validateFun(editInputMapItem.value, node) : ''
    },
    // 清除记录的操作节点信息
    clearRecordNode () {
      this.operationNode = null
      this.peerOperationNodes = null
    },
    // 是否操作中判断
    isInOperation (success) {
      if (this.operationNode) {
        this.$message.closeAll()
        this.$message.error(this.sameOperationError)
        return
      }
      success && success()
    },
    // 编辑结束
    editOver (data, isSave) {
      // 设置节点为普通文本
      this.$delete(data, 'in-input-type')
      // 是否保存节点
      if (isSave) {
        // 设置节点文本
        this.editInputs.forEach(item => {
          data[item.id] = this.editInputMap[item.id].value
        })
        // 更新新增的节点id为老节点
        if (typeof data[this.nodeKey] === 'string') { data[this.nodeKey] = data[this.nodeKey].replace('temp', '') }
      }
      // 清除记录的操作节点信息
      this.clearRecordNode()
    },
    // 新增节点
    addNode (data, node) {
      if (this.beforeAdd(node)) {
        // 初始化inputs
        this.editInputs.forEach(item => {
          const editInputMapItem = this.editInputMap[item.id]
          editInputMapItem.value = item.defaultValue || ''
          editInputMapItem.validateError = ''
        })
        const newData = { ...TreeCtrl.createNode() }
        // 添加动态属性
        this.editInputs.forEach(item => {
          newData[item.id] = ''
        })
        const newNode = !data ? this.$refs.infiniteTreeRef.root : node
        // 获取子节点
        const childNode = newNode.childNodes[0]
        // 添加节点
        if (childNode) {
          this.insertBefore(newData, childNode)
        } else {
          this.append(newData, newNode)
        }
        // 记录节点
        this.peerOperationNodes = newNode.childNodes
        this.operationNode = newNode.childNodes[0]
        if (data) {
          // 添加子节点时，展开当前节点
          node.expanded = true
        }
        // 将新增节点数据暴露出去
        this.$emit('addNode', data || newNode)
      }
    },
    // 新增根节点
    addRootNode () {
      this.isInOperation(() => {
        this.addNode()
      })
    },
    // 取消节点操作
    cancelNode (data, node) {
      // 新增时取消
      if (TreeCtrl.isAddCancel(data)) {
        this.delSelect(node, false) // 移除节点
      } else {
        // 编辑时取消
        this.editOver(data)
      }
    },
    // 编辑节点
    editNode (data, node) {
      if (this.beforeEdit(node)) {
        this.$set(data, 'in-input-type', 'input')
        // 获取分割后的labels
        this.editInputs.forEach((item, index) => {
          const editInputMapItem = this.editInputMap[item.id]
          // 初始化label对应到输入框
          editInputMapItem.value = data[item.id]
          // 初始化错误信息
          editInputMapItem.validateError = ''
        })
        // 设置正在编辑的节点中
        this.operationNode = node
        this.$emit('editNode', data)
      }
    },
    // 确认节点
    confirmNode (data, node) {
      // 假设验证通过
      let flag = false
      // 遍历复数输入框
      this.editInputs.forEach(item => {
        const editInputMapItem = this.editInputMap[item.id]
        // 判断节点是否需要校验
        if (item.validateFun && !item.hidden) {
          // 获取校验后的错误信息
          editInputMapItem.validateError = item.validateFun(editInputMapItem.value, node)
          if (editInputMapItem.validateError) {
            flag = true
          }
        }
      })
      // 阻止代码流程
      if (flag) return
      // 遍历复数输入框
      this.editInputs.forEach(item => {
        // 判断节点是否需要校验重名(存在同名错误信息 + 改节点没有被hidden掉 + 假设验证通过)
        if (item.sameNameError && !item.hidden && !flag) {
          const editInputMapItem = this.editInputMap[item.id]
          // 获取同级节点
          let nodeDatas = []
          if (!item.sameNameValiMode || item.sameNameValiMode === 'local') {
            // 获取同级节点
            nodeDatas = node.parent.data[this.props.children] || node.parent.data
          } else if (item.sameNameValiMode === 'overall') {
            // 获取所有节点
            nodeDatas = jsonFlat(this.$refs.infiniteTreeRef.root.data)
          }
          // 同名校验
          for (let p = 0; p < nodeDatas.length; p++) {
            const nItem = nodeDatas[p]
            // 节点名称重名判断
            if (nItem[item.id] === editInputMapItem.value && nItem[this.nodeKey] !== data[this.nodeKey]) {
              // 设置错误信息
              editInputMapItem.validateError = item.sameNameError
              flag = true
              break
            }
          }
        }
      })
      // 阻止代码流程
      if (flag) return

      // 编辑结束
      this.editOver(data, true)
      this.$emit('handlerSave', data)
    },
    // 删除节点
    delSelect (node, isOldData) {
      if (this.beforeDelete(node)) {
        // 垃圾收集器
        this.dustbin = {
          parent: node.parent,
          nextSibling: node.nextSibling,
          previousSibling: node.previousSibling,
          data: node.data
        }
        // 删除节点
        this.remove(node)
        // 清除记录的操作节点信息
        this.clearRecordNode()
        // 删除的是已创建存的节点时，emit删除完成方法
        isOldData && this.$emit('handlerDelete', node.data)
      }
    },
    // 撤销删除，目前仅支持撤销上一次删除的内容
    revocationDel (dustbin) {
      if (dustbin || this.dustbin) {
        const { parent, data, nextSibling, previousSibling } = dustbin || this.dustbin
        if (nextSibling) {
          this.insertBefore(data, nextSibling)
        } else if (previousSibling) {
          this.insertAfter(data, previousSibling)
        } else {
          this.append(data, parent)
        }
      }
      this.dustbin = null
    }
  }
}
