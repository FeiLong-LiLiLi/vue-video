<template>
    <div>
        <headTop></headTop>
        <div class="page-title">视频数据</div>
        <div>
            <!-- <test :userSexData="pieData"></test> -->
            <!-- <test></test> -->
            <div class="type"><videoType></videoType></div>
            <div class="category"><videoActionCategory></videoActionCategory></div>
            
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import test from '../components/test'
    import videoType from '../components/videoType'
    import videoActionCategory from '../components/videoActionCategory'
    

    export default {
        data(){
            return{
            pieData: {}

            }
        },
        components:{
            headTop,
            test,
            videoType,
            videoActionCategory,

        },
        // mounted(){
    	// 	this.initData();
    	// },
    	// methods: {
    	// 	async initData(){
    	// 		try{
    	// 			const res = await getUserCity();
    	// 			if (res.status == 1) {
    	// 				this.pieData = res.user_city;
    	// 			}else{
    	// 				throw new Error(res)
    	// 			}
    	// 		}catch(err){
    	// 			console.log('获取用户分布信息失败',err);
    	// 		}
    	// 	},
    	// }

}
</script>

<style lang="less">
	@import '../style/mixin';
	.page-title{
        font-size: 30px;
        text-align: center;
        padding: 20px;
    }
    .type, .category{
        padding: 20px;
        
    }

</style>