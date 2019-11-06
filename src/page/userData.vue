<template>
    <div>
        <head-top></head-top>
		<div class="page-title">用户数据</div>
		<div>
			<div class="visitor-region">
				<visitor-pie :pieData="pieData"></visitor-pie>
			</div>
			
			<!-- <test></test> -->
			<div class="visitor-sex">
				<userSexPie :userSexData="pieData"></userSexPie>
			</div>
			<!-- <userSexPie></userSexPie> -->
		</div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import visitorPie from '@/components/visitorPie'
	import test from '@/components/test'
	import userSexPie from '@/components/userSexPie'
	import {getUserCity} from '@/api/getData'
    export default {
    	data(){
    		return {
				pieData: {},
				// userSexData: {},
    		}
    	},
    	components: {
    		headTop,
            visitorPie,
			test,
			userSexPie

    	},
    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
    				const res = await getUserCity();
    				if (res.status == 1) {
    					this.pieData = res.user_city;
    				}else{
    					throw new Error(res)
    				}
    			}catch(err){
    				console.log('获取用户分布信息失败',err);
    			}
    		},
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
	.visitor-region{
		width: 45%;
        height: 450px;
		float: left;
		padding: 20px;
	}
	.visitor-sex{
		width: 45%;
        height: 450px;
		float: right;
		padding: 20px;
	}
	
</style>
