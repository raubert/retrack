import Vue from 'vue'
import {
  MdApp,
  MdBadge,
  MdButton,
  MdCard,
  MdCheckbox,
  MdContent,
  MdDialog,
  MdDivider,
  MdDrawer,
  MdEmptyState,
  MdField,
  MdIcon,
  MdList,
  MdMenu,
  MdProgress,
  MdRipple,
  MdSnackbar,
  MdTable,
  MdTabs,
  MdToolbar,
  MdTooltip
} from 'vue-material/dist/components'

// import router from '@/router'
import App from '@/App.vue'

Vue.use(MdApp)
Vue.use(MdBadge)
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdCheckbox)
Vue.use(MdContent)
Vue.use(MdDialog)
Vue.use(MdDivider)
Vue.use(MdDrawer)
Vue.use(MdEmptyState)
Vue.use(MdField)
Vue.use(MdIcon)
Vue.use(MdList)
Vue.use(MdMenu)
Vue.use(MdProgress)
Vue.use(MdRipple)
Vue.use(MdSnackbar)
Vue.use(MdTable)
Vue.use(MdTabs)
Vue.use(MdToolbar)
Vue.use(MdTooltip)

Vue.config.productionTip = false

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
import './styles.scss'

new Vue({
  render: h => h(App)
}).$mount('#app')
