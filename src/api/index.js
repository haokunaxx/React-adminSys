import ajax from './ajax';

// 登录
const UserLogin = (argsObj) => ajax('/login',argsObj,'POST');
// 查看分类列表
const getCateList = (argsObj) => ajax('/manage/category/list',argsObj);
// 添加分类
const addCate = (argsObj) => ajax('/manage/category/add',argsObj,'POST');
// 更新分类
const updateCate = (argsObj) => ajax('/manage/category/update',argsObj,'POST');



export{
    UserLogin,
    getCateList,
    addCate,
    updateCate
}