<template>
    <!-- <div class="visitorpie"> -->
        <div id="video_type" class="video-type"></div>
    <!-- </div> -->
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    import 'echarts/lib/chart/bar';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';
    import 'echarts/lib/component/dataZoom';
    
    export default {
        
        mounted(){
            this.myChart = echarts.init(document.getElementById('video_type'));
            this.initData();
        },
        props: ['pieData'],
        methods: {
            initData(){
            var base = +new Date(2014, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var date = [];

            var data = [Math.random() * 150];
            var now = new Date(base);

            function addData(shift) {
                now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
                date.push(now);
                data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

                if (shift) {
                    date.shift();
                    data.shift();
                }

                now = new Date(+new Date(now) + oneDay);
            }

            for (var i = 1; i < 100; i++) {
                addData();
            }
                const option = {
                    // color: {yellow},
                    title: {
                        text: '呵呵'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: date
                    },
                    yAxis: {
                        boundaryGap: [0, '50%'],
                        type: 'value'
                    },
                    series: [
                        {
                            name:'成交',
                            type:'line',
                            smooth:true,
                            symbol: 'none',
                            stack: 'a',
                            areaStyle: {
                                normal: {}
                            },
                            data: data
                        }
                    ],   
                };

                this.myChart.setOption(option);
                setInterval(function () {
                    addData(true);
                    this.myChart.setOption({
                        xAxis: {
                            data: 0
                        },
                        series: [{
                            name:'成交',
                            data: data
                        }]
                    });
                }, 0);
            }
        },
        watch: {
            pieData: function (){
                this.initData()
            }
        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .video-type{
        width: 90%;
        height: 450px;
        display: flex;
        justify-content: center;
        margin: 0 auto;
    }
</style>

