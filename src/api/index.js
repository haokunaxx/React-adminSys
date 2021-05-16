import ajax from './ajax';

// 登录
const UserLogin = (argsObj) => ajax('/login',argsObj,'POST');

// 分类
// 查看分类列表
const getCateList = (argsObj) => ajax('/manage/category/list',argsObj);
// 添加分类
const addCate = (argsObj) => ajax('/manage/category/add',argsObj,'POST');
// 更新分类
const updateCate = (argsObj) => ajax('/manage/category/update',argsObj,'POST');

// 商品
// 获取商品列表
const getProdList = (argsObj) => {
    return (argsObj.hasOwnProperty('productName') || argsObj.hasOwnProperty('productDesc')) ?  ajax('/manage/product/search',argsObj) : ajax('/manage/product/list',argsObj); 
}

const updateProdStatus = (argsObj) => ajax('/manage/product/updateStatus',argsObj,'POST');


export {
    UserLogin
}
export {
    getCateList,
    addCate,
    updateCate
}

export {
    getProdList,
    updateProdStatus
}