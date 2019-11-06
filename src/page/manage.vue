<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页
					</el-menu-item>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<!-- <el-menu-item index="userList">用户列表</el-menu-item>	 -->
						<!-- <el-menu-item index="adminList">管理员列表</el-menu-item> -->
						<el-menu-item index="/userListNEW">用户列表（新）</el-menu-item>	
						<el-menu-item index="/adminListNEW">管理员列表（新）</el-menu-item>	
						<el-menu-item index="/videoList">视频列表</el-menu-item>	
						<el-menu-item index="/messageList">通知列表</el-menu-item>				
						<!-- <el-menu-item index="shopList">商家列表</el-menu-item> -->
						<!-- <el-menu-item index="foodList">食品列表</el-menu-item> -->
						<!-- <el-menu-item index="orderList">订单列表</el-menu-item> -->
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-star-on"></i>数据统计</template>
						<el-menu-item index="/userData">用户数据</el-menu-item>
						<el-menu-item index="/adminData">管理员数据</el-menu-item>
						<el-menu-item index="/videoData">视频数据</el-menu-item>
						<!-- <el-menu-item index="#">评论数据</el-menu-item> -->
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-view"></i>实时监控</template>
						<el-menu-item index="/userMonitoring">用户监控</el-menu-item>
						<el-menu-item index="/videoMonitoring">视频监控</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-setting"></i>个人中心</template>
						<!-- <el-menu-item index="adminSet">管理员信息</el-menu-item> -->
						<el-menu-item index="/adminSet">个人信息</el-menu-item>
						<!-- <el-menu-item index="adminper">我的权限</el-menu-item> -->
						<el-menu-item index="/sendMessage">我的权限</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="/explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>  
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	// .manage_page{
		
	// }
</style>
