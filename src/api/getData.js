// import fetch from '@/config/fetch'
import axios from 'axios'

// /**
//  * 登陆
//  */

// export const login = data => fetch('/admin/login', data, 'POST');

// /**
//  * 退出
//  */

// export const signout = () => fetch('/admin/signout');

// /**
//  * 获取用户信息
//  */

// export const getAdminInfo = () => fetch('/admin/info');
// export const getAdminInfo = () => fetch('Http://localhost:8004/api/admin/adminInfo')


// export module = getAdminInfo;
//  * api请求量
//  */

// export const apiCount = date => fetch('/statis/api/' + date + '/count');

// /**
//  * 所有api请求量
//  */

// export const apiAllCount = () => fetch('/statis/api/count');


// /**
//  * 所有api请求信息
//  */

// export const apiAllRecord = () => fetch('/statis/api/all');

// /**
//  * 用户注册量
//  */

// export const userCount = date => fetch('/statis/user/' + date + '/count');

// /**
//  * 某一天订单数量
//  */

// export const orderCount = date => fetch('/statis/order/' + date + '/count');


// /**
//  * 某一天管理员注册量
//  */

// export const adminDayCount = date => fetch('/statis/admin/' + date + '/count');

// /**
//  * 管理员列表
//  */

// export const adminList = data => fetch('/admin/all', data);

// /**
//  * 管理员数量
//  */

// export const adminCount = () => fetch('/admin/count');

// /**
//  * 获取定位城市
//  */

// export const cityGuess = () => fetch('/v1/cities', {
// 	type: 'guess'
// });

// /**
//  * 添加商铺
//  */

// export const addShop = data => fetch('/shopping/addShop', data, 'POST');

// /**
//  * 获取搜索地址
//  */

// export const searchplace = (cityid, value) => fetch('/v1/pois', {
// 	type: 'search',
// 	city_id: cityid,
// 	keyword: value
// });

// /**
//  * 获取当前店铺食品种类
//  */

// export const getCategory = restaurant_id => fetch('/shopping/getcategory/' + restaurant_id);

// /**
//  * 添加食品种类
//  */

// export const addCategory = data => fetch('/shopping/addcategory', data, 'POST');


// /**
//  * 添加食品
//  */

// export const addFood = data => fetch('/shopping/addfood', data, 'POST');


// /**
//  * category 种类列表
//  */

// export const foodCategory = (latitude, longitude) => fetch('/shopping/v2/restaurant/category');

// /**
//  * 获取餐馆列表
//  */

// export const getResturants = data => fetch('/shopping/restaurants', data);

// /**
//  * 获取餐馆详细信息
//  */

// export const getResturantDetail = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id);

// /**
//  * 获取餐馆数量
//  */

// export const getResturantsCount = () => fetch('/shopping/restaurants/count');

// /**
//  * 更新餐馆信息
//  */

// export const updateResturant = data => fetch('/shopping/updateshop', data, 'POST');

// /**
//  * 删除餐馆
//  */

// export const deleteResturant = restaurant_id => fetch('/shopping/restaurant/' + restaurant_id, {}, 'DELETE');

// /**
//  * 获取食品列表
//  */

// export const getFoods = data => fetch('/shopping/v2/foods', data);

// /**
//  * 获取食品数量
//  */

// export const getFoodsCount = data => fetch('/shopping/v2/foods/count', data);


// /**
//  * 获取menu列表
//  */

// export const getMenu = data => fetch('/shopping/v2/menu', data);

// /**
//  * 获取menu详情
//  */

// export const getMenuById = category_id => fetch('/shopping/v2/menu/' + category_id);

// /**
//  * 更新食品信息
//  */

// export const updateFood = data => fetch('/shopping/v2/updatefood', data, 'POST');

// /**
//  * 删除食品
//  */

// export const deleteFood = food_id => fetch('/shopping/v2/food/' + food_id, {}, 'DELETE');

// /**
//  * 获取用户列表
//  */

// export const getUserList = data => fetch('/v1/users/list', data);

// /**
//  * 获取用户数量
//  */

// export const getUserCount = data => fetch('/v1/users/count', data);

// /**
//  * 获取订单列表
//  */

// export const getOrderList = data => fetch('/bos/orders', data);

// /**
//  * 获取订单数量
//  */

// export const getOrderCount = data => fetch('/bos/orders/count', data);

// /**
//  * 获取用户信息
//  */

// export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

// /**
//  * 获取地址信息
//  */

// export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

// /**
//  * 获取用户分布信息
//  */

// export const getUserCity = () => fetch('/v1/user/city/count');



// /**
//  * 获取信息测试
//  */



/**
 * 登录
 */

export const login = data => axios.post('http://localhost:8004/api/admins/login' ,data);

