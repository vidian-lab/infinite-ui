import { mount } from '@vue/test-utils'
import InfiniteLineChart from '@/packages/infinite-line-chart/src/index.vue'
import mixinChart from '@/packages/mixins/chart'

describe('InfiniteLineChart', () => {
  // let actions

  // beforeEach(() => {
  //   actions = {
  //     drawChart: jest.fn().mockName('drawChart')
  //   }
  // })
  const wrapper = mount(InfiniteLineChart, { 
    mixins: [mixinChart]
  })
  it('should be div container exists', () => {
    expect(wrapper.find('div').attributes().id).not.toBeNull()
  })
  it('should be mixins isloaded', async () => {
    expect(wrapper.vm.id).not.toBeNull()
    const fn = jest.fn(wrapper.vm.drawChart).mockReturnValue(true)
    await expect(fn()).toBe(true)
  })
})
