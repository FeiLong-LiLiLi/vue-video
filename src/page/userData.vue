<template>
    <div>
        <head-top></head-top>
		<div class="page-title">用户数据</div>
		<div>
			<div class="visitor-sex">
				<sexPie :sexData="sexData"></sexPie>
			</div>
			<!-- <div class="visitor-region">
				<visitor-pie :pieData="pieData"></visitor-pie>
			</div> -->
			
			<!-- <test></test> -->
			
			<!-- <userSexPie></userSexPie> -->
		</div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import visitorPie from '@/components/visitorPie'
	import test from '@/components/test'
	import sexPie from '@/components/sexPie'
	import {getUserSex} from '@/api/getData'
    export default {
    	data(){
    		return {
				pieData: {},
				sexData: {
					male: 111,
					female: 222,
					secrecy: 333
				},
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
			test,
			sexPie

		},
		created(){
			this.initSexData();
		},
		watch: {
			$route(to,from){
				// console.log(to);
				// console.log(from)
                if(to.path === '/userData'){  
					this.initSexData();
                }
        	}
		},
    	methods: {
			async initSexData(){
				try {
					const res = await getUserSex();
					if(res.status == 200){
						if(res.data.success == true){
							this.sexData = res.data.sex;
						}else{
							console.log(res.data.msg)
						}
					}
				} catch (error) {
					console.log(error);
				}
			}
    		// async initData(){
    		// 	try{
    		// 		const res = await getUserCity();
    		// 		if (res.status == 1) {
    		// 			this.pieData = res.user_city;
    		// 		}else{
    		// 			throw new Error(res)
    		// 		}
    		// 	}catch(err){
    		// 		console.log('获取用户分布信息失败',err);
    		// 	}
			// },
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.page-title{
        font-size: 30px;
        text-align: center;
        padding: 20px;
    }
	// .visitor-region{
	// 	width: 45%;
    //     height: 450px;
	// 	float: right;
	// 	padding: 20px;
	// }
	.visitor-sex{
		width: 450px;
        // height: 450px;
		// float: left;
		margin: 0 auto;
		padding: 20px;
	}
	
</style>
