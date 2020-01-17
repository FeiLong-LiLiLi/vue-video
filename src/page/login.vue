<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>video后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.email" placeholder="邮箱"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.psw"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm(loginForm)" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
				<!-- <p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p> -->
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo, initSevenData} from '@/api/getData'
	import dtime from 'time-formater'
	// import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					email: '',
					psw: '',
				},
				rules: {
					// username: [
			        //     { required: true, message: '请输入邮箱', trigger: 'blur' },
			        // ],
					// password: [
					// 	{ required: true, message: '请输入密码', trigger: 'blur' }
					// ],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		watch: {
			// adminInfo: function (newValue){
			// 	if (newValue.id) {
			// 		this.$message({
            //             type: 'success',
            //             message: '检测到您之前登录过，将自动登录'
            //         });
			// 		this.$router.push('manage')
			// 	}
			// }
		},
		computed: {
			// ...mapState(['adminInfo']),
		},
		methods: {
			// ...mapActions(['getAdminData']),
			async submitForm(formName) {
				// console.log(formName.email)
				if(formName.email != '' && formName.psw != ''){
					const params = formName;
					try {
						const res = await login(params);
						// console.log(res);
						if(res.status == 200){
							if(res.data.success == true){
								this.initSevenDay();
								
								const data = res.data.session.user;
								// console.log(data);
								this.setCookie(data.name,data.admin_id,data.psw,res.data.sessionID,1)
								this.$message({
									showClose: true,
									message: res.data.msg,
									type: 'success'
								});
								// this.$router.push({
								// 	path: 'manage',
								// 	// params: res.data
								// });
							}
							else{
							this.$message({
								showClose: true,
								message: res.data.msg,
								type: 'warning'
							});
						}
						}
					} catch (error) {
						console.log(error);
					}
				}else{
					this.$message({
						showClose: true,
						message: '请输入正确的账号和密码',
						type: 'error'
					});
					return false;
				}
				
			},

			//设置cookie
			setCookie(adminName, adminId, adminPassWord, sessionId,exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "adminName" +"="+ adminName +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "adminId" +"="+ adminId +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "adminPassWord" +"="+ adminPassWord +";path=/;expires=" + exdate.toGMTString();
				window.document.cookie = "sessionId" +"="+ sessionId + ";path=/;expires=" + exdate.toGMTString();
            },

			//初始化数据
			async initSevenDay(){
				this.sevenDay = [];
				for (let i = 6; i > -1; i--) {
					const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD');
					this.sevenDay.push(date);
					console.log(date);
					// console.log(this.sevenDay);
					try {	
						const params = {today : date}
						// console.log(params);
						const init = await initSevenData(params);
						if(init.status == 200){
							if(init.data.success == false){
								this.$message({
									showClose: true,
									message: init.data.msg,
									type: 'error'
								});
							}
							// this.$router.push('manage');
						}else{
							this.$message({
								showClose: true,
								message: '初始化数据失败',
								type: 'error'
							});
							// this.$router.push('manage');
						}

					}catch (error) {
						console.log(error);
					}
				}
			},
		},
		
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #701b5e;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
