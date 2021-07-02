<template lang="html">
  <div class="menu-model">
    <infinite-nav-menu 
      :data="menuList" 
      :default-openeds="['1', '2', '3']"
      :default-active="defaultActive"
      @select="onSelect"
    >
    </infinite-nav-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultActive: '/guide/installation',
      mainMenuData: [
        {
          index: '1',
          label: '开发指南',
          children: [
            {
              index: '/guide/installation',
              label: '安装'
            }
          ]
        },
        {
          index: '2',
          label: '通用模块'
        },
        {
          index: '3',
          label: '图表模块'
        }
      ]
    }
  },
  computed: {
    menuList () {
      const componentlist = []
      const chartlist = []
      this.$router.options.routes.forEach((route) => {
        if (route.name === 'Guide') {
          route.children.forEach(r => {
            if (r.meta && r.meta.type === 'component') {
              componentlist.push({
                index: r.path,
                label: r.name
              })
            }
            if (r.meta && r.meta.type === 'chart') {
              chartlist.push({
                index: r.path,
                label: r.name
              })
            }
          })
        }
      })
      this.$set(this.mainMenuData[1], 'children', componentlist)
      this.$set(this.mainMenuData[2], 'children', chartlist)

      return this.mainMenuData
    }
  },
  methods: {
    onSelect (index, indexPath) {
      this.$route.path !== index && this.$router.push({
        path: index
      })
    }
  },
  watch: {
    '$route': {
      handler (val) {
        const path = val.fullPath
        this.defaultActive = path === '/' ? '/guide/installation' : path
      },
      immediate: true
    }
  }
}
</script>
