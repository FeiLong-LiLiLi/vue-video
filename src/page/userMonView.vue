<template>
    <div>
        <headTop></headTop>
        <div>
            <div>用户视图</div> 
            <router-link to = '/userMonitoring'>返回</router-link>
            <div>
                <!-- <div>{{msg}}</div> -->
                <el-button @click="myFunction">实时获取数据</el-button>
                <el-button @click="monitorVideo">获取数据</el-button>
                <el-button @click="getInfos">获取数据信息</el-button>
                <el-button @click="monitorVideo">刷新图表</el-button>
                <!-- <ul>
                    <li v-for="info in infos" :key="info.id">
                        <td>{{info.id}}</td>
                        <td>{{info.name}}</td>
                        <td>{{info.url}}</td>
                        <td>{{info.county}}</td>    
                    </li> 
                </ul> -->
                
            </div>
            <videoInfo :infoData ='infos'></videoInfo>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import videoInfo from '../components/videoInfo'
    import {getVideoNowInfo} from '@/api/getData'


    

    export default {
        data() {
            
            return {
                // msg: '测试',
                infos: {},
                // infos: {
                //     id: '',
                //     name: '',
                //     url: '',
                //     county: '',
                // },
                // todos: [],
                // todo: {
                //     title: '',
                //     completed: false
                // }
                // async monitorVideo(){      
                //     try{
                //         const res = await getVideoNowInfo();
                //         if (res.status == 200) {
                //             if(res.data.success == true){
                //                 console.log(res);
                //             }else{
                //                 console.log(res.data.msg);
                //             }
                //         }
                //     }catch(error){
                //         console.log(error);
                //     }
                // },

            }

        },
        created(){
            this.monitorVideo();
        },
        components: {
            headTop,
            videoInfo,
        },
        methods: {      
            //获取数据
            async monitorVideo(){      
    			try{
    			    const res = await getVideoNowInfo();
    				if (res.status == 200) {
                        if(res.data.success == true){
                            // console.log(res);
                            // this.infos = {};
                            // this.infos.push(res.data.info)

                             this.infos = res.data.info;
                        }else{
                            console.log(res.data.msg);
                        }
    				}
    			}catch(error){
    				console.log(error);
    			}
    		},
            getInfos(){
                // console.log(this.infos);
            },
            // myFunction() {
            //     setInterval('alert("Hello");', 3000);
            // },
            //15秒更新一次
            myFunction() {
                setInterval(() =>{this.monitorVideo();console.log(1)}, 15000);
            }
            
            // getVideoList(){
            //     // // console.log('获取数据');
            //     // this.axios.get('http://jsonplaceholder.typicode.com/todos')
            //     this.axios.get('http://localhost:8004/api/videoInfo')
            //     // this.axios.get('/api/videoInfo')
            //     .then(res => {
            //         console.log(res.data); 
            //         // this.infos = res.data;   
            //     })
            //     .catch(e => {
            //         console.log(e);
            //     })
              
            // },


        },
        // mounted(){
        //     axios.get('http://jsonplaceholder.typicode.com/todos')
        //     .then(res => {
        //          this.todos = res.data;
        //         // console.log(res.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
                
        //     });
           
        // },

    }
</script>

<style>

</style>