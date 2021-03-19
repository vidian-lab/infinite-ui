import { shallowMount } from '@vue/test-utils'
import InfiniteSelectTags from '@/packages/infinite-select-tags/src/index.vue'
import ElInput from 'element-ui/lib/input'
import ElTag from 'element-ui/lib/tag'
import ElSelect from 'element-ui/lib/select'
import ElOption from 'element-ui/lib/option'
import ElCheckbox from 'element-ui/lib/checkbox'
import InfiniteButton from '@/packages/infinite-button/src/index.vue'
import InfiniteSelectTagsOption from '@/packages/infinite-select-tags/src/infiniteSelectTagsOption.vue'
const getTestData = function () {
  return [
    {
      id: 'USD',
      name: '美元',
      disabled: true,
      children: [
        {
          id: 'USD-1',
          name: '美元-1'
        },
        {
          id: 'USD-2',
          name: '美元-2'
        },
        {
          id: 'USD-3',
          name: '美元-3'
        },
        {
          id: 'USD-4',
          name: '美元-4'
        }
      ]
    },
    {
      id: 'GBP',
      name: '英镑',
      children: [
        {
          id: 'GBP-1',
          name: '英镑-1'
        },
        {
          id: 'GBP-2',
          name: '英镑-2'
        },
        {
          id: 'GBP-3',
          name: '英镑-3'
        },
        {
          id: 'GBP-4',
          name: '英镑-4'
        }
      ]
    },
    {
      id: 'RMB',
      name: '人民币',
      disabled: true
    },
    {
      id: 'EUR',
      name: '欧元'
    },
    {
      id: 'CAD',
      name: '加元'
    },
    {
      id: 'AUD',
      name: '澳大利亚元'
    },
    {
      id: 'TAD',
      name: '泰元'
    },
    {
      id: 'MUD',
      name: '孟加拉元'
    }
  ]
}

describe('InfiniteSelectTags.vue', () => {
  const placeholder = '测试placeholder'
  const defaultCheckeds = ['USD', 'GBP-1', 'TAD']
  const options = getTestData()
  const wrapper = shallowMount(InfiniteSelectTags, {
    propsData: {
      filterable: true
    },
    stubs: {
      ElSelect,
      ElInput,
      ElTag,
      ElOption,
      ElCheckbox,
      InfiniteButton,
      InfiniteSelectTagsOption
    }
  })

  it('是否正确渲染', () => {
    expect(wrapper.attributes().class).toContain('infinite-select-tags')
  })

  // 检查已存在的元素
  it('是否有按钮', () => {
    expect(wrapper.find('.infinite-button').exists()).toBe(true)
  })

  // 事件测试
  it('component event emited', async () => {
    await wrapper.setProps({
      options,
      defaultCheckeds,
      placeholder
    })
    // 勾选选中数据
    const checked = {}
    defaultCheckeds.forEach(async item => {
      checked[item] = true
      await wrapper.setData({ checked })
    })

    const rootCheckboxInput = wrapper.findAll('.infinite-select-group-level-1 .exist-children > .el-checkbox input[type="checkbox"]').at(1)
    // 选中根节点
    await rootCheckboxInput.setChecked()
    expect(wrapper.emitted('checkBoxChange')).toBeTruthy()
    const childCheckboxInput = wrapper.findAll('.infinite-select-group-level-2').at(1).findAll('input[type="checkbox"]').at(0)

    // 取消子节点
    await childCheckboxInput.setChecked(false)
    expect(wrapper.emitted('checkBoxChange').length).toBe(2)

    // 点击全选
    const selectAllInput = wrapper.find('.infinite-select-button input[type="checkbox"]')
    await selectAllInput.setChecked()
    expect(wrapper.emitted('allSelect')).toBeTruthy()

    // 点击确定按钮
    const sureButton = wrapper.find('.infinite-select-button .infinite-button')
    sureButton.vm.$emit('click')
    expect(wrapper.emitted('makeSure')).toBeTruthy()

    // 下拉框弹出
    const selectTags = wrapper.find('.el-select')
    await selectTags.trigger('click')
    // 已弹出，触发一次 visible-change'
    expect(selectTags.emitted('visible-change').length).toBe(1)
    // 测试blur方法是否可关闭弹窗
    const mockBlur = jest.fn(wrapper.vm.blur)
    mockBlur()
    // blur方法触发一次
    expect(mockBlur).toBeCalledTimes(1)
    await wrapper.vm.$nextTick()
    // 弹窗关闭，合计触发两次 visible-change
    expect(selectTags.emitted('visible-change').length).toBe(2)
  })

  // 关键字搜索方法控制显隐
  it('reader search Fun', async () => {
    const inputWrapper = wrapper.find('.infinite-select-search input[type="text"]')
    await inputWrapper.setValue(options[2].name)
    expect(inputWrapper.element.value).toBe(options[2].name)
    wrapper.destroy()
  })
})
