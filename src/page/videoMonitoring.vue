<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="page-title">视频监控</div>
        <!-- <el-button @click="test">测试按钮</el-button> -->
        <div class="head-button">
            <div>
                <el-button @click="initData">实时监控</el-button>
            </div>
            <div class="block">   
                <el-date-picker
                v-model="timePoint"
                type="datetime"
                clearable
                placeholder="任意时间点">
                </el-date-picker>
                <el-button @click="queryTimePointVideos">查询</el-button>
                <span class="demonstration">大于某个时间点播放</span>
            </div>

            <!-- <div class="block">
                <span class="demonstration">某天播放</span>
                <el-date-picker
                v-model="oneDay"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptionsDay">
                </el-date-picker>
                <el-button @click="queryOnedayUsers">查询</el-button> 
            </div>

            <div class="block">
                <span class="demonstration">某段时间</span>
                <el-date-picker
                v-model="someTime"
                type="datetimerange"
                :picker-options="pickerOptionsTime"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
                </el-date-picker>
                <el-button @click="querySomeTimeUsers">查询</el-button> 
            </div> -->
                        
            <!-- <el-button @click="initGetUser">当前播放</el-button>
            <el-button @click="initDate">某天播放</el-button>
            <el-button @click="initDate">某段时间播放</el-button> -->
        </div>
        <div class="table-container">
            <!-- 表格信息开始 -->
             <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="视频名"
                    width="180">
                <template slot-scope="scope">
                    {{ scope.row.videoName }}
                </template>
                </el-table-column>
                <el-table-column
                    label="播放源">
                <template slot-scope="scope">
                   {{ scope.row.videoUrl}}
                </template>
                </el-table-column>
                <!-- <el-table-column
                    label="视频时长"
                    width="100">
                <template slot-scope="scope">
                     {{ scope.row.videoDuration }}
                </template>
                </el-table-column>   -->
                <el-table-column
                    label="正在观看人数"
                    width="240">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.userCount }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">   
                    <el-button 
                    size="small"
                    type="danger"
                    @click="enterView(scope.$index, scope.row)"
                    >进入查看</el-button> 
                  </template>
                </el-table-column>
            </el-table>
            <!-- 表格信息结束 -->

           <!-- 分页开始 -->
            <!-- <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div> -->
            <!-- 分页结束 -->
            
  


        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import dtime from 'time-formater'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getNowPlayVideo, getToDayUsers, getTimePointUsers, getOneDayUsers, getSomeTimeUsers} from '@/api/getData'
    export default {
        data(){
            return {
                infos: '',
                tableData: [{
                    videoName: '王小虎',
                    videoUrl: '上海市普陀区金沙江路 1518 弄',
                    videoDuration: '10:10',
                    nowPlayUsersCount: 10
                    }],

                // pickerOptionsDay: {
                //     shortcuts: [{
                //         text: '今天',
                //         onClick(picker) {
                //         picker.$emit('pick', new Date());
                //         }
                //     }, {
                //         text: '昨天',
                //         onClick(picker) {
                //         const date = new Date();
                //         date.setTime(date.getTime() - 3600 * 1000 * 24);
                //         picker.$emit('pick', date);
                //         }
                //     }, {
                //         text: '一周前',
                //         onClick(picker) {
                //         const date = new Date();
                //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                //         picker.$emit('pick', date);
                //         }
                //     }]
                // },
                // pickerOptionsTime: {
                //     shortcuts: [{
                //         text: '最近一周',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近一个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: '最近三个月',
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }]
                // },
                timePoint: '',
                oneDay: '',
                someTime: '',
              

                // 分页
                currentRow: null,
                offset: 0,
                currentPage: 1, 
                limit: 20,
                count: 200, 
                expendRow: [],

            }
        },
        created(){
            this.initData();

        },
        watch: {

            $route(to,from){
                if(to.path === '/videoMonitoring'){ 
                    // console.log('enter'); 
                    this.initData()
                };
                if(from.path === '/videoMonitoring'){
                    // console.log('leave')
                    this.clearMonitorVideo();
                   
                }
               
        	}
        },
        computed: {
    
        },
    	components: {
    		headTop,
    	},
        methods: {
            initData(){
                this.initVideosData();
                this.monitorVideo()
            },

            //20秒实时更新
            monitorVideo(){
                this.infos = setInterval(() => {
                    this.initVideosData()
                    // console.log(111)
                }, 20*1000);
            },

            //取消清除实时更新
            clearMonitorVideo(){
                clearInterval(this.infos);
            },

            //获取监控数据
            async initVideosData(){
                try {
                    this.timePoint = dtime(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss');
                    const oneMinsAgeTime = this.getOneAgeTime(this.timePoint);
                    const params = {oneMinsAgeTime:oneMinsAgeTime};
                    const res = await getNowPlayVideo(params);
                    // console.log(res)
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.tableData = [];
                            res.data.nowPlayVideos.forEach(item => {
                                const tableItem = {
                                    videoId: item.video_id,
                                    videoName: item.video_name,
                                    videoUrl: item.video_url,
                                    userCount: item.userCount
                                }
                                this.tableData.push(tableItem);
                            });
                        }else{
                            console.log('获取数据失败')
                        }
                    }
                } catch (error) {
                        console.log(error)
                }
            },

            
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                // this.getFoods()
            },
            
            expand(row, status){
            	if (status) {
            		this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },

            enterView(index, row){
                const today = dtime(this.timePoint).format('YYYY-MM-DD');
                const nowTime = this.getOneAgeTime(this.timePoint);
                const data = {
                    videoId: row.videoId,
                    videoName: row.videoName,
                    today: today,
                    nowTime:nowTime
                }
                // console.log(index, data);
                this.$router.push({
                    path: 'userMonitoring',
                    query: data
                });
                
            },
            
            //获取一分钟前时间
            getOneAgeTime(time){ 
                const nowTime = dtime(time).format('x');
                const oneMinsAgeTime = dtime(nowTime-60*1000).format('YYYY-MM-DD HH:mm:ss')
                return oneMinsAgeTime;
            },

            //某时播放
            async queryTimePointVideos(){
                try {
                    this.clearMonitorVideo();
                    const oneMinsAgeTime = this.getOneAgeTime(this.timePoint);
                    // const today = dtime(oneMinsAgeTime).format('YYYY-MM-DD');
                    const params = {oneMinsAgeTime: oneMinsAgeTime}
                    const res = await getNowPlayVideo(params);
                    // console.log(res)
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.tableData = [];
                            res.data.nowPlayVideos.forEach(item => {
                                const tableItem = {
                                    videoId: item.video_id,
                                    videoName: item.video_name,
                                    videoUrl: item.video_url,
                                    userCount: item.userCount
                                }
                                this.tableData.push(tableItem);
                            });
                        }else{
                            console.log('获取数据失败')
                        }
                    }
                } catch (error) {
                    console.log(error)
                }

            },

            // //某天播放
            // async queryOnedayUsers(){
            //     try {
            //         const params = {};
            //         params.oneDay = dtime(this.oneDay).format('YYYY-MM-DD');
            //         const res = await getOneDayUsers(params);
            //         // console.log(res);
            //         if(res.status == 200){
            //             if(res.data.success == true){
            //                 this.tableData = [];
            //                 res.data.playUsers.forEach(item => {
            //                     const tableItem = {
            //                         date :  dtime(item.start_date).format('YYYY-MM-DD'),
            //                         userId : item.user_id,
            //                         userName : item.user_name,
            //                         videoId : item.video_id,
            //                         videoName : item.video_name,
            //                         videoUrl : item.video_url,
            //                         videoDuration: item.video_duration,
            //                         startTime : dtime(item.start_time).format('YYYY-MM-DD HH:mm:ss'),
            //                     }
            //                     this.tableData.push(tableItem);
            //                     // console.log(this.tableData)
            //                 });
            //                 // console.log(this.tableData)
            //             }else{
            //                 console.log('获取数据失败')
            //             }
            //         }
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },

            // //某段时间播放
            // async querySomeTimeUsers(){
            //     try {
            //         const params = {
            //             startTime: dtime(this.someTime[0]).format('YYYY-MM-DD HH:mm:ss'),
            //             endTime: dtime(this.someTime[1]).format('YYYY-MM-DD HH:mm:ss')
            //         }
            //         // console.log(params);
            //         const res = await getSomeTimeUsers(params);
            //         // console.log(res);
            //         if(res.status == 200){
            //             if(res.data.success == true){
            //                 this.tableData = [];
            //                 res.data.playUsers.forEach(item => {
            //                     const tableItem = {
            //                         date :  dtime(item.start_date).format('YYYY-MM-DD'),
            //                         userId : item.user_id,
            //                         userName : item.user_name,
            //                         videoId : item.video_id,
            //                         videoName : item.video_name,
            //                         videoUrl : item.video_url,
            //                         videoDuration: item.video_duration,
            //                         startTime : dtime(item.start_time).format('YYYY-MM-DD HH:mm:ss'),
            //                     }
            //                     this.tableData.push(tableItem);
            //                 });
            //                 // console.log(this.tableData)
            //             }else{
            //                 console.log('获取数据失败')
            //             }
            //         }
            //     } catch (error) {
            //         console.log(error);
            //     }
            // },

            test(){
                
                // this.getNowPlayVideo(this.tableData);
                
                
                // console.log(this.nowTablePlayData)
                
            },
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .page-title{
        font-size: 30px;
        text-align: center;
        padding: 20px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table-container{
        padding: 20px;
    }
    .pagination{
        // display: flex;
        // justify-content: flex-start;
        margin-top: 20px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    .table-header{
        padding-bottom: 20px;
    }
    .demo-input-suffix{
        width: 300px;
        display: inline-block;
    }
    .adduser-button{
        // display: inline-block;
        margin-right: 200px;
        float: right;
    }

</style>
