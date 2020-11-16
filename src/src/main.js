import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import store from './store'
import 'v-contextmenu/dist/index.css'
import animate from 'animate.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.use(VueAxios, axios)

//在store/index.js里已经引入vuex

Vue.use(animate)//动画库插件
Vue.use(Antd)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
