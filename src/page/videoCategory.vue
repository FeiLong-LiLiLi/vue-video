
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
    import {getAllCategories, addCategory, delCategory, queryCategories} from '@/api/getData'

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
                try {
                    const res = await getAllCategories();
                    if(res.status == 200){
                        if(res.data.success == true){
                            res.data.categories.forEach(item => {
                                this.dynamicTags.push(item.value)
                            });
                        }else{
                            this.$message({
                                showClose: true,
                                type: 'info',
                                message: res.data.msg
                            });
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            async handleClose(tag) {
                this.$confirm('此操作将会删除此视频选择类型，但仍会保留已经选择该类型的视频, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    try {
                        const res = await delCategory(tag);
                        console.log(res);
                        if(res.status == 200){
                            if(res.data.success == true){
                                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: res.data.msg
                                });
                            }else{
                                this.$message({
                                    showClose: true,
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error);
                    }
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
                if (inputValue) {
                    try {
                        const params = {category: inputValue};
                        const res = await addCategory(params);
                        console.log(res);
                        if(res.status == 200){
                            if(res.data.success == true){
                                this.dynamicTags.push(inputValue);
                                this.$message({
                                    showClose: true,
                                    type: 'success',
                                    message: res.data.msg
                                });
                            }else{
                                this.$message({
                                    showClose: true,
                                    type: 'error',
                                    message: res.data.msg
                                });
                            }
                        }
                    } catch (error) {
                        console.log(error)
                    }
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