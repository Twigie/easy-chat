import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// custom styles
import './assets/css/theme-colors.scss'

new Vue({
  render: h => h(App),
}).$mount('#app')
