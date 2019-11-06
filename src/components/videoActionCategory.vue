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
        mounted(){
            this.myChart = echarts.init(document.getElementById('video-categories'));
            this.initData();
        },
        props: ['videoData'],
        methods: {
            initData(){
                const colors = ['#5793f3', '#f7ba2a', '#d14a61', '#e0fa52', '#97a8be'];
                const option = {
                    color: colors,
                    title : {
                        text: '折线图堆叠测试',
                        // x:'center'
                    },
                    legend: {
                        data:['播放','点赞','评论','收藏','分享']
                    },
                    // grid: {
                    //     left: '3%',
                    //     right: '4%',
                    //     bottom: '3%',
                    //     containLabel: true
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {},
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一','周二','周三','周四','周五','周六','周日']
                        // data: ['周一','周二','周三','周四','周五','周六','周日','周一','周二','周三','周四','周五','周六','周一','周二']
                    },
                    // yAxis: {
                    //     type: 'value'
                    // },
                    yAxis: [
                        {
                          type: 'value',
                          name: '用户',
                          min: 0,
                        //   max: 2000,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: '订单',
                          min: 0,
                        //   max: 2000,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    dataZoom: [
                        {   // 这个dataZoom组件，默认控制x轴。
                            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                            start: 0,      // 左边在 10% 的位置。
                            end: 100         // 右边在 60% 的位置。
                        }
                    ],
                    series: [
                        {
                            name:'播放',
                            type:'line',
                            // stack: '总量',
                            yAxisIndex: 1,
                            data:[120, 132, 101, 134, 90, 230, 210],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'点赞',
                            type:'line',
                            // stack: '总量',
                            yAxisIndex: 1,
                            data:[220, 182, 191, 234, 290, 330, 310],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'评论',
                            type:'line',
                            // stack: '总量',
                            yAxisIndex: 1,
                            data:[150, 232, 201, 154, 190, 330, 410],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'收藏',
                            type:'line',
                            // stack: '总量',
                            yAxisIndex: 1,
                            data:[320, 332, 301, 334, 390, 330, 320],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'分享',
                            type:'line',
                            // stack: '总量',
                            yAxisIndex: 1,
                            data:[820, 932, 901, 934, 1290, 1330, 1320],
                             markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]

                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            videoData: function (){
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
        width: 90%;
        height:450px;
        margin: 0 auto;
        padding: 5px;
        position: relative;
        // margin: 20px;
        // float: left;
    }
</style>
