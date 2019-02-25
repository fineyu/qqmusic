import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'; 
import { Toast } from 'mint-ui';
window.Toast= Toast;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
