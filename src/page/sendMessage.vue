<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin-title">管理员权限</header>
        <form class="admin-set" action="">
            <div class="admin-background" >
                <div class="admin-content">
                    <div class="admin-face">
                        <el-upload
                            class="avatar-uploader"
                            :action="baseUrl + '/admin/update/avatar/' + adminInfo.id"
                            :show-file-list="false"
                            :on-success="uploadImg"
                            :before-upload="beforeImgUpload">
                            <img v-if="adminInfo.avatar" :src="baseImgPath + adminInfo.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>更换头像</span>
                    </div>
                    <div class="admin-content-nav">   
                        <ul>
                            <li>
                               <div class="admin-info"><span>用户名：</span>
                               </div>
                               <span>admin</span>
                                <!-- <span>{{adminInfo.user_name}}lfl</span> -->
                            </li>
                            <li>
                                <div class="admin-info"><span>管理员 ID：</span></div>  
                                <span>123</span>
                                <!-- <span>123{{adminInfo.id}}</span> -->
                            </li>
                            <li>
                            </li>
                        </ul>
 
                        <table>
                            <tr>
                                <td class="table-td"><el-checkbox v-model="checked11" disabled>添加用户</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked12" disabled>编辑视频</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked13" disabled>删除视频</el-checkbox></td>
                            </tr>
                            <tr>
                                <td class="table-td"><el-checkbox v-model="checked21" disabled>添加视频</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked22" disabled>编辑用户</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked23" disabled>删除用户</el-checkbox></td>
                            </tr>
                            <tr>
                                <td class="table-td"><el-checkbox v-model="checked31" disabled>添加管理员</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked32" disabled>编辑管理员</el-checkbox></td>
                                <td class="table-td"><el-checkbox v-model="checked33" disabled>删除管理员</el-checkbox></td>
                            </tr>
                        </table>    
                    </div>
                </div>
                <!-- <div class="admin-button"><button>保存</button></div>         -->
                <div class="admin-button"><el-button type="primary">保存</el-button></div>
            </div>
        </form>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {mapState} from 'vuex'
    import {baseUrl, baseImgPath} from '@/config/env'

    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,

                //多选框是否选中
                checked11: true,
                checked12: true,
                checked13: true,
                checked21: true,
                checked22: false,
                checked23: false,
                checked31: false,
                checked32: false,
                checked33: false,
            }
        },
    	components: {
    		headTop,
    	},
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            //头像，无意义，挂载
            uploadImg(res, file) {
                if (res.status == 1) {
                    this.adminInfo.avatar = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeImgUpload(file) {
                const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isRightType) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isRightType && isLt2M;
            },

        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
    }
    .admin-title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .admin-background{
        width: 60%;
        padding: 20px;
        margin: 20px auto;
        // height: 500px;
        background-color: #f0f0f0; 
    }
    .admin-content{
        width: 100%;
       
    }
    .admin-face{
        width: 150px;
        height: 150px;
        margin: 0 auto;
        span{
        // padding-top: 10px;
        margin-left: 30px;
        }
        
    }
    .admin-content-nav{
        //  width: 4px;
        // margin: 0 auto;
        border-bottom: 1px solid #c1c4c8;
        ul > li{
            width: 500px;
            margin: 0 auto;
            // display: inline-block;
            padding: 12px;
            span{
                color: #666;
            }
        }
    }
    .admin-info{
        width: 100px;
        display: inline-block;
        text-align: right;
        // margin-left: 25%;
        // margin-left: 180px;
        padding-right: 20px;
    }
    .admin-button{
        width: 110px;
        margin: 0px auto;
    }
    .admin-button>button{
        margin: 15px 0px;
        line-height: 1;
        width: 110px;
        color: #fff;
        background: #20a0ff!important;
        text-align: center;
        padding: 10px 15px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
        display: inline-block;
        cursor: pointer;//手指
        white-space: nowrap;
    }
        .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
    // .checkbox{
    //     margin-left: 20px;
    // }
    table{
        width: 560px;
        margin: 0 auto;
        padding-bottom: 20px;
    }
    .table-td{
        height: 30px;
        width: 180px;
        // background-color:red;
    }
</style>
