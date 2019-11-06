<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">

    
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
                            <el-form-item label="用户名">
                                <span>{{ props.row.user_name }}</span>
                            </el-form-item>
                            <el-form-item label="头像">
                                <span>{{ props.row.avater }}</span>
                            </el-form-item>
                            <el-form-item label="用户 ID">
                                <span>{{ props.row.user_id }}</span>
                            </el-form-item>
                            <el-form-item label="联系方式">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                            <el-form-item label="电子邮箱">
                                <span>{{ props.row.email }}</span>
                            </el-form-item>
                            <el-form-item label="注册时间">
                                <span>{{ props.row.creat_time }}</span>
                            </el-form-item>
                            <el-form-item label="出生日期">
                                <span>{{ props.row.date }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="个性签名">
                                <span>{{ props.row.desc }}</span>
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
                    label="用户名称"
                    prop="user_name"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="用户 ID"
                    prop="user_id"
                    width="200">
                </el-table-column>
                <el-table-column
                  label="个性签名"
                  prop="desc">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                    <router-link to='/userMonitoring/userMonView'>
                    <el-button
                      size="small"
                      type="danger"
                      @click="enterView(scope.$index, scope.row)">进入查看</el-button>
                    </router-link>
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
            
  


        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    
    import {baseUrl, baseImgPath} from '@/config/env'
    // import {getFoods, getFoodsCount, getMenu, updateFood, deleteFood, getResturantDetail, getMenuById} from '@/api/getData'
    export default {
        data(){
            var checkAge = (rule, value, callback) => {
                if (!value) {
                return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                    callback(new Error('必须年满18岁'));
                    } else {
                    callback();
                    }
                }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                baseUrl,
                baseImgPath,

                restaurant_id: null,
                city: {},

                // 查询
                search_user: '',

                tableData: [{
                    user_name: '好滋好味',
                    avater: '头像位置',
                    sex: '男',
                    user_id: '123',
                    phone: '13111111111',
                    email: '13412@qq.com',
                    creat_time: '2016-09-01',
                    date: '2000-01-01',
                    desc: '呵呵呵呵呵呵额呵呵这是个性签名'
                    },{
                    user_name: '好滋好味鸡蛋',
                    avater: '头像位置',
                    sex: '男',
                    user_id: '456',
                    phone: '13111111111',
                    email: '13412@qq.com',
                    creat_time: '2016-09-01',
                    date: '2000-01-01',
                    desc: '呵呵呵呵呵呵额呵呵这是个性签名'
                    },{
                    user_name: '好滋好味鸡蛋仔',
                    avater: '头像位置',
                    sex: '男',
                    user_id: '789',
                    phone: '13111111111',
                    email: '13412@qq.com',
                    creat_time: '2016-09-01',
                    date: '2000-01-01',
                    desc: '呵呵呵呵呵呵额呵呵这是个性签名'   
                }],

                // 分页
                currentRow: null,
                offset: 0,
                currentPage: 1, 
                limit: 20,
                count: 200,

                
                dialogFormVisible: false,   //编辑页面
                dialogFormVisible_adduser: false,   //添加用户

          
                updataUserInfo: {},


                // 新增用户信息
                ruleForm: {
                    name: '',
                    email: '',
                    phone: '',
                    pass: '',
                    checkPass: '',
                    radio: 9,
                    age: '',
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    email:[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    phone:[
                        // { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
                        // { type: 'number', message: '电话号码必须是数字'}
                        { required: true, message: '请输入联系电话'},
						{ type: 'number', message: '电话号码必须是数字' }
                    ],
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                },

                 //日期
                pickerOptions1: {
                    disabledDate(time) {
                    return time.getTime() > Date.now();
                    },
                },
                value1: '',
                expendRow: [],

                // 无用
                selectTable: {},
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
            }
        },
  
        computed: {
    
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
                // this.getFoods()
            },

            expand(row, status){
            	if (status) {
            		// this.getSelectItemData(row)
            	}else{
                    const index = this.expendRow.indexOf(row.index);
                    this.expendRow.splice(index, 1)
                }
            },
            enterView(index,row){
                console.log(index, row, '进入用户视图');
            },

 

            getSelectItemUserData(row, type){
                console.log("获取的信息");
                console.log(row);
                // console.log(row.user_name);
                const updataUserInfo = {};
                updataUserInfo.user_name = row.user_name;
                updataUserInfo.push()
                console.log(updataUserInfo.user_name);


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
    .adduser-button{
        // display: inline-block;
        margin-right: 200px;
        float: right;
    }

</style>
