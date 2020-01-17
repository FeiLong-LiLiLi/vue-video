<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<!-- <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item> -->
		</el-breadcrumb>
		
		<el-dropdown @command="handleCommand" menu-align='start'>
			<!-- <img :src="baseImgPath + adminInfo.avatar" class="avator"> -->
			<img  class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item><span>{{this.cookieInfo.adminName}}</span></el-dropdown-item>
				<!-- <el-dropdown-item><span>{{msg}}</span></el-dropdown-item> -->
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
			<!-- <el-button @click="test">测试</el-button> -->
		</el-dropdown>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'

    export default {
    	data(){
    		return {
				cookieInfo: {},
    			// msg: 'test'
    		}
		},
		watch:{
			// msg: 
			// isLogin();
		},
    	created(){
			this.getCookie();
			this.isLogin();
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
    	},
    	computed: {
			// ...mapState(['adminInfo']),
			// msg: this.
    	},
		methods: {
			// ...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');//路由首页
				}else if(command == 'signout'){
					this.$router.push('/');
					this.clearCookie()
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
				}
			},
			isLogin(){
				if(document.cookie.length <= 0){
					this.$router.push('/');//路由logo
					// console.log(111)
				}
			},
			test(){
				// this.getCookie();
				// this.isLogin()
				console.log(this.cookieInfo)
			},
			//设置cookie
			setCookie(adminName, adminId, adminPassWord, sessionId, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "adminName" +"="+ adminName +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "adminId" +"="+ adminId +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "adminPassWord" +"="+ adminPassWord +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "sessionId" +"="+ sessionId + ";path=/;expires=" + exdate.toGMTString();
			},
			//获取
			getCookie() {
                if (document.cookie.length > 0) {
					const arr = document.cookie.split('; '); //
					// console.log(document.cookie)
					arr.forEach((i) => { 
							const arr = i.split("=");
							this.cookieInfo[arr[0]]=arr[1];
					});
					// console.log(this.cookieInfo)
					
					
                }
			},
			//清除
			clearCookie() {
                this.setCookie("","","","",-1); //修改2值都为空，天数为负1天就好了
            }
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 50px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>
