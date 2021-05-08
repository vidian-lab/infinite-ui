/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import InfiniteButton from './infinite-button'
import InfiniteCascaders from './infinite-cascaders'
import InfiniteDialog from './infinite-dialog'
import InfiniteDownload from './infinite-download'
import InfiniteDragContainer from './infinite-drag-container'
import InfiniteForm from './infinite-form'
import InfiniteLineChart from './infinite-line-chart'
import InfiniteNavMenu from './infinite-nav-menu'
import InfiniteOption from './infinite-option'
import InfinitePagination from './infinite-pagination'
import InfinitePieChart from './infinite-pie-chart'
import InfiniteResult from './infinite-result'
import InfiniteSelect from './infinite-select'
import InfiniteSelectTags from './infinite-select-tags'
import InfiniteSelectTagsOption from './infinite-select-tags-option'
import InfiniteStep from './infinite-step'
import InfiniteSteps from './infinite-steps'
import InfiniteTable from './infinite-table'
import InfiniteTableColumn from './infinite-table-column'
import InfiniteThemePicker from './infinite-theme-picker'
import InfiniteTree from './infinite-tree'
const version = '1.0.10'
const components = [
  InfiniteButton,
  InfiniteCascaders,
  InfiniteDialog,
  InfiniteDownload,
  InfiniteDragContainer,
  InfiniteForm,
  InfiniteLineChart,
  InfiniteNavMenu,
  InfiniteOption,
  InfinitePagination,
  InfinitePieChart,
  InfiniteResult,
  InfiniteSelect,
  InfiniteSelectTags,
  InfiniteSelectTagsOption,
  InfiniteStep,
  InfiniteSteps,
  InfiniteTable,
  InfiniteTableColumn,
  InfiniteThemePicker,
  InfiniteTree
]
const install = Vue => {
  components.forEach(Component => {
    if (Component.install && Component.name.toLocaleLowerCase().includes('infinite')) {
      Vue.use(Component)
    }else{
      Vue.prototype[`$${Component.name}`] = Component
    }
  })
};  
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  install,
  version,
  InfiniteButton,
  InfiniteCascaders,
  InfiniteDialog,
  InfiniteDownload,
  InfiniteDragContainer,
  InfiniteForm,
  InfiniteLineChart,
  InfiniteNavMenu,
  InfiniteOption,
  InfinitePagination,
  InfinitePieChart,
  InfiniteResult,
  InfiniteSelect,
  InfiniteSelectTags,
  InfiniteSelectTagsOption,
  InfiniteStep,
  InfiniteSteps,
  InfiniteTable,
  InfiniteTableColumn,
  InfiniteThemePicker,
  InfiniteTree
}
export default {
  install,
  version,
  InfiniteButton,
  InfiniteCascaders,
  InfiniteDialog,
  InfiniteDownload,
  InfiniteDragContainer,
  InfiniteForm,
  InfiniteLineChart,
  InfiniteNavMenu,
  InfiniteOption,
  InfinitePagination,
  InfinitePieChart,
  InfiniteResult,
  InfiniteSelect,
  InfiniteSelectTags,
  InfiniteSelectTagsOption,
  InfiniteStep,
  InfiniteSteps,
  InfiniteTable,
  InfiniteTableColumn,
  InfiniteThemePicker,
  InfiniteTree
}
  