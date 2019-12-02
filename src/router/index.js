import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
// const userListNEW = r => require.ensure([], () => r(require('@/page/userListNEW')), 'userListNEW');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
// const adminListNEW = r => require.ensure([], () => r(require('@/page/adminListNEW')), 'adminListNEW');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const videoList = r => require.ensure([], () => r(require('@/page/videoList')), 'videoList');
const messageList = r => require.ensure([], () => r(require('@/page/messageList')), 'messageList');


const userData = r => require.ensure([], () => r(require('@/page/userData')), 'userData');
const adminData = r => require.ensure([], () => r(require('@/page/adminData')), 'adminData');
const videoData = r => require.ensure([], () => r(require('@/page/videoData')), 'videoData');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
// const adminPer = r => require.ensure([], () => r(require('@/page/adminPer')), 'adminPer');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const userMonitoring = r => require.ensure([], () => r(require('@/page/userMonitoring')), 'userMonitoring');
const videoMonitoring = r => require.ensure([], () => r(require('@/page/videoMonitoring')), 'videoMonitoring');

const userMonView = r => require.ensure([], () => r(require('@/page/userMonView')), 'userMonView');
const videoMonView = r => require.ensure([], () => r(require('@/page/videoMonView')), 'videoMonView');

const videoCategory = r => require.ensure([], () => r(require('@/page/videoCategory')), 'videoCategory');
const videoTag = r => require.ensure([], () => r(require('@/page/videoTag')), 'videoTag');

const test = r => require.ensure([], () => r(require('@/page/test')), 'test');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/test',
		component: test
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/shopList',
			component: shopList,
			meta: ['数据管理', '商家列表'],
		},{
			path: '/foodList',
			component: foodList,
			meta: ['数据管理', '食品列表'],
		},{
			path: '/orderList',
			component: orderList,
			meta: ['数据管理', '订单列表'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/videoList',
			component: videoList,
			meta: ['数据管理', '视频列表'],
		},{
			path: '/messageList',
			component: messageList,
			meta: ['数据管理', '通知列表'],
		},{
			path: '/userData',
			component: userData,
			meta: ['数据统计', '用户数据'],
		},{
			path: '/adminData',
			component: adminData,
			meta: ['数据统计', '管理员数据'],
		},{
			path: '/videoData',
			component: videoData,
			meta: ['数据统计', '视频数据'],
		},{
			path: '/userMonitoring',
			component: userMonitoring,
			meta: ['实时监控', '用户监控'],
		},{
			path: '/userMonitoring/userMonView',
			component: userMonView,
			meta: ['实时监控', '用户监控', '用户监控视图'],
		},{
			path: '/videoMonitoring',
			component: videoMonitoring,
			meta: ['实时监控', '视频监控'],
		},{
			path: '/videoMonitoring/videoMonView',
			component: videoMonView,
			meta: ['实时监控', '视频监控','视频监控视图'],
		},{
			path: '/videoCategory',
			component: videoCategory,
			meta: ['数据管理', '视频类型'],
		},{
			path: '/videoTag',
			component: videoTag,
			meta: ['数据管理', '视频标签'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/adminSet',
			component: adminSet,
			meta: ['设置', '个人信息'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '我的权限'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
	mode: 'history',//去掉#号
})
