<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin-title">管理员信息</header>
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
                               <div class="admin-info"><span>用户名：</span></div>
                               <el-input v-model="admin_name" placeholder="请输入内容"></el-input>
                                <!-- <span>{{adminInfo.user_name}}lfl</span> -->
                            </li>
                            <li>
                                <div class="admin-info"><span>管理员 ID：</span></div>  
                                <span>123</span>
                                <!-- <span>123{{adminInfo.id}}</span> -->
                            </li>
                            <li>
                                <div class="admin-info"> <span>联系方式：</span></div><el-input v-model="admin_phone" placeholder="请输入内容"></el-input>
                            </li>
                            <li>
                                <div class="admin-info"> <span>邮箱：</span></div><el-input v-model="admin_mail" placeholder="请输入内容"></el-input>
                            </li>
                            <li>
                               <div class="admin-info"><span>注册时间：</span></div>   
                                <span>2019.10.16 {{adminInfo.create_time}}</span>
                            </li>
                            <li>
                                <div class="admin-info"><span>性别：</span></div>  
                                <el-radio-group v-model="radio">
                                    <el-radio :label="3">男</el-radio>
                                    <el-radio :label="6">女</el-radio>
                                    <el-radio :label="9">保密</el-radio>
                                </el-radio-group> 
                            </li>
                            <li>
                                <div class="admin-info"><span>出生日期：</span></div>
                                <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </li>
                            <li>
                                <div class="admin-info"><span>个性签名：</span></div>
                                <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    
                                    v-model="textarea">
                                </el-input>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="admin-button"><el-button type="primary" @click="onSubmit">保存</el-button></div>        
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
                //管理员信息
                admin_name: "admin",
                admin_phone: "13122223333",
                admin_mail: "12342@123.com",
                radio: 9,
                textarea: '',

                //日期
                pickerOptions1: {
                    disabledDate(time) {
                    return time.getTime() > Date.now();
                    },
                },
                value1: '2019-10-21',

            }
        },
    	components: {
    		headTop,
    	},
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
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
           onSubmit() {
                console.log('submit!');
                alert("submit");
            }
        },
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
        padding-bottom: 20px;
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
    .el-input{
        width: 325px;
    }
    .el-date-editor.el-input {
    width: 325px;
    }

    .el-textarea{
        width: 325px;
        // margin-top: 20px;
    }
    
    // .admin-edit{
    //     width: 325px;
    //     height: 35px;
    //     // margin: 0 20px 0 20px;
    //     border-radius: 4px;
    //     border: 1px solid #bfcbd9;
    //     line-height: 1;
    //     // display: inline-block;
    // }
    // // ate控件上下小箭头
    // ::-webkit-inner-spin-button{
    //     display: none;
    // }
    // //date控件下拉
    // ::-webkit-calendar-picker-indicator {
    //     /*这是控制下拉小箭头的*/
    //     border: 1px solid #ccc;
    //     border-radius: 4px;
    //     box-shadow: inset 0 2px #fff, 0 2px #eee;
    //     /* background-color: rgb(165, 65, 65); */
    //     background-image: -webkit-linear-gradient(top, #f5c9c9, #e6e6e6);
    //     color: #666;
    //     cursor: pointer;
    // }

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

</style>
