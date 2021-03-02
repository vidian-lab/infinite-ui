import { shallowMount } from '@vue/test-utils'
import InfiniteChart from '@/packages/infinite-chart/src/Index.vue'
import { getCommonScale, setAxis, setGemo, setScale, setToolTips, isInteger, getArraysBoundary, getDivision, setLegend, getGeomColor, mergeDeep } from '@/packages/infinite-chart/src/util'

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

function createFunc () {
  return function () {
    return this
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
    const { type, intervalConfig } = ChartComponent.vm
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
        name: 'day'
      }, {
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
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      lineConfig: [{
        position: 'day*value',
        config: {

        }
      }], //
      scaleConfig: [{
        name: 'China'
      }]
    }
    // 原始
    expect(setScale(params.chart, params.lineConfig, params.testData, params.scaleConfig)).toBe(params.chart)
  })

  it('测试 setScale 方法,CONFIG默认对象 ', () => {
    const params = {
      chart: {
        scale: function () {}
      },
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      lineConfig: [{
        position: 'day*value',
        config: {

        }
      }], //
      scaleConfig: {}
    }
    // 原始
    expect(setScale(params.chart, params.lineConfig, params.testData, params.scaleConfig)).toBe(params.chart)
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

  it('测试 setToolTips 方法，直接配置config', () => {
    const params = {
      chart: {
        tooltip: function () {}
      },
      toolConfig: [{
        visible: true,
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
        tooltip: createFunc(),
        line: createFunc(),
        size: createFunc(),
        position: createFunc(),
        shape: createFunc(),
        color: createFunc()
      },
      type: 'line',
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      intervalConfig: {}, //
      GemoConfig: [{
        position: 'day*value',
        size: 1,
        shape: 'smooth',
        color: '#fff'
      }]
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params.GemoConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 是否通过', () => {
    const params = {
      chart: {
        tooltip: createFunc(),
        line: createFunc(),
        size: createFunc(),
        position: createFunc(),
        shape: createFunc(),
        color: createFunc()
      },
      type: 'line',
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      intervalConfig: {
        position: 'day*value',
        size: 1,
        shape: 'smooth',
        color: '#fff'
      }
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params.GemoConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 是否通过', () => {
    const params = {
      chart: {
        tooltip: createFunc(),
        line: createFunc(),
        size: createFunc(),
        position: createFunc(),
        shape: createFunc(),
        color: createFunc(),
        adjust: createFunc()
      },
      type: 'interval',
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      intervalConfig: {
        size: 1,
        shape: 'smooth',
        color: '#fff'
      }
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params.GemoConfig)).toBe(params.chart)
  })
  it('测试 setGemo 方法, 是否通过', () => {
    const params = {
      chart: {
        tooltip: createFunc(),
        interval: createFunc(),
        size: createFunc(),
        position: createFunc(),
        shape: createFunc(),
        color: createFunc(),
        adjust: createFunc()
      },
      type: 'interval',
      testData: [{
        day: 1,
        value: 2
      }], // 原始数据
      intervalConfig: {
        position: 'day*value',
        size: 1,
        shape: 'smooth',
        color: '#fff',
        type: 'interval'
      }
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params.GemoConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 使用GemoConfig配置', () => {
    const params = {
      chart: {
        tooltip: createFunc(),
        line: createFunc(),
        interval: createFunc(),
        position: createFunc(),
        color: createFunc(),
        adjust: createFunc(),
        size: createFunc(),
        shape: createFunc()
      },
      type: 'interval',
      GemoConfig: [{
        position: 'day*value'
      }]
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params.GemoConfig)).toBe(params.chart)
  })

  it('测试 setGemo 方法, 配置异常参数，是否捕获', () => {
    const params = {
      chart: {
        tooltip: function () {},
        line: function () {}
      },
      type: 'interval',
      GemoConfig: [{
        // type: 'multi'
      }]
    }
    // 原始
    expect(setGemo(params.chart, params.type, params.intervalConfig, params)).toBe(params.chart)
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

  it('测试 getArraysBoundary  方法', () => {
    const data = [1, 2, 3]
    // 原始
    expect(getArraysBoundary(data)).toStrictEqual({ min: 1, max: 3 })
  })

  it('测试  getDivision 方法', () => {
    const data = { min: 90, max: 500 }
    expect(getDivision(data)).toStrictEqual([60, 500])
  })

  it('测试 setLegend 方法 ', () => {
    const params = {
      chart: {
        legend: createFunc(),
        geometries: []
      },
      config: {},
      legends: [{}]
    }
    expect(setLegend(params.chart, params.legends, params.config)).toBe(params.chart)
  })

  it('测试 setLegend 方法, 只走 ', () => {
    const params = {
      chart: {
        legend: createFunc(),
        geometries: []
      },
      config: {},
      legends: [{}]
    }
    expect(setLegend(params.chart, params.legends, params.config)).toBe(params.chart)
  })

  it('测试 setLegend 方法，分支情况，config 不存在 ', () => {
    const params = {
      chart: {
        legend: createFunc(),
        geometries: [{
          theme: false,
          attributeOption: {
            color: {
              filed: ['#fff']
            },
            position: {
              field: ['name', 'China']
            }
          }
        }],
        themeObject: {
          colors10: ['#f00', '#ff0']
        }
      },
      legends: [{
        names: ['China']
      }, {
        names: 'China, Japan'
      }],
      intervalConfig: {
        type: 'multi',
        position: 'name*value',
        multiName: 'type'
      },
      type: 'interval',
      data: [{
        type: 'name',
        name: 'China',
        value: 100
      }]
    }
    expect(setLegend(params.chart, params.legends, undefined, params.intervalConfig, params.type, params.data)).toBe(params.chart)
  })

  it('测试 setLegend 方法，分支情况，不存在legend的相关配置 ', () => {
    const params = {
      chart: {
        legend: createFunc(),
        geometries: [{
          theme: false,
          attributeOption: {
            color: {
              filed: ['#fff']
            },
            position: {
              field: ['name', 'China']
            }
          }
        }],
        themeObject: {
          colors10: ['#f00', '#ff0']
        }
      },
      legends: [],
      data: [{

      }]
    }
    expect(setLegend(params.chart, params.legends)).toBe(params.chart)
  })

  it('测试 getGeomColor 方法， 错误入参情况是否✅ ', () => {
    const params = {
      colors: null
    }
    expect(getGeomColor(params.colors)).toBe('入参不符合规范')
  })

  it('测试 getGeomColor 方法， 返回colors，position 对应name 是否✅ ', () => {
    const params = {
      colors: [{
        position: {
          fields: ['name', 'China']
        },
        color: {
          fields: ['#f00']
        }
      }]
    }
    expect(getGeomColor(params.colors, 'China')).toStrictEqual(['#f00'])
  })
})

describe('test function', () => {
  it('mergeDeep 深拷贝函数', () => {
    const obj1 = {
      a: 1,
      b: {
        c: 2,
        d: [3, 2, 1]
      }
    }
    const obj2 = {
      b: {
        d: [4]
      }
    }
    const result = { 'a': 1, 'b': { 'c': 2, 'd': [3, 2, 1, 4] } }
    expect(mergeDeep(obj1, obj2)).toStrictEqual(result)
  })
})
