<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table-container">
            <el-table
		      :data="tableData"
		      style="width: 100%">
               <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="user_name"
                    label="管理员名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="create_time"
                    label="注册日期"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="city"
                    label="地址"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="admin"
                    label="权限">
                </el-table-column>
		    </el-table>

            <!-- <el-table
		      :data="tableData"
		      style="width: 100%">
               <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="#"
                    label="管理员名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="#"
                    label="管理员id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="#"
                    label="注册日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="#"
                    label="联系方式"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="#"
                    label="权限">
                </el-table-column>
		    </el-table> -->

            <!-- 分页 -->
		    <!-- <div class="Pagination" style="text-align: left;margin-top: 20px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div> -->

            <!-- 新分页 -->
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {adminList, adminCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await adminCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getAdmin();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getAdmin()
            },
            async getAdmin(){
                try{
                    const res = await adminList({offset: this.offset, limit: this.limit});
                    if (res.status == 1) {
                    	this.tableData = [];
                    	res.data.forEach(item => {
                    		const tableItem = {
                    			create_time: item.create_time,
						        user_name: item.user_name,
						        admin: item.admin,
                                city: item.city,
                    		}
                    		this.tableData.push(tableItem)
                    	})
                    }else{
                    	throw new Error(res.message)
                    }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table-ontainer{
        padding: 20px;
    }
    
    .Pagination{
        margin-top: 20px;
    }
</style>


