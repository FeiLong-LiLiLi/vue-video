
<template>
    <div>
        <headTop></headTop>
        <div class="page-title">视频类型</div>
        <div class="video-category">
            <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>   
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    

    export default {
        data(){
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            };
        },
        created(){
            this.initData()
        },
        components:{
            headTop,
        },
        methods: {
            async initData(){
                this.axios.get('http://localhost:8004/api/categories/get')
                .then(res => {
                    // console.log(res.data)
                    if(res.status == 200){
                        if(res.data.success == true){
                            res.data.categories.forEach(item => {
                                // console.log(item.value)
                                this.dynamicTags.push(item.value)
                            });
                        }
                    }
                })
            },
            async handleClose(tag) {

                this.$confirm('此操作将会删除此视频选择类型，但仍会保留已经选择该类型的视频, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.get('http://localhost:8004/api/categories/del',{
                        params: {category: tag}
                    }).then(res => {
                        if(res.status == 200){
                            if(res.data.success == true){
                                this.$message({
                                type: 'success',
                                message: '删除成功!'
                                });
                                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                            }else{
                                this.$message({
                                type: 'success',
                                message: '删除失败!'
                                });
                            }
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
   
            },

            showInput() {
                // console.log('1')
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            async handleInputConfirm() {
                let inputValue = this.inputValue;
                const params = {category: inputValue}
                console.log(params)
                if (inputValue) {
                    this.axios.post('http://localhost:8004/api/categories/add',params)
                    .then(res => {
                        console.log(res);
                        if(res.status ==200){
                            if(res.data.success == true){
                                this.$message({
                                type: 'success',
                                message: '添加成功!'
                                });
                                this.dynamicTags.push(inputValue);
                            }else{
                                this.$message({
                                type: 'success',
                                message: '已重复或其他原因，添加失败!'
                                });
                            }
                        }
                        
                    })
                }
                this.inputVisible = false;
                this.inputValue = '';
                
            }
        }

}
</script>

<style lang="less">
	@import '../style/mixin';
	.page-title{
        font-size: 30px;
        text-align: center;
        padding: 20px;
    }
    .video-category{
        // width: 80%;
        height: 450px;
        margin: 20px 120px;
        padding: 40px;
        border: 2px solid #eeeeee; 
    }
    .el-tag + .el-tag {
        margin: 8px;
        // background-color: #549eff;
    }
    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

</style>