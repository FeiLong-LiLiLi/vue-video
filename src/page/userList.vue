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
                <!-- 查询用户按钮 -->
                <div class="demo-input-suffix">
                    <el-button type="primary" @click="queryName">查询</el-button>
                </div>
                <!-- 增加用户按钮 -->
                <div class="add-button">
                <el-button type="primary" @click="addUserInfo">添加用户</el-button>
                </div>
            </div>
    
            <!-- 表格信息开始 -->
             <el-table
                :data="tableData"
                @expand='expand'
                :expand-row-keys='expendRow'
                :row-key="row => row.index"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="用户名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <!-- <el-form-item label="头像">
                                <span>{{ props.row.avater }}</span>
                            </el-form-item> -->
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
                                <span>{{ props.row.birth }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="个性签名">
                                <span>{{ props.row.personal_signature }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="序号"
                    type="index"
                    width="100">
                </el-table-column> -->
                <el-table-column
                    label="用户名称"
                    prop="name"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="电子邮箱"
                    prop="email"
                    width="200">
                </el-table-column>
                <el-table-column
                  label="个性签名"
                  prop="personal_signature">
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
            
            <!-- 弹窗修改用户信息开始 -->
            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible" :show-close="false" >
                <div class="updateUserInfo">
                    <!-- <template slot-scope="props"> -->
                        <el-form :model="selectTable"
                            @expand='expand'
                            :expand-row-keys='expendRow'
                            :row-key="row => row.index">
                            <el-form-item label="用户名" label-width="100px">
                                <el-input v-model="selectTable.name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" label-width="100px">
                                <el-input v-model="selectTable.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱" label-width="100px">
                                <el-input v-model="selectTable.email"></el-input>
                            </el-form-item>
                            <!-- 头像要改 -->
                            <!-- <el-form-item label="头像" label-width="100px">
                                <el-upload
                                class="avatar-uploader"
                                :action="baseUrl + '/v1/addimg/food'"
                                :show-file-list="false"
                                :on-success="handleServiceAvatarScucess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="selectTable.image_path" :src="baseImgPath + selectTable.image_path" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item> -->
                            <el-form-item label="性别" label-width="100px">
                                <el-radio-group v-model="selectTable.sex">
                                    <el-radio :label="3">男</el-radio>
                                    <el-radio :label="6">女</el-radio>
                                    <el-radio :label="9">保密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出生日期" label-width="100px">
                                <el-date-picker
                                    v-model="selectTable.birth"
                                    type="date"
                                    placeholder="选择日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="个性签名" label-width="100px">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="selectTable.personal_signature">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    <!-- </template> -->
                    
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <!-- <el-button type="primary" @click="updateFood">确 定</el-button> -->
                        <el-button type="primary" @click="updateUserInfo(selectTable)">确 定</el-button>
                    </div>
                </div>
            </el-dialog>  
            <!-- 弹窗修改用户信息结束 -->

            <!-- 弹窗添加用户开始 -->  
            <!-- :before-close="handleClose"    关闭按钮回调  -->
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible_adduser" :show-close="false">
                <el-form :model="formData" 
                    status-icon 
                    :rules="rules" 
                    ref="formData" 
                    label-width="80px" 
                    class="demo-ruleForm"
                     @expand='expand'
                    :expand-row-keys='expendRow'
                    :row-key="row => row.index">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item> 
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model.number="formData.phone" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="formData.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="formData.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                   
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <!-- <el-button @click="resetForm('formData')">重置</el-button> -->
                        <el-button @click="cancelAddUser('formData')">取 消</el-button>
                        <el-button type="primary" @click="submitAddUser(formData)">确 定</el-button>
                    </div>
            </el-dialog> 
            <!-- 弹窗添加用户结束 -->

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import dtime from 'time-formater'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getUsersCount, getAllUsers, addUser, delUser, updateUser, queryUserCount, queryUserAll} from '@/api/getData'
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
                // 查询
                search_user: '',
                
                // 分页
                currentRow: null,
                offset: 0,
                currentPage: 1, 
                limit: 10,
                count: 0,

                
                dialogFormVisible: false,   //编辑页面
                dialogFormVisible_adduser: false,   //添加用户

                tableData: [],//表格数据
                selectTable: {},//选中信息
                updateData: {},//更新信息
                formData: {},//添加

                rules: {
                    // name: [
                    //     { required: true, message: '请输入用户名', trigger: 'blur' },
                    //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    // ],
                    // email:[
                    //     { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    //     { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    // ],
                    // phone:[
                    //     // { required: true, message: '请输入正确的手机号码', trigger: 'blur' },
                    //     // { type: 'number', message: '电话号码必须是数字'}
                    //     { required: true, message: '请输入联系电话'},
					// 	{ type: 'number', message: '电话号码必须是数字' }
                    // ],
                    // pass: [
                    //     { required: true, validator: validatePass, trigger: 'blur' }
                    // ],
                    // checkPass: [
                    //     { required: true, validator: validatePass2, trigger: 'blur' }
                    // ],
                    // age: [
                    //     { validator: checkAge, trigger: 'blur' }
                    // ]
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
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
            }
        },
        created(){
            this.initData();  //数据
            this.getUsers();  //用户   	
        },
        watch: {
            
        },
        computed: {
            // ...mapState(['adminInfo'])
 
        },
    	components: {
    		headTop,
    	},
        methods: {
            //初始化数据
            async initData(){
                try {
                    const res = await getUsersCount()
                    if(res.status ==200){
                        if(res.data.success == true){  
                            this.count = res.data.total; 
                        }else{
                            console.log('获取用户数量失败')
                        }
                    }
                } catch (error) {
                    console.log(error);
                }

            },
            
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                if(this.search_user != ''){
                    this.queryUser();
                }else{
                    this.getUsers();
                }
            },
            async getUsers(){
                const params = {};
                params.page = this.currentPage-1;
                params.num = this.limit;
                try {
                    const res = await getAllUsers(params);
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.tableData = [];
                            res.data.users.forEach(item =>{
                                const tableItem = {
                                    user_id: item.user_id,
                                    name: item.name,
                                    phone: item.phone,
                                    email: item.email,
                                    creat_time: dtime(item.creat_time).format('YYYY-MM-DD'),
                                    birth:  dtime(item.birth).format('YYYY-MM-DD'),
                                    sex: item.sex,
                                    personal_signature: item.personal_signature,
                                }
                                this.tableData.push(tableItem)
                            })
                        }else{
                            console.log(res.data.msg)
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
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
                //信息赋值
                const selectTable = {};
                selectTable.index = index;
                selectTable.user_id = row.user_id;
                selectTable.name = row.name;
                selectTable.phone = row.phone;
                selectTable.email = row.email;
                selectTable.avator = row.avator;
                selectTable.sex = this.toNumSex(row.sex);
                selectTable.birth = row.birth;
                selectTable.personal_signature = row.personal_signature;

                this.selectTable = selectTable;
                this.dialogFormVisible = true;
            },

            
            //性别问题
            toNumSex(sex){
                if(sex == '男'){
                    return 3;
                }else if(sex == '女'){
                    return 6;
                }else if(sex == '保密'){
                    return 9
                }
            },
            toTextSex(sex){
                if(sex == 3){
                    return '男';
                }else if(sex == 6){
                    return '女';
                }else if (sex == 9){
                    return '保密'
                }
            },
            
            // 删除
            async handleDelete(index, row){
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then( async() => {
                        try {
                            const res = await delUser(row.user_id)
                            console.log(res);
                            if(res.status == 200){
                                if(res.data.success == true){
                                    this.tableData.splice(index,1)
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    this.initData();
                                }else{
                                    this.$message({
                                        type: 'error',
                                        message: '删除失败!'
                                    }); 
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        }    
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


            // 更新数据
            async updateUserInfo(selectTable){
                const params= selectTable;
                params.sex = this.toTextSex(selectTable.sex);                              
                this.dialogFormVisible = false;
                try {
                    const res = await updateUser(params)
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.success == true){
                            const resData = res.data.user;
                            resData.creat_time = dtime(res.data.user.creat_time).format('YYYY-MM-DD');
                            resData.birth = dtime(res.data.user.birth).format('YYYY-MM-DD');
                            this.tableData.splice(selectTable.index, 1, resData);
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'success'
                            });
                           
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                
                
            },
            //对话框关闭
            handleClose(done,formName) {
                this.$confirm('是否保存数据？')
                .then(_ => {
                    this.$refs[formName].resetFields();
                    done();
                })
                .catch(_ => {});
            },

            // 增加
            addUserInfo(formName){
               
                console.log(formName);
                // this.$refs[formName].resetFields();
                this.dialogFormVisible_adduser = true;
            },
            // 重置添加
            resetForm(formName) { 
              
                this.$refs[formName].resetFields();   
            },
            // 取消添加用户
            cancelAddUser(formName){
                this.dialogFormVisible_adduser = false; 
                console.log("取消");
            },
            
            //提交添加用户
            async submitAddUser(formData) {
                const params = formData;
                try {
                    console.log(params)
                    const res = await addUser(params);
                    console.log(res);
                    if(res.status == 200){
                        if(res.data.success == true){   
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                this.dialogFormVisible_adduser = false;   
                                this.tableData.push(res.data.user); 
                                this.initData();	 
                        }else{
                            this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'error'
                                });
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            
            //查询
            async queryName(){
                const params = {};
                params.name = this.search_user;  
                try { 
                    if(this.search_user != ''){
                        this.currentPage = 0;
                        const res = await queryUserCount(params)
                        // console.log(res);
                        if(res.status == 200){
                            if(res.data.success == true){
                                this.count = res.data.total;
                                this.queryUser();
                            }else{
                                console.log(res.data.msg)
                            }
                        }
                    }else{
                        this.initData();  //数据
                        this.getUsers();  //用户
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            //被查询的用户信息
            async queryUser(){
                const params = {};
                params.name = this.search_user;
                params.page = this.currentPage -1;
                params.num = this.limit;
                try {
                    const res = await queryUserAll(params);
                    // console.log(res);
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.tableData = [];
                            res.data.users.forEach(item =>{
                                const tableItem = {
                                    user_id: item.user_id,
                                    name: item.name,
                                    phone: item.phone,
                                    email: item.email,
                                    creat_time: dtime(item.creat_time).format('YYYY-MM-DD'),
                                    birth: dtime(item.birth).format('YYYY-MM-DD'),
                                    sex: item.sex,
                                    personal_signature: item.personal_signature,
                                }
                                this.tableData.push(tableItem)
                            }) 
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            
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
    .el-dialog--small{
        width: 35%;
    }
    .el-dialog__body{
        margin: 0 50px 0  30px;
    }


</style>
