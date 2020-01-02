import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import	axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import 'default-passive-events'

Vue.config.productionTip = false;

Vue.prototype.axios = axios;

// Vue.prototype.axios = axios.create({
// 	header: {"Content-Type": "application/json;charset=utf-8"},
// 	withCredentials: true
// });	//全局引用需要加this

Vue.use(ElementUI);
// Vue.use(axios);

new Vue({
	el: '#app',
	router,
	store,
	// axios,
	template: '<App/>',
	components: { App }
})

  
