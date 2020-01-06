<template>
    <div>
        <headTop></headTop>
        <div class="page-title">视频数据</div>
        <div>
            <div class="type">
                <videoType :typeData='pieData'></videoType>
            </div>

            <!-- <div class="category"><videoActionCategory></videoActionCategory></div> -->
            
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import test from '../components/test'
    import videoType from '../components/videoType'
    import videoActionCategory from '../components/videoActionCategory'
    import {getAllCategoriesNum} from '@/api/getData'

    export default {
        data(){
            return{
                pieData: {}

            }
        },
        created(){
            this.initCategoriesNum();
        },
        components:{
            headTop,
            test,
            videoType,
            videoActionCategory,

        },
        mounted(){
    		//  this.initCategoriesNum();
        },
        watch: {
            $route(to,from){
                // console.log(to)
                // console.log(to.path);
                if(to.path === '/videoData'){  
                    this.initCategoriesNum();
                }
            }
         },
    	methods: {
    		async initCategoriesNum(){
                try {
                    const res = await getAllCategoriesNum();
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.success == true){
                            // this.pieData = {};
                            this.pieData = res.data.allCategoriesNum;
                            // console.log(this.pieData);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            
            // async test(){
            //     alert('test');
            //     console.log(test);
            // }
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
    .type, .category{
        padding: 20px;
        
    }
     *{ touch-action: pan-y; }
</style>