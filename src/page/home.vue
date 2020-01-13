<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">数据统计</header>
			 <!-- <el-button @click="getSevenData">获取七日数据</el-button>
			  <el-button @click="getdate">显示七日数据</el-button> -->
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{loginCount}}</span> 登录量</div></el-col>
				<el-col :span="4"><div class="data_list"><span class="data_num">{{playCount}}</span> 播放量</div></el-col>
                <!-- <el-col :span="4"><div class="data_list"><span class="data_num">{{adminCount}}</span> 新增管理员</div></el-col> -->
			</el-row>
            <!-- <el-row :gutter="20">
                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allUserCount}}</span> 注册用户</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 视频</div></el-col>
                <el-col :span="4"><div class="data_list"><span class="data_num">{{allAdminCount}}</span> 管理员</div></el-col>
            </el-row> -->
		</section>
		<tendency :sevenDay='sevenDay' :sevenLoginData='sevenLoginData' :sevenPlayData='sevenPlayData'></tendency>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	import dtime from 'time-formater'
	import {initSevenData, getTodayLoginCount, getTodayPlayCount} from '@/api/getData'
    export default {
    	data(){
    		return {
				loginCount: null,
				playCount: null,
    			// userCount: null,
    			// orderCount: null,
                // adminCount: null,
                // allUserCount: null,
                // allOrderCount: null,
                // allAdminCount: null,
				sevenDay: [],
				sevenLoginData: [],
				sevenPlayData: []
    		}
		},
		created(){
			this.updateRealTime();
			
			setTimeout(this.initData(),3000)
			
		},
    	components: {
    		headTop,
    		tendency,
		},
		watch: {
			$route(to,from){
                if(to.path === '/manage'){  
					this.initData();
                }
        	}
		},
    	mounted(){
    		
    	},
        computed: {

        },
    	methods: {
			//初始化数据
			initData(){
				this.initSevenDay();
				this.initLoginData();
				this.initPlayData();
				this.getLoginSevenData();
				this.getPlaySevenData();
			},

			//初始化到今天为止的七天
			async initSevenDay(){
				this.sevenDay = [];
				for (let i = 6; i > -1; i--) {
					const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD');
					this.sevenDay.push(date);
					// console.log(date);
					// console.log(this.sevenDay);
					// try {	
					// 	const params = {today : date}
					// 	console.log(params);
					// 	const init = await initSevenData(params);
					// 		if(init.status == 200){
					// 			if(init.data.success == false){
					// 				this.$message({
					// 					showClose: true,
					// 					message: init.data.msg,
					// 					type: 'error'
					// 				});
					// 			}
					// 		}else{
					// 			this.$message({
					// 				showClose: true,
					// 				message: '初始化数据失败',
					// 				type: 'error'
					// 			});
					// 		}
					// 	}catch (error) {
					// 		console.log(error);
					// }
				}
			},

			//初始化登录量
			async initLoginData(){
				// const date = dtime(new Date().getTime()).format('YYYY-MM-DD');
				const params ={};
				params.today = dtime(new Date().getTime()).format('YYYY-MM-DD');	
				// console.log(params)
				try {
					const res = await getTodayLoginCount(params);
					console.log(res);
					if(res.status == 200){
						if(res.data.success == true){
							this.loginCount = res.data.amount;
						}else{
							console.log(res.data.msg);
						}
					}
				} catch (error) {
					console.log(error)
				}
			},

			//初始化播放量
			async initPlayData(){
				const params ={};
				params.today = dtime(new Date().getTime()).format('YYYY-MM-DD');	
				try {
					const res = await getTodayPlayCount(params);
					// console.log(res);
					if(res.status == 200){
						if(res.data.success == true){
							this.playCount = res.data.amount;
						}else{
							console.log(res.data.msg);
						}
					}
				} catch (error) {
					console.log(error)
				}
			},


			//实时更新（一小时一次）
			updateRealTime() {
                setInterval(() =>{this.initData()}, 60*60*1000);
			},
			
			//获取七日登录数据
			async getLoginSevenData(){
				try {
					this.sevenLoginData = [];
					const params ={};
					// console.log(this.sevenDay);
					for(var i = 0; i < 8; i++){
						// console.log(this.sevenDay[i]);
						params.today = this.sevenDay[i];
						const res = await getTodayLoginCount(params);
						if(res.status == 200){
							if(res.data.success == true){
								this.sevenLoginData.push(res.data.amount)
							}
						}
					}
				} catch (error) {
					console.log(error)
				}
			},

			//获取七日播放数据
			async getPlaySevenData(){
				try {
					this.sevenPlayData = [];
					const params ={};
					// console.log(this.sevenDay);
					for(var i = 0; i < 8; i++){
						// console.log(this.sevenDay[i]);
						params.today = this.sevenDay[i];
						const res = await getTodayPlayCount(params);
						if(res.status == 200){
							if(res.data.success == true){
								this.sevenPlayData.push(res.data.amount)
							}
						}
					}
				} catch (error) {
					console.log(error)
				}
			},

			getSevenData(){
				// try {	
					// 	const params = {today : date}
					// 	console.log(params);
					// 	const init = await initSevenData(params);
					// 	if(init.status == 200){
					// 		if(init.data.success == false){
					// 			this.$message({
					// 				showClose: true,
					// 				message: init.data.msg,
					// 				type: 'error'
					// 			});
					// 		}
					// 	}else{
					// 		this.$message({
					// 			showClose: true,
					// 			message: '初始化数据失败',
					// 			type: 'error'
					// 		});
					// 	}
					// }catch (error) {
					// 	console.log(error);
					// }
			},
			//获取数据测试
			getdate(){
				// const date = dtime(new Date().getTime()).format('YYYY-MM-DD');
				// console.log(date);
				console.log(this.sevenPlayData);
			},
			
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: center;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
