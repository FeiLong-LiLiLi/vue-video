<template>
    <div>
        <headTop></headTop>
        <div>
            用户在看视频视图，获取正在看视频的用户信息
            <router-link to = '/videoMonitoring'>返回</router-link>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    export default {
        data() {
            return {

            }

        },
        components: {
            headTop,
        }

    }
</script>

<style>

</style>