<template>
    <div class="">
        <div id="line1" class="line1" style=""></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/chart/line';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/toolbox';
    import 'echarts/lib/component/markPoint';
    import 'echarts/lib/component/tooltip';
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('line1'));
            this.initData();
        },
        props: ['sevenDay', 'sevenLoginData', 'sevenPlayData'],
        methods: {
            initData(){
                // console.log(this.sevenPlayData);
                
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color: colors,
                    title: {
                        text: '数据图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['当日登录量', '当日播放量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '用户',
                        //   min: 0,
                        //   max: 200,
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
                          name: '',
                        //   min: 0,
                        //   max: 200,
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
                    series: [
                        {
                            name:'当日用户登录量',
                            type:'line',
                            data:this.sevenLoginData,
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'当日视频播放量',
                            type:'line',
                            data: this.sevenPlayData,
                            yAxisIndex: 1,
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
            sevenDay: function (){
                this.initData();
            },
            sevenLoginData: function (){
                this.initData();
            },
            sevenPlayData: function () {
                this.initData();
            }
            
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .line1{
        display: flex;
        justify-content: center;
        width: 90%;
        height:450px;
        margin: 0 auto;
        padding: 5px;
        
    }
</style>
