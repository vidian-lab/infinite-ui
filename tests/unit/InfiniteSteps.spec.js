
import { mount } from '@vue/test-utils'
import InfiniteSteps from '@/packages/infinite-steps/src/index.vue'
import ElStep from 'element-ui/lib/step.js'
const stepsData = [
  {
    title: '步骤一',
    description: '这里是步骤二的一些基本描述',
    icon: 'el-icon-edit'
  },
  {
    title: '步骤二',
    description: '这里是步骤二的一些基本描述',
    icon: 'el-icon-upload'
  },
  {
    title: '步骤三',
    description: '这里是步骤三的一些基本描述',
    icon: 'el-icon-picture'
  }
]
let active = 0

describe('InfiniteSteps.vue', () => {
  const wrapper = mount(InfiniteSteps)

  it('stepsData to match step attrs', async () => {
    await wrapper.setProps({
      stepsData,
      active,
      finishStatus: 'success'
    })

    const ElStepWrappers = wrapper.findAllComponents(ElStep)
    ElStepWrappers.wrappers.forEach((stepWrapper, index) => {
      Object.keys(stepsData[index]).forEach((key, kIndex) => {
        expect(stepWrapper.props(key)).toBe(Object.values(stepsData[index])[kIndex])
      })
    })
  })

  it('is next step test', async () => {
    const ElStepWrappers = wrapper.findAllComponents(ElStep)
    // 此时点击任何步骤不可以跳跃步骤
    await ElStepWrappers.at(2).trigger('click')

    // 设置是否跳跃步骤函数
    await wrapper.setProps({
      isSkipMethod: (active) => active % 2
    })

    // 基数数步骤不可以跳跃步骤
    await ElStepWrappers.at(2).trigger('click')
    // 只有偶数步骤可以跳跃步骤
    await ElStepWrappers.at(1).trigger('click')
    // 最后input方式只触发一次
    expect(wrapper.emitted('input').length).toBe(1)
    // 触发参数当前步骤index
    expect(wrapper.emitted('input')[0]).toEqual([1])
  })
})
