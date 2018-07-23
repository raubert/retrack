import Vue from 'vue'
import VueResource from 'vue-resource'
import {
  MdApp,
  MdButton,
  MdCard,
  MdCheckbox,
  MdContent,
  MdDivider,
  MdEmptyState,
  MdField,
  MdIcon,
  MdList,
  MdProgress,
  MdRipple,
  MdTable,
  MdTabs,
  MdToolbar,
  MdTooltip
} from 'vue-material/dist/components'

// import router from '@/router'
import App from '@/App.vue'

Vue.use(VueResource)
Vue.use(MdApp)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdCheckbox)
Vue.use(MdContent)
Vue.use(MdDivider)
Vue.use(MdEmptyState)
Vue.use(MdField)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdProgress)
Vue.use(MdRipple)
Vue.use(MdTable)
Vue.use(MdTabs)
Vue.use(MdToolbar)
Vue.use(MdTooltip)

Vue.config.productionTip = false

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import './styles.scss'

new Vue({
  // router,
  render: h => h(App)
}).$mount('#app')
