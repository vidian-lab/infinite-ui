<template>
  <div class="chart-container">
    <ChartVue ref='chart-ref' :id="id" v-bind="computedProps">
      <slot></slot>
    </ChartVue>
  </div>
</template>

<script>
import ChartVue from './Chart'
import propsConfig from './props'
export default {
  name: 'InfiniteChart',
  components: {
    ChartVue
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
