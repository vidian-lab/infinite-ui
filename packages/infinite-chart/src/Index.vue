<template>
  <div class="chart-container">
    <Chart :id="id" v-bind="computedProps">
      <slot></slot>
    </Chart>
  </div>
</template>

<script>
import Chart from './Chart'
import propsConfig from './props'
export default {
  name: 'InfiniteChart',
  components: {
    Chart
  },
  props: propsConfig,
  computed: {
    id () {
      return 'chart-' + Math.round(Math.random() * 100000000)
    },
    computedProps () {
      return this._props
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
