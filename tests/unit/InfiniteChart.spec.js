import { shallowMount } from '@vue/test-utils'
import InfiniteChart from '@/packages/infinite-chart/src/Index.vue'
import { getCommonScale, setAxis, setGemo, setScale, setToolTips,isInteger } from '../../packages/infinite-chart/src/util'

const option = {
  chartData: [
    { name: '1997', value: 86085, type: 'America' },
    { name: '2007', value: 144776, type: 'America' },
    { name: '2017', value: 193868, type: 'America' },
    { name: '1997', value: 9616, type: 'China' },
    { name: '2007', value: 35715, type: 'China' },
    { name: '2017', value: 122503, type: 'China' },
    { name: '1997', value: 44122, type: 'Japan' },
    { name: '2007', value: 45153, type: 'Japan' },
    { name: '2017', value: 48675, type: 'Japan' },
    { name: '1997', value: 22159, type: 'Germany' },
    { name: '2007', value: 34447, type: 'Germany' },
    { name: '2017', value: 36865, type: 'Germany' }
  ],
  type: 'interval',
  intervalConfig: {
    type: 'multi',
    position: 'name*value',
    multiName: 'type'
  }
}

describe('Chart.vue init ', () => {
  const { chartData, type, intervalConfig } = option

  const wrapper = shallowMount(InfiniteChart, {
    propsData: {
      chartData, type, intervalConfig
    }
  })

  it('查看Chart组件属性是否正确渲染', () => {
    const componentProps = wrapper.props()
    expect(
      (componentProps.chartData === chartData) &&
      componentProps.type === type &&
      componentProps.intervalConfig === intervalConfig
    ).toBe(true)
  })

  it('Chart图形分类是否正确配置✅', async () => {
    await wrapper.setProps({
      type: 'interval',
      intervalConfig: null
    })
    const ChartComponent = wrapper.findComponent({ name: 'ChartVue' })
    const { type, intervalConfig, render } = ChartComponent.vm
    expect(type === 'interval' && intervalConfig).toBe(null)
  })
})

describe('test utils', () => {
  it('测试getCommonScale方法正确输入输出', () => {
    const params = {
      data: [100, 200, 300, 400, 500],
      tick: 4
    }
    expect(getCommonScale(params.data, params.tick)).toStrictEqual({ min: 100, max: 500 })
    const params2 = {
      data: [90, 200, 300, 400, 500],
      tick: 4
    }
    expect(getCommonScale(params2.data, params2.tick)).toStrictEqual({ min: 60, max: 500 })
  })

  it('测试getCommonScale方法在输入空数组情况，是否通过✅', () => {
    const badParams = {
      data: [],
      tick: 4
    }
    expect(getCommonScale(badParams.data, badParams.tick)).toStrictEqual('数组长度必须大于1')
  })

  it('测试getCommonScale方法在输入非数组，是否通过✅', () => {
    const badParams = {
      data: '',
      tick: 4
    }
    expect(getCommonScale(badParams.data, badParams.tick)).toStrictEqual('请传入数组参数')
  })

  it('测试 isInteger 方法是否通过✅', () => {
    const data = 100
    expect(isInteger(data)).toBe(true)
  })

  it('测试 isInteger 输入非整数，应该接受失败', () => {
    const data = 100.1
    expect(isInteger(data)).toBe(false)
  })

  it('测试 setAxis 方法', () => {
    const params = {
      chart: {
        axis: function () {}
      },
      axisConfig: [{

      }]
    }
    // 原始
    expect(setAxis(params.chart, params.axisConfig)).toBe(params.chart)
  })

  it('测试 setAxis 方法, 再输入空数组的情况下。是否返回undefined', () => {
    const params = {
      chart: {
        axis: function () {}
      },
      axisConfig: ''
    }
    // 原始
    expect(setAxis(params.chart, params.axisConfig)).toBe(undefined)
  })

  it('测试 setScale 方法', () => {
    const params = {
      chart: {
        scale: function () {}
      },
      testData: [], // 原始数据
      lineConfig: [], //
      axisConfig: {}
    }
    // 原始
    expect(setScale(params.chart, params.lineConfig, params.testData, params.axisConfig)).toBe(params.chart)
  })

  it('测试 setToolTips 方法', () => {
    const params = {
      chart: {
        tooltip: function () {}
      },
      toolConfig: [] // 原始数据
    }
    // 原始
    expect(setToolTips(params.chart, params.toolConfig)).toBe(params.chart)
  })

  it('测试 setToolTips 方法', () => {
    const params = {
      chart: {
        tooltip: function () {}
      },
      toolConfig: [{
        itemTplFunc: function () {
          return '<div></div>'
        }
      }]
    }
    // 原始
    expect(setToolTips(params.chart, params.toolConfig)).toBe(params.chart)
  })

  it('测试 setToolTips 方法', () => {
    const params = {
      chart: {
        tooltip: function () {}
      },
      toolConfig: [{
        item: function () {
          return '<div></div>'
        }
      }] // 原始数据
    }
    // 原始
    expect(setToolTips(params.chart, params.toolConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 是否通过', () => {
    const params = {
      chart: {
        tooltip: function () {},
        line: function () {}
      },
      type: 'line',
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      intervalConfig: [], //
      GemoConfig: [{
        position: 'day*value',
        size: 1,
        shape: 'smooth',
        color: '#fff'
      }]
    }
    // 原始
    expect(setGemo(params.chart, params.lineConfig, params.testData, params.axisConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 配置异常参数，是否捕获', () => {
    const params = {
      chart: {
        tooltip: function () {},
        line: function () {}
      },
      type: 'interval',
      intervalConfig: {
        // type: 'multi'
      }
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig)).toBe('请最少传入一个配置')
  })

  it('测试 setGemo 方法, 配置异常参数，是否捕获', () => {
    const params = {
      chart: {
        tooltip: function () {},
        line: function () {}
      },
      type: 'interval',
      intervalConfig: {
        type: 'multi'
      }
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig)).toBe('请传入合法的position值')
  })

})
