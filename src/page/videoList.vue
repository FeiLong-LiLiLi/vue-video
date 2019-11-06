<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <div class="table-header">
                <div class="demo-input-suffix">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="search_user">
                </el-input>
                </div>
                <!-- 查询视频按钮 -->
                <el-button type="primary">查询</el-button>
                <!-- 增加视频按钮 -->
                <div class="add-button">
                <!-- <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button> -->
                <el-button type="primary" @click="addUserInfo">添加视频</el-button>
                </div>
            </div>
    
            <!-- 表格信息开始 -->
             <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
            <!-- <el-table
                :data="tableData"
                style="width: 100%"> -->
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="视频名称">
                                <span>{{ props.row.video_name }}</span>
                            </el-form-item>
                            <el-form-item label="视频封面">
                                <span>{{ props.row.avater }}</span>
                                <img src="" alt="" class="video-cover">
                            </el-form-item>
                            <el-form-item label="视频 ID">
                                <span>{{ props.row.video_id }}</span>
                            </el-form-item>
                            <el-form-item label="发布时间">
                                <span>{{ props.row.creat_time }}</span>
                            </el-form-item>
                            <el-form-item label="修改时间">
                                <span>{{ props.row.modify_time }}</span>
                            </el-form-item>
                            <el-form-item label="类别">
                                <span>{{ props.row.category}}</span>
                            </el-form-item>
                            <el-form-item label="标签">
                                <span>{{ props.row.tag }}</span>
                            </el-form-item>
                            <el-form-item label="视频简介">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                            <el-form-item label="视频链接">
                                <span>{{ props.row.link }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="序号"
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="视频名称"
                    prop="video_name"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="视频 ID"
                    prop="video_id"
                    width="200">
                </el-table-column>
                <el-table-column
                  label="视频简介"
                  prop="desc">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <!-- 表格信息结束 -->

           <!-- 分页开始 -->
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
            <!-- 分页结束 -->
            
            <!-- 弹窗修改视频信息开始 -->
            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :show-close="false" >
                <div class="updateUserInfo">
                    <!-- <template slot-scope="props"> -->
                        <el-form :model="updataUserInfo">
                            <el-form-item label="视频名称" label-width="100px" prop="user_name">
                                <el-input v-model="updataUserInfo.user_name"></el-input>
                            </el-form-item>
                            <el-form-item label="视频封面" label-width="100px">
                                <el-upload
                                class="avatar-uploader"
                                :action="baseUrl + '/v1/addimg/food'"
                                :show-file-list="false"
                                :on-success="handleServiceAvatarScucess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="视频类别" label-width="100px">
                                 <el-select v-model="video_category" clearable filterable placeholder="请选择">
                                    <el-option
                                    v-for="item in choose_video_category"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标签" label-width="100px">
                                <el-select
                                    v-model="video_tag"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="请选择视频标签">
                                    <el-option
                                        v-for="item in choose_video_tag"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                             </el-form-item>
                            <el-form-item label="视频简介" label-width="100px">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="updataUserInfo.desc">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    <!-- </template> -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateUserInfo">确 定</el-button>
                        <!-- <el-button type="primary" @click="getInfo">取信息</el-button> -->
                    </div>
                </div>
            </el-dialog>  
            <!-- 弹窗修改视频信息结束 -->

            <!-- 弹窗添加视频开始 -->  
            <!-- :before-close="handleClose"    关闭按钮回调  -->
            <el-dialog title="添加视频" :visible.sync="dialogFormVisible_adduser" :show-close="false">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="上传视频">
                        <div class="upload-video">
                            <el-upload class="avatar-uploader"
                                action="上传地址"
                                v-bind:data="{FoldPath:'上传目录',SecretKey:'安全验证'}"
                                v-bind:on-progress="uploadVideoProcess"
                                v-bind:on-success="handleVideoSuccess"
                                v-bind:before-upload="beforeUploadVideo"
                                v-bind:show-file-list="false">
                                <video v-if="videoForm.showVideoPath !='' && !videoFlag"
                                    v-bind:src="videoForm.showVideoPath"
                                    class="avatar video-avatar"
                                    controls="controls">
                                </video>
                                <i v-else-if="videoForm.showVideoPath =='' && !videoFlag" class="el-icon-plus avatar-uploader-icon"></i>
                                <el-progress v-if="videoFlag == true"
                                            type="circle"
                                            v-bind:percentage="videoUploadPercent"
                                            style="margin-top:7px;">
                                </el-progress>
                            </el-upload>     
                        </div>
                    </el-form-item>
                    <el-form-item label="视频名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item> 
                    <el-form-item label="视频封面">
                        <div class="upload-img">
                            <!-- action="https://jsonplaceholder.typicode.com/posts/"  路径 -->
                            <el-upload
                                class="avatar-uploader"
                                :action="baseUrl + '/v1/addimg/food'"
                                :show-file-list="false"
                                :on-success="handleServiceAvatarScucess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload> 
                        </div>    
                    </el-form-item>
                    <el-form-item label="视频类别">
                        <el-select v-model="video_category" clearable filterable placeholder="请选择">
                            <el-option
                            v-for="item in choose_video_category"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标签" label-width="100px">
                        <el-select
                            v-model="video_tag"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择视频标签">
                            <el-option
                                v-for="item in choose_video_tag"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="视频简介">
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="updataUserInfo.desc">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="cancelAddUser('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="submitAddUser('ruleForm')">确 定</el-button>
                    </div>
            </el-dialog> 
            <!-- 弹窗添加视频结束 -->

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    
    import {baseUrl, baseImgPath} from '@/config/env'
    // import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,

                restaurant_id: null,
                city: {},

                // 查询
                search_user: '',

                tableData: [{
                    video_name: '好滋好味',
                    cover: '头像位置',
                    category: '动漫',
                    video_id: '123',
                    creat_time: '2016-09-01',
                    modify_time: '2000-01-01',
                    tag: '要改',
                    desc: '呵呵呵呵呵呵额呵呵这是个性签名',
                    link: 'https.......'
                    }, {
                    video_name: '好滋',
                    cover: '头像位置',
                    category: '动漫',
                    video_id: '456',
                    creat_time: '2016-09-01',
                    modify_time: '2000-01-01',
                    tag: '搞笑',
                    desc: '呵呵呵呵呵呵额呵呵这是个性签名',
                    link: 'https.......'
                }],

                // 分页
                currentRow: null,
                offset: 0,
                currentPage: 1, 
                limit: 20,
                count: 200,

                
                dialogFormVisible: false,   //编辑页面
                dialogFormVisible_adduser: false,   //添加用户

                // 更新用户信息
                // updataUserInfo: {
                //     user_name: '用户X',
                //     phone: 'phone',
                //     email: '123',
                //     sex: 9,
                //     date: '2010-01-01',
                //     desc: "2334",
                // },
                updataUserInfo: {},


                // 新增用户信息
                ruleForm: {
                    name: '',
                },
                rules: {
                    name: [
                        { message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                
                //视频类别
                choose_video_category: [{
                    value: '选项1',
                    label: '综艺'
                    }, {
                    value: '选项2',
                    label: '动漫'
                }],
                video_category: '',

                //视频标签
                choose_video_tag: [{
                    value: 'HTML',
                    label: 'HTML'
                    }, {
                    value: 'JavaScript',
                    label: 'JavaScript'
                    }],
                video_tag: [],
                 //日期
                pickerOptions1: {
                    disabledDate(time) {
                    return time.getTime() > Date.now();
                    },
                },
                value1: '',
                expendRow: [],


                videoFlag: false,
                //是否显示进度条
                videoUploadPercent: "",
                //进度条的进度，
                isShowUploadVideo: false,
                //显示上传按钮
                videoForm: {
                    showVideoPath: ''
                },

                // 无用
                selectTable: {},
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
            }
        },
        computed: {
            // ...mapState(['adminInfo']),
        },
    	components: {
    		headTop,
    	},
        methods: {      
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
            },

            expand(row, status){
            	if (status) {
            		// this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },


            // 编辑
            handleEdit(index, row) {
                console.log("编辑");
                // console.log(index, row);
            	// this.getSelectItemData(row, 'edit')
                this.getSelectItemUserData(row, 'edit');
                this.dialogFormVisible = true;
            },

            getSelectItemUserData(row, type){
                console.log("获取的信息");
                console.log(row);
                // console.log(row.user_name);
                const updataUserInfo = {};
                updataUserInfo.user_name = row.user_name;
                console.log(updataUserInfo.user_name);


            },
            // 删除
            handleDelete(index, row){
                console.log(index, row);
                 this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },

            // 上传图片
            handleServiceAvatarScucess(res, file) {
                if (res.status == 1) {
                    this.selectTable.image_path = res.image_path;
                }else{
                    this.$message.error('上传图片失败！');
                }
            },
            beforeAvatarUpload(file) {
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

            //测试获取信息
            getInfo(row){
                console.log("111");
                console.log(row);
                // console.log(tableData);
            },
            // 更新数据
            updateUserInfo(){
                console.log("呵呵，这是更新");
                this.dialogFormVisible = false;
            },
            
            //对话框关闭
            handleClose(done,formName) {
                this.$confirm('是否保存数据？')
                .then(_ => {
                    // this.$refs[formName].resetFields();
                    done();
                })
                .catch(_ => {});
            },

            //视频上传前回调
            beforeUploadVideo(file) {
                var fileSize = file.size / 1024 / 1024 < 50;
                if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                    layer.msg("请上传正确的视频格式");
                    return false;
                }
                if (!fileSize) {
                    layer.msg("视频大小不能超过50MB");
                    return false;
                }
                this.isShowUploadVideo = false;
            },
            //视频进度条
            uploadVideoProcess(event, file, fileList) {
                this.videoFlag = true;
                this.videoUploadPercent = file.percentage.toFixed(0) * 1;
            },
            //视频上传成功回调
            handleVideoSuccess(res, file) {
                this.isShowUploadVideo = true;
                this.videoFlag = false;
                this.videoUploadPercent = 0;
                
                //前台上传地址
                //if (file.status == 'success' ) {
                //    this.videoForm.showVideoPath = file.url;
                //} else {
                //     layer.msg("上传失败，请重新上传");
                //}

                //后台上传地址
                if (res.Code == 0) {
                    this.videoForm.showVideoPath = res.Data;
                } else {
                    layer.msg(res.Message);
                }
            },

            // 增加
            addUserInfo(formName){
                // alert("1111");
                console.log("增加");
                // this.resetForm(formName);
                this.dialogFormVisible_adduser = true;
            },
            // 重置添加
            resetForm(formName) { 
                // console.log(formName);
                // resetFields();    
                this.$refs[formName].resetFields();   
            },
            // 取消添加用户
            cancelAddUser(formName){
                // this.resetForm(formName);
                this.dialogFormVisible_adduser = false; 
                console.log("取消");
            },
            
            //提交添加用户
            submitAddUser(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(formName);
                        this.resetForm(formName);
                        this.dialogFormVisible_adduser = false;
                        console.log("提交成功");
                        // alert('submit!');           
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                
            },
            
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .table-container{
        padding: 20px;
    }
    .pagination{
        // display: flex;
        // justify-content: flex-start;
        margin-top: 20px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
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
    .table-header{
        padding-bottom: 20px;
    }
    .demo-input-suffix{
        width: 300px;
        display: inline-block;
    }
    .add-button{
        // display: inline-block;
        margin-right: 200px;
        float: right;
    }
   
    .video-cover{
        width: 40px;
        height: 60px;
        background-color: #20a0ff;
    }
    .upload-video .avatar-uploader-icon{
        width: 240px;
    }
</style>
