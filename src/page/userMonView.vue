<template>
    <div>
        <headTop></headTop>
        <div>
            <div>用户视图</div> 
            <router-link to = '/userMonitoring'>返回</router-link>
            <div>
                <div>{{msg}}</div>
                <el-button @click="getVideoList">获取数据</el-button>
                <ul>
                    <li v-for="info in infos" :key="info.id">
                        <td>{{info.id}}</td>
                        <td>{{info.name}}</td>
                        <td>{{info.url}}</td>
                        <td>{{info.county}}</td>    
                    </li> 
                </ul>
                
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getVideoInfo} from '@/api/getData'
    // import axios from 'axios'
  	// import {getUserCity} from '@/api/getData'
    

    export default {
        data() {
            return {
                msg: '测试',
                infos: [],
                infos: {
                    id: '',
                    name: '',
                    url: '',
                    county: '',
                },
                // todos: [],
                // todo: {
                //     title: '',
                //     completed: false
                // }

            }

        },
        components: {
            headTop,
        },
        methods: {      

            // async getVideoList(){      
    		// 	try{
    		// 	    const res = await getVideoInfo({id: this.id});
    		// 		if (res.status == 1) {
            //             // this.pieData = res.user_city;
            //             console.log(res);
    		// 		}else{
    		// 			throw new Error(res)
    		// 		}
    		// 	}catch(err){
    		// 		console.log('获取信息失败',err);
    		// 	}
    		// },
            
            getVideoList(){
                // // console.log('获取数据');
                // this.axios.get('http://jsonplaceholder.typicode.com/todos')
                this.axios.get('http://localhost:8004/api/videoInfo')
                // this.axios.get('/api/videoInfo')
                .then(res => {
                    console.log(res.data); 
                    // this.infos = res.data;   
                })
                .catch(e => {
                    console.log(e);
                })
              
            },


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