/**
 *退出 
 */

export const logout = data => axios.post();

/**
 * 获取用户数量
 */

export const getUsersCount = () => axios.get('http://localhost:8004/api/user/usersInfo/count');

/**
 * 获取用户信息
 */

export const getAllUsers = data => axios.get('http://localhost:8004/api/user/usersInfo/all',{params: {page: data.page, num: data.num}});

/**
 * 增加/注册用户
 */

export const addUser = data => axios.post('http://localhost:8004/api/users/register', data);

/**
 * 删除用户
 */

export const delUser = id => axios.get('http://localhost:8004/api/user/delUser', {params:{user_id: id}});

/**
 * 更新用户
 */

export const updateUser = data => axios.post('http://localhost:8004/api/user/updateUserInfo', data)

/**
 * 查询用户数量
 */

export const queryUserCount = data => axios.post('http://localhost:8004/api/user/queryUser/count', data);

/**
 *获取查询用户的信息 
 */

export const queryUserAll = data => axios.get('http://localhost:8004/api/user/queryUser/all', {params: {name: data.name, page: data.page, num: data.num}});

/* 
* 获取用户性别
*/

export const getUserSex = () => axios.get('http://localhost:8004/api/user/usersInfo/sex');
 
/*
*获取管理员数量
*/

export const getAdminCount = () => axios.get('Http://localhost:8004/api/admin/adminInfo/count');

/**
 * 获取管理员信息
 */

export const getAllAdmins = data => axios.get('http://localhost:8004/api/admin/adminInfo/all',{params: {page: data.page, num: data.num}});

/*
 *添加管理员 
 */

export const addAdmin = data => axios.post('http://localhost:8004/api/admin/addAdmin', data);

/*
 *删除管理员 
 */

export const delAdmin = id => axios.get('http://localhost:8004/api/admin/delAdmin', {params:{admin_id: id}});

/*
*更新管理员
*/

export const updateAdmin = data => axios.post('http://localhost:8004/api/admin/updateAdmin', data);

/**
 * 获取被查询管理员数量
 */

export const queryAdminCount = data => axios.post('http://localhost:8004/api/admin/queryAdmin/count', data);

/**
 *获取被查询管理员信息 
 */

export const queryAdminAll = data => axios.get('http://localhost:8004/api/admin/queryAdmin/all', {params: {name: data.name, page: data.page, num: data.num}})

/* 
* 获取管理员性别
*/

export const getAdminSex = () => axios.get('http://localhost:8004/api/admin/adminInfo/sex');

/**
 * 获取视频数量
 */

export const getVideosCount = () => axios.get('http://localhost:8004/api/video/videoInfo/count');

/**
 * 获得所有视频源信息
 */

export const getAllVideos = data => axios.get('http://localhost:8004/api/video/videoInfo/all', {params: {page: data.page, num: data.num}});

/**
 * 增加视频
 */

export const addVideo = data => axios.post('http://localhost:8004/api/video/addVideo',data);

/**
 * 删除视频
 */

export const delVideo = id => axios.get('http://localhost:8004/api/video/delVideo',{params:{video_id: id}});

/**
 * 更新视频
 */

 export const updateVideo = data => axios.post('http://localhost:8004/api/video/updateVideo', data);

 /**
  * 获取被查询视频数量
  */

export const queryVideoCount = data => axios.post('http://localhost:8004/api/video/queryVideo/count', data);

/**
 * 获取被查询视频信息
 */

 export const queryVideoAll = data => axios.get('http://localhost:8004/api/video/queryVideo/all', {params: {name: data.name, page: data.page, num: data.num}})

/**
 * 获取所有视频类别数量
 */

export const getAllCategoriesNum = () => axios.get('http://localhost:8004/api/categories/num');

/**
 *获取类别信息 
 */

export const getAllCategories = () => axios.get('http://localhost:8004/api/categories/get');

/**
 * 添加视频类别
 */

export const addCategory = data => axios.post('http://localhost:8004/api/categories/add', data);

/**
 * 删除视频类别
 */

export const delCategory = category => axios.get('http://localhost:8004/api/categories/del', {params: {category: category}});

/**
 * 查询视频标签
 */

// export const queryCategories = data => axios.post();

/**
 * 获取标签信息
 */

export const getAllTags = () => axios.get('http://localhost:8004/api/tags/get');

/**
 * 添加视频标签
 */

export const addTag = data => axios.post('http://localhost:8004/api/tags/add', data);

/**
 * 删除视频标签
 */

export const delTag = tag => axios.get('http://localhost:8004/api/tags/del', {params: {tag: tag}});

/**
 * 查询视频标签
 */

// export const queryTags = data => axios.post();