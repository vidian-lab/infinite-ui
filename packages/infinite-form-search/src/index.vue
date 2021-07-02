<template>
  <div :class="className">
    <el-form class="search-form" :rules="formModels.rules" :model="formModels.models">
   
      <el-form-item
        v-for="item in searchItem"
        :key="item.inputBox.searchKey"
        :prop="item.inputBox.searchKey"
      >
        
        <form-search-item
          :inputBox="item.inputBox"
          :searchModels="formModels.models"
          :size="size"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormSearchItem from './infiniteFormSearchItem'
import ElForm from 'element-ui/lib/form'
import ElFormItem from 'element-ui/lib/form-item'
export default {
  name: 'InfiniteFormSearch',
  components: {
    FormSearchItem,
    ElForm,
    ElFormItem
  },
  props: {
    searchItem: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: 'search-warp'
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    formModels () {
      const result = {
        models: {},
        rules: {}
      }
      this.searchItem.forEach((v) => {
        result['models'][v.inputBox.searchKey] = ''
        result['rules'] = v.inputBox.rules
      })
      return result
    }
  }
}
</script>
