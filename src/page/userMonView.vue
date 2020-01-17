<template>
    <div>
        <headTop></headTop>
        <div>
            <div class="page-title">用户视图</div> 
            <!-- <router-link to = '/userMonitoring'>返回</router-link> -->
            <el-button @click="returnUserMon">返回</el-button>
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
            <div class="video-echarts"><videoInfo :infoData ='videoInfos'></videoInfo></div>
            <div class="audio-echarts"><audioInfo :infoData ='videoInfos'></audioInfo></div>
            
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import videoInfo from '../components/videoInfo'
    import audioInfo from '../components/audioInfo'
    import {getVideoNowInfo, getNowPlayInfo} from '@/api/getData'


    

    export default {
        data() {
            return {
                // msg: '测试',
                getInfo: '',
                infos: {},
                playInfos: {},
                queryVideo: {},
                isQuery: false,
                videoInfos: {},

            }
        },
        created(){
            this.playInfos = this.$route.query;
            this.initData();
            // console.log(this.$route.query);
            // this.$route()
        },
        watch: {

            $route(to,from){
                // console.log(to);
                if(to.path === '/userMonView'){
                    // console.log(this.$route.query)
                    this.playInfos = this.$route.query;
                    // this.playInfos = this.$route.query.row;
                    // this.queryVideo = this.$route.query.queryVideo;
                    this.initData()

                    // if(this.$route.query.queryVideo.videoId == undefined){
                    //     this.isQuery = false
                    // }else{
                    //     this.isQuery = true
                    // } 
                    
                };
                if(from.path === '/userMonView'){
                    // console.log('leave')
                    this.isQuery = false;
                    this.clearUpdate();
                   
                }
        	}
        },
        components: {
            headTop,
            videoInfo,
            audioInfo,
        },
        methods: { 
            //初始化数据格式
            initData(){
                this.getPlayInfo();
                this.updadeInfo();
            },   
            //获取播放数据
            async getPlayInfo(){
                try {
                    // console.log(this.playInfos);
                    const params = {
                        userId:  this.playInfos.userId,
                        videoId: this.playInfos.videoId,
                        startTime: this.playInfos.startTime,
                    };
                    // console.log(params);
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

            returnUserMon(){
               this.$router.push({
                    path: 'userMonitoring',
                    // query: row
                });
            },
            //测试用函数
            test(){
                this.getPlayInfo()
            },

        },
        

    }
</script>

<style>
    .page-title{
            font-size: 30px;
            text-align: center;
            padding: 20px;
    }

    .audio-echarts{
        margin-top: 50px;
        /* width: 90%; */
        /* height: 450px; */
    }
</style>