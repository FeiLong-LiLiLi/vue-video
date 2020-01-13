<template>
    <div>
        <headTop></headTop>
        <div>
            <div>用户视图</div> 
            <router-link to = '/userMonitoring'>返回</router-link>
            <div>
                <!-- <div>{{msg}}</div> -->
                <!-- <el-button @click="updadeInfo">实时获取数据</el-button>
                <el-button @click="monitorVideo">获取数据</el-button>
                <el-button @click="monitorVideo">刷新图表</el-button> -->
                <el-button @click="test">测试</el-button>
                <!-- <ul>
                    <li v-for="info in infos" :key="info.id">
                        <td>{{info.id}}</td>
                        <td>{{info.name}}</td>
                        <td>{{info.url}}</td>
                        <td>{{info.county}}</td>    
                    </li> 
                </ul> -->
                
            </div>
            <!-- <videoInfo :infoData ='infos'></videoInfo> -->
            <videoInfo :infoData ='videoInfos'></videoInfo>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import videoInfo from '../components/videoInfo'
    import {getVideoNowInfo, getNowPlayInfo} from '@/api/getData'


    

    export default {
        data() {
            return {
                // msg: '测试',
                getInfo: '',
                infos: {},
                playInfos: {},
                videoInfos: {},
            }
        },
        created(){
            this.playInfos = this.$route.query;
            this.initData();
            // console.log(this.$route.query);
        },
        watch: {

            $route(to,from){
                // console.log(from);
                if(to.path === '/userMonView'){  
                    this.playInfos = this.$route.query;
                    this.initData()
                };
                if(from.path === '/userMonView'){
                    // console.log('leave')
                    this.clearUpdate();
                   
                }
        	}
        },
        components: {
            headTop,
            videoInfo,
        },
        methods: { 
            //初始化数据格式
            initData(){
                this.getPlayInfo();
                this.updadeInfo();
            },   
            //获取播放数据
            async getPlayInfo(){
                const params = {};
                params.userId = this.playInfos.userId;
                params.videoId = this.playInfos.videoId;
                params.startTime = this.playInfos.startTime;
                try {
                    const res = await getNowPlayInfo(params);
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.videoInfos = res.data.videoInfos;
                            // console.log(this.videoInfos);
                        }
                    }else{
                        console.log(res.data.msg);
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            //20秒更新一次
            updadeInfo() {
                this.getInfo = setInterval(() =>{this.getPlayInfo();}, 20000);
            },  
            //清除后台更新
            clearUpdate(){
                 clearInterval(this.getInfo)
            },  

            //测试用函数
            test(){
                this.getPlayInfo()
            },

        },
        

    }
</script>

<style>

</style>