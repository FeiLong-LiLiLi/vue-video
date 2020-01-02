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
        data(){
            return{
                categories: [],
                number: []
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById('video_type'));
            this.initData();
        },
        props: ['typeData'],
        methods: {
            initData(){
                    this.categories = [];
                    this.number = [];
                for(var i = 0; i< this.typeData.length; i++){ 
                    this.categories.push(this.typeData[i].category);
                    this.number.push(this.typeData[i].num)
                }
                // console.log(this.categories);
                // console.log(this.number);

                const option = {
                    // color: {yellow},
                    title : {
                        text: '视频类型',
                        // subtext: '',
                        x:'left'
                    },
                    legend: {
                        data: ['数量']
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} "
                    },
                    // legend: {
                    //     orient: 'vertical',
                    //     left: 'left',
                    //     data: ['北京','上海','深圳','杭州','其他']
                    // },
                    xAxis: {
                        type: 'category',
                        // data: ['电影', '电视剧', '动漫', '综艺', '少儿', '纪录片', '体育', '新闻', '知识', '音乐', '热点', '生活', '游戏']
                        // data: ['电影', '电视剧', '动漫']
                        data: this.categories
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'bar',
                        name: '数量',
                        // data: [120, 200, 150, 80, 70, 110, 130,122,535,532,76,86,434],
                        // data: [120, 200, 150]
                        data: this.number
                    }]

                    // 这个dataZoom组件，默认控制x轴。
                    // dataZoom: [
                    //     {  
                    //         type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                    //         start: 0,      // 左边在 10% 的位置。
                    //         end: 50         // 右边在 60% 的位置。
                    //     }
                    // ],
                   
                };
               
                this.myChart.setOption(option);
                //  console.log(option)
            }
        },
        watch: {
            typeData: function (){
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
    *{ touch-action: pan-y; }
</style>

