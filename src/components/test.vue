<template>
    <!-- <div class="visitorpie"> -->
        <div id="user_sex_pie" class="user-sex-pie"> </div>
    <!-- </div> -->
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    
    export default {
        mounted(){
            this.myChart = echarts.init(document.getElementById('user_sex_pie'));
            this.initData();
        },
        props: ['userSexData'],
        methods: {
            initData(){
                const option = {
                    title : {
                        text: '测试',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['男','女','保密',]
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value: 1111, name:'男'},
                                {value: 2222, name:'女'},
                                {value: 4444, name:'保密'},
                                
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };

                this.myChart.setOption(option);
            }
        },
        watch: {
            userSexData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .user-sex-pie{
        width: 400px;
        height: 400px;
        // display: flex;
        // justify-content: center;
        // margin: 20px;
        // float: left;
    }
</style>
