<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <div class="table-header">
                <div class="demo-input-suffix">
                <el-input
                    placeholder="请输入内容"
                    prefix-icon="el-icon-search"
                    v-model="query_key">
                </el-input>
                </div>
                <!-- 查询用户按钮 -->
                <el-button type="primary" @click="queryKey">查询</el-button>
                <!-- 增加用户按钮 -->
                <div class="adduser-button">
                <!-- <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button> -->
                <el-button type="primary" @click="addAdmin">添加管理员</el-button>
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
                            <el-form-item label="管理员名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <!-- <el-form-item label="头像">
                                <span>{{ props.row.avater }}</span>
                            </el-form-item> -->
                            <!-- <el-form-item label="管理员 ID">
                                <span>{{ props.row.admin_id }}</span>
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
                <el-table-column
                    label="序号"
                    type="index"
                    width="100">
                </el-table-column>
                <el-table-column
                    label="管理员名"
                    prop="name"
                    width="200">
                </el-table-column>
                <!-- <el-table-column
                    label="管理员 ID"
                    prop="admin_id"
                    width="200">
                </el-table-column> -->
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
                        <el-form :model="updateData">
                            <el-form-item label="管理员名" label-width="100px" prop="user_name">
                                <el-input v-model="updateData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系方式" label-width="100px">
                                <el-input v-model="updateData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱" label-width="100px">
                                <el-input v-model="updateData.email"></el-input>
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
                                <el-radio-group v-model="updateData.sex">
                                    <el-radio :label="3">男</el-radio>
                                    <el-radio :label="6">女</el-radio>
                                    <el-radio :label="9">保密</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出生日期" label-width="100px">
                                <el-date-picker
                                    v-model="updateData.birth"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="个性签名" label-width="100px">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请输入内容"
                                        v-model="updateData.personal_signature">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    <!-- </template> -->
                    
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <!-- <el-button type="primary" @click="updateFood">确 定</el-button> -->
                        <el-button type="primary" @click="updateSubmit(updateData)">确 定</el-button>
                        <!-- <el-button type="primary" @click="getInfo">取信息</el-button> -->
                    </div>
                </div>
            </el-dialog>  
            <!-- 弹窗修改用户信息结束 -->

            <!-- 弹窗添加用户开始 -->  
            <!-- :before-close="handleClose"    关闭按钮回调  -->
            <el-dialog title="添加管理员" :visible.sync="dialogFormVisible_add" :show-close="false">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <!-- <el-form-item label="用户ID" prop="id">
                        <el-input v-model="ruleForm.admin_id"></el-input>
                    </el-form-item> -->
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item> 
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model.number="ruleForm.phone" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button @click="cancelAddAdmin('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="submitAddAdmin(ruleForm)">确 定</el-button>
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
    import {getAdminCount, getAllAdmins, delAdmin, addAdmin, updateAdmin, queryAdminCount, queryAdminAll} from '@/api/getData'
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
                query_key: '',

                tableData: [{
                    user_name: '好滋好味',
                    avater: '头像位置',
                    sex: '男',
                    user_id: '123',
                    phone: '13111111111',
                    email: '13412@qq.com',
                    creat_time: '2016-09-01',
                    date: '2000-01-01',
                    personal_signature: '呵呵呵呵呵呵额呵呵这是个性签名'
                    },{
                    user_name: '好滋好味鸡蛋仔',
                    avater: '头像位置',
                    sex: '男',
                    user_id: '789',
                    phone: '13111111111',
                    email: '13412@qq.com',
                    creat_time: '2016-09-01',
                    date: '2000-01-01',
                    personal_signature: '呵呵呵呵呵呵额呵呵这是个性签名'   
                }],

                // 分页
                currentRow: null,
                offset: 0,
                currentPage: 1, 
                limit: 10,
                count: 0,

                
                dialogFormVisible: false,   //编辑页面
                dialogFormVisible_add: false,   //添加用户

                // 更新用户信息
                updateData: {},


                // 新增用户信息
                ruleForm: {},
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
                selectTable: {},
                menuOptions: [],
                selectMenu: {},
                selectIndex: null,
            }
        },
        created(){
            this.initData();
            // this.getAdmins();
        },
        computed: {
            // ...mapState(['adminInfo']),
        	// specs: function (){
        	// 	let specs = [];
        	// 	if (this.selectTable.specfoods) {
	        // 		this.selectTable.specfoods.forEach(item => {
	        // 			specs.push({
	        // 				specs: item.specs_name,
	        // 				packing_fee: item.packing_fee,
	        // 				price: item.price,
	        // 			})
	        // 		})
        	// 	}
        	// 	return specs
        	// }
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try {
                     const res = await getAdminCount();
                    if(res.status == 200 ){
                        if(res.data.success == true){
                            this.count = res.data.total;
                            this.getAdmins();
                        }else{
                            console.log('获取信息失败' + res.data)
                        }
                    }     
                } catch (error) {
                    console.log(error)
                } 
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
            
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                if(this.query_key != ''){
                    this.queryAdmin();
                }else{
                     this.getAdmins();
                } 
            },

            //获取管理员
            async getAdmins(){
                const params = {};
                params.page = this.currentPage-1;
                params.num = this.limit;
                try {
                    const res = await getAllAdmins(params);
                    // console.log(res);
                    this.tableData = [];
                    res.data.admins.forEach(item => {
                        const tableItem = {
                            admin_id: item.admin_id,
                            name: item.name,
                            phone: item.phone,
                            email: item.email,
                            // creat_time: item.creat_time,
                            creat_time: dtime(item.creat_time).format('YYYY-MM-DD'),
                            sex: item.sex,
                            birth: dtime(item.birth).format('YYYY-MM-DD'),
                            personal_signature: item.personal_signature,
                        }
                        this.tableData.push(tableItem);
                    });

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
                // console.log(index, row);
                const selectTable = {};
                selectTable.index = index
                selectTable.admin_id = row.admin_id;
                selectTable.name = row.name;
                selectTable.phone = row.phone;
                selectTable.email = row.email;
                selectTable.creat_time = row.creat_time;
                selectTable.birth = row.birth;
                selectTable.sex = this.toNumSex(row.sex);
                selectTable.personal_signature = row.personal_signature;
                
                this.updateData = selectTable;
                this.dialogFormVisible = true;
            },

            //更新
            async updateSubmit(formName){     
                const params = formName;
                params.sex = this.toTextSex(formName.sex);
                this.dialogFormVisible = false;
                console.log(params);
                try {
                    const res = await updateAdmin(params);
                    // console.log(res);
                    if(res.status == 200 && res.data.success == true){
                        const resData = res.data.admin;
                        resData.creat_time = dtime(res.data.admin.creat_time).format('YYYY-MM-DD');
                        resData.birth = dtime(res.data.admin.birth).format('YYYY-MM-DD')
                        this.tableData.splice(params.index, 1, resData);
                        this.$message({
                            showClose: true,
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            showClose: true,
                            message: '存在错误',
                            type: 'error'
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            // 删除
            async handleDelete(index, row){
                const admin_id = row.admin_id;
                this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(async() => {
                        try {  
                            // console.log(res);
                            const res = await delAdmin(admin_id);
                            if(res.data.success == true){
                                this.tableData.splice(index, 1)
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.initData();      
                            } 
                        } catch (error) {
                            this.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
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
            updateUserInfo(){
                // console.log("呵呵，这是更新");
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
            addAdmin(formName){
                this.dialogFormVisible_add = true;
            },
            // 重置添加
            resetForm(formName) { 
              
                this.$refs[formName].resetFields();   
            },
            // 取消添加用户
            cancelAddAdmin(formName){
               
                this.dialogFormVisible_add = false; 
                // console.log("取消");
            },
            
            //提交添加用户
            async submitAddAdmin(formName) {
                // console.log(formName);
                const params = formName;
                params.psw = formName.checkPass;
                try {
                    // console.log(params)
                    const res = await addAdmin(params);
                    // console.log(res);
                    if(res.data.success == true){
                        this.dialogFormVisible_add = false;
                        this.tableData.push(res.data.data);
                        this.$message({
                                type: 'success',
                                message: '添加成功!'
                        });
                        this.initData();
                    }else{
                        this.dialogFormVisible_add = false;
                        this.$message({
                            type: 'error',
                            message: '添加失败!'
                        });
                    } 
                } catch (error) {
                    console.log(error);
                    this.dialogFormVisible_add = false;
                    this.$message({
                        type: 'error',
                        message: '添加失败!'
                    });
                }            
            },

            async queryKey(){
                const params = {};
                params.name = this.query_key;
                try {
                    if(this.search_user != ''){
                        this.currentPage = 0;
                        const res = await queryAdminCount(params);
                        // console.log(res);
                        if(res.status == 200){
                            if(res.data.success == true){
                                this.count = res.data.total;
                                this.queryAdmin();
                            }else{
                                console.log(res.data.msg)
                            }
                        }
                    }else{
                        this.initData();  //数据
                        this.getUsers();  //用户
                    }   
                } catch (error) {
                    console.log(error);
                     this.$message({
                        type: 'error',
                        message: '查询错误!'
                    });
                }
            },

            //获取被查询管理员信息
            async queryAdmin(){
                const params = {};
                params.name = this.query_key;
                params.page = this.currentPage-1;
                params.num = this.limit;
                try {
                    const res = await queryAdminAll(params);
                    if(res.status == 200){
                        if(res.data.success == true){
                            this.tableData = [];
                            res.data.admins.forEach(item => {
                                const tableItem = {
                                    admin_id: item.admin_id,
                                    name: item.name,
                                    phone: item.email,
                                    email: item.email,
                                    creat_time: dtime(item.creat_time).format('YYYY-MM-DD'),
                                    sex: item.sex,
                                    birth: dtime(item.birth).format('YYYY-MM-DD'),
                                    personal_signature: item.personal_signature,
                                }
                                this.tableData.push(tableItem);
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
    .adduser-button{
        // display: inline-block;
        margin-right: 200px;
        float: right;
    }

</style>
