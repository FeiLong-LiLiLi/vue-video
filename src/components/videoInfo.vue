<template>
    <!-- <div class="visitorpie"> -->
        <div id="video-infos" class="video-infos"> </div>
    <!-- </div> -->
</template>

<script>
    import dtime from 'time-formater';
    import echarts from 'echarts/lib/echarts';
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/dataZoom';
    
    export default {
        data(){
            return{
                videoRatioArray: '',
                // audioRatioArray: '',
                videoTime: [],
                videoBitrateDownloading: [],
                videoBufferLength: [],
                videoDroppedFrames: [],
                videoRatio: [],
                // audioBitrateDownloading: [],
                // audioBufferLength: [],
                // audioDroppedFrames: [],
                // audioRatio: [],
                nowTime: [],
                videoRatioMix: [],
                videoRatioAvg: [],
                videoRatioMax: [],           
                // audioRatioMix: [],
                // audioRatioAvg: [],
                // audioRatioMax: [],
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById('video-infos'));
            this.initData();
        },
        props: ['infoData'],
        methods: {
            //处理Ratio
            dealVideoRatioArray(arr){
                for(let i = 0; i < arr.length; i++){
                    this.videoRatioArray = arr[i].split('|');
                    this.videoRatioMix.push(this.videoRatioArray[0])
                    this.videoRatioAvg.push(this.videoRatioArray[1])
                    this.videoRatioMax.push(this.videoRatioArray[2])
                }
            },
            // dealAudioRatioArray(arr){
            //      for(let i = 0; i < arr.length; i++){
            //         this.audioRatioArray = arr[i].split('|');
            //         this.audioRatioMix.push(this.audioRatioArray[0])
            //         this.audioRatioAvg.push(this.audioRatioArray[1])
            //         this.audioRatioMax.push(this.audioRatioArray[2])
            //     }
            // },

            //获取数据
            getData(){
                this.videoTime = [];
                this.videoBitrateDownloading = [];
                this.videoBufferLength = [];
                this.videoDroppedFrames = [];
                this.videoRatio = [];
                // this.audioBitrateDownloading = [];
                // this.audioBufferLength = [];
                // this.audioDroppedFrames = [];
                // this.audioRatio = [];
                this.nowTime = [];
                this.videoRatioMix = [];
                this.videoRatioAvg = [];
                this.videoRatioMax = [];           
                // this.audioRatioMix = [];
                // this.audioRatioAvg = [];
                // this.audioRatioMax = [];
                //遍历数组
                for(var i = 0; i < this.infoData.length; i++){
                    this.videoTime.push(this.infoData[i].video_time);
                    this.videoBitrateDownloading.push(this.infoData[i].video_bitrate_downloading);
                    this.videoBufferLength.push(this.infoData[i].video_buffer_length);
                    this.videoDroppedFrames.push(this.infoData[i].video_dropped_frames);
                    this.videoRatio.push(this.infoData[i].video_ratio);
                    // this.audioBitrateDownloading.push(this.infoData[i].audio_bitrate_downloading);
                    // this.audioBufferLength.push(this.infoData[i].audio_buffer_length);
                    // this.audioDroppedFrames.push(this.infoData[i].audio_dropped_frames);
                    // this.audioRatio.push(this.infoData[i].audio_ratio);
                    this.nowTime.push(dtime(this.infoData[i].now_time).format('HH:mm:ss'));
                }
                
                this.dealVideoRatioArray(this.videoRatio);
                // this.dealAudioRatioArray(this.audioRatio);     
                // console.log(this.audioRatio);     
            },

            initData(){
                    this.getData();
                // const colors = ['#5793f3', '#f7ba2a', '#d14a61', '#e0fa52', '#97a8be'];
                const option = {
                    title: {
                        text: '视频信息图'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: [{
                            data: ['Video Bitrate Downloading', 'Video Buffer Length', 'Video Dropped Frames', 'Video Ratio(Mix)', 'Video Ratio(Avg)', 'Video Ratio(Max)']
                        },
                        // {
                        //     top: '30',
                        //     bottom: '30',
                        //     data: ['Audio Bitrate Downloading', 'Audio Buffer Length', 'Audio Dropped Frames', 'Audio Ratio(Mix)', 'Audio Ratio(Avg)', 'Audio Ratio(Max)']
                        // }
                    ],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                     xAxis: [
                        //  {
                        //     type: 'category',   
                        //     boundaryGap: false,
                        //     data: this.nowTime
                        // },
                        {
                            type: 'category',   
                            boundaryGap: false,
                            data: this.videoTime
                        }

                    ],
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Video Bitrate Downloading',
                            type: 'line',
                            stack: '总量',
                            data: this.videoBitrateDownloading,
                        },
                        {
                            name: 'Video Buffer Length',
                            type: 'line',
                            stack: '总量',
                            data: this.videoBufferLength,
                        },
                        {
                            name: 'Video Dropped Frames',
                            type: 'line',
                            stack: '总量',
                            data: this.videoDroppedFrames,
                        },
                        {
                            name: 'Video Ratio(Mix)',
                            type: 'line',
                            stack: '总量',
                            data: this.videoRatioMix,
                        },
                        {
                            name: 'Video Ratio(Avg)',
                            type: 'line',
                            stack: '总量',
                            data: this.videoRatioAvg,
                        },
                        {
                            name: 'Video Ratio(Max)',
                            type: 'line',
                            stack: '总量',
                            data: this.videoRatioMax,
                        },
                        // {
                        //     name: 'Audio Bitrate Downloading',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioBitrateDownloading,
                        // },
                        // {
                        //     name: 'Audio Buffer Length',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioBufferLength,
                        // },
                        // {
                        //     name: 'Audio Dropped Frames',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioDroppedFrames,
                        // },
                        // {
                        //     name: 'Audio Ratio(Mix)',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioRatioMix,
                        // },
                        // {
                        //     name: 'Audio Ratio(Avg)',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioRatioAvg,
                        // },
                        // {
                        //     name: 'Audio Ratio(Max)',
                        //     type: 'line',
                        //     stack: '总量',
                        //     data: this.audioRatioMax,
                        // }
                    ]
                };
                // this.myChart.clear();
                this.myChart.setOption(option);
            }
        },
        watch: {
            infoData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .video-infos{
        display: block;
        justify-content: center;
        width: 90%;
        height:450px;
        margin: 0 auto;
        padding: 5px;
        // position: relative;
        // margin: 20px;
        // float: left;
    }
</style>
