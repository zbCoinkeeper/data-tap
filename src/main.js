import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'


axios.defaults.baseURL="/label"
Vue.prototype.axios=axios

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
