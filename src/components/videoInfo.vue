<template>
    <!-- <div class="visitorpie"> -->
        <div id="video-categories" class="video-categories"> </div>
    <!-- </div> -->
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
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
                abitrate: [],
                abuffer: [],
                adframes: [],
                aratio: [],
                vbitrate: [],
                vbuffer: [],
                vdframes: [],
                vratio: [],
                time:[]
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById('video-categories'));
            this.initData();
        },
        props: ['infoData'],
        methods: {
            
            //获取数据
            getData(){
                this.abitrate = [];
                this.abuffer = [];
                this.adframes = [];
                this.aratio = [];
                this.vbitrate = [];
                this.vbuffer = [];
                this.vdframes = [];
                this.vratio = [];
                this.time = [];
                //遍历数组
                for(var i = 0; i < this.infoData.length; i++){
                    this.abitrate.push(this.infoData[i].abitrate);
                    this.abuffer.push(this.infoData[i].abuffer);
                    this.adframes.push(this.infoData[i].adframes);
                    this.aratio.push(this.infoData[i].aratio);
                    this.vbitrate.push(this.infoData[i].vbitrate);
                    this.vbuffer.push(this.infoData[i].vbuffer);
                    this.vdframes.push(this.infoData[i].vdframes);
                    this.vratio.push(this.infoData[i].vratio);
                    this.time.push(this.infoData[i].time.slice(11,19));
                }
                // console.log(this.time);
                
            },

            initData(){
                    this.getData();
                // const colors = ['#5793f3', '#f7ba2a', '#d14a61', '#e0fa52', '#97a8be'];
                const option = {
                    title: {
                        text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['abitrate', 'abuffer', 'adframes', 'aratio', 'vbitrate', 'vbuffer', 'vdframes', 'vratio']
                    },
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        data: this.time
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'abitrate',
                            type: 'line',
                            stack: '总量',
                            data: this.abitrate
                        },
                        {
                            name: 'abuffer',
                            type: 'line',
                            stack: '总量',
                            data: this.abuffer,
                        },
                        {
                            name: 'adframes',
                            type: 'line',
                            stack: '总量',
                            data: this.adframes,
                        },
                        {
                            name: 'aratio',
                            type: 'line',
                            stack: '总量',
                            data: this.aratio,
                        },
                        {
                            name: 'vbitrate',
                            type: 'line',
                            stack: '总量',
                            data: this.vbitrate,
                        },
                        {
                            name: 'vbuffer',
                            type: 'line',
                            stack: '总量',
                            data: this.vbuffer,
                        },
                        {
                            name: 'vdframes',
                            type: 'line',
                            stack: '总量',
                            data: this.vdframes,
                        },
                        {
                            name: 'vratio',
                            type: 'line',
                            stack: '总量',
                            data: this.vratio,
                        }
                    ]
                };

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
    .video-categories{
        display: flex;
        justify-content: center;
        width: 80%;
        height:450px;
        margin: 0 auto;
        padding: 5px;
        position: relative;
        // margin: 20px;
        // float: left;
    }
</style>
