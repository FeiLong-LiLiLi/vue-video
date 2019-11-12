import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import	axios from 'axios'
import 'element-ui/lib/theme-default/index.css'

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
// axios.all('*', function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "X-Requested-With");
// 	// res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
// 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
// 	res.header("X-Powered-By",' 3.2.1');
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
//   });
  
