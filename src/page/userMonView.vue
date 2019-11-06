<template>
    <div>
        <headTop></headTop>
        <div>
            <div>用户视图</div> 
            <router-link to = '/userMonitoring'>返回</router-link>
            <div>
                <el-button @click="getVideoList()">获取数据</el-button>
                <div>{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import axios from ''
    export default {
        data() {
            return {
                msg: '当前无信息',

            }

        },
        components: {
            headTop,
        },
        methods: {
            getVideoList(){
                console.log('获取数据')
            }

        },
        mounted(){
            axios.post(
            '',
            params
            )
            .then(res => {
                 
            })
            .catch(e => {
                
            })
        },

    }
</script>

<style>

</style>