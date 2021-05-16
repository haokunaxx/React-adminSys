# day01

## 1. 项目开发准备

### 1. 项目创建

```
项目创建
npx create-react-app my-app
yarn start
```

### 2. git管理项目

```
1) 创建远程仓库
2) 创建本地仓库
	a. git init 生成package.json
	b. 配置.gitignore
	c. git add . 
	d. git commit -m 'project init'
3) 将本地仓库代码提交至远程仓库 
	git remote add origin https://.....
	git push origin master
4) 在本地创建dev分支，并推送到远程分支
	git checkout -b dev
	git push origin dev
5) 在本地dev分支上编写代码之后提交到远程dev分支
	git add .
	git commit -m 'modify'
	git push origin dev
6) 没问题之后合并dev分支到master分支并提交到远程仓库
	git checkout master
	git merge dev
	git push origin master
7) 克隆仓库（新同事拉取代码）
	git clone https://....
	git checkout -b dev origin/dev
	git pull origin dev
```

### 3. 建立项目的标准结构

```
index.js 入口js
App.js	最外层组件
/pages	页面
/components	组件
/api	接口、请求封装
/assets	静态资源目录
/store	存储数据目录
```

## 2. 引入所需资源

### 1. antd

```
下载 yarn add antd --dev
实现按需打包
	下载 yarn add customize-cra --dev
	配置 config-overrides.js
```

### 2. 引入路由 react-router-dom

```
下载 yarn add react-router-dom
拆分、注册路由
	<BrowserRouter>
        <Switch>
            <Route path='/Login' component={Login}></Route>
            <Route path='/' component={Home}></Route>
        </Switch>
    </BrowserRouter>
```

## 3. Login部分的页面和逻辑实现

### 1. 整体逻辑

```
	0). 判断localStorage中是否有值，有则直接跳转至Home
	1). 调用登陆的接口请求
    2). 如果失败, 显示错误提示信息
    3). 如果成功了:
        保存user到local/内存中
        跳转到Home
        
 	包含使用localStorage来保存user相关操作的工具模块
    使用第三库store
        简化编码
        兼容不同的浏览器
```

### 2. 静态页面

​	手动布局 + Antd组件：Form, Input, Button, message 

### 3. 表单校验。两种方法

```
// 1.
<Form.Item
    ...
    rules={[
        {
            required: true,
            message: '用户名不能为空',
        },{
            max:12,
            message:'用户名不能超过12位'
        },{
            min:4,
            message:'用户名不能小于4位'
        },{
            pattern:/^[a-zA-Z0-9_]+$/,
            message:'用户名只能由英文、数字或者下划线组成'
        }
     ]}>
        <Input />
 </Form.Item>
```

```
// 2.
<Form.Item
    ...
    rules={[
        {
            validator(_,val){
                if(!val){
                	return Promise.reject(new Error('请输入密码'));
                }else if(val.length<4){
                	return Promise.reject(new Error('密码不能小于4位'));
                }else if(val.length>12){
                	return Promise.reject(new Error('密码不能大于12位'));
                }else if(!/^[a-zA-Z0-9_]+$/.test(val)){
                	return Promise.reject(new Error('用户名只能由英文、数字或者下划线组成'));
                }else{
                	return Promise.resolve();
                }
            }
        }
     ]}>
        <Input />
 </Form.Item>
```

### 4. 登录表单提交

1. 获取表单对象，Refs的使用
2. 校验表单。
   1. 表单对象调用validateFields方法
   2. 方法调用返回结果**为Promise对象**
3. 表单提交，async/await使用、路由组件手动路由跳转
   1. this.props.history.replace('/')
4. 组件挂载时登录状态的判断

# day02

## Home/整体开发顺序/逻辑

```
1) 判断用户是否登录
	未登录-》跳转至login页面
2) Laout对页面进行布局
3) 编写Header部分
4) 编写侧边栏
5)
6)
7)
```

## Home/侧边栏开发

### 1. 组件挂载时根据静态文件menuConfig.js来渲染侧边栏，利于维护

### 2. 默认选中和默认展开

1. 默认选中必须Menu上的selectedKeys中的数组中的键名与Menu.Item的key值一致才行
2. 默认展开实现逻辑：
   - 首先是父节点
   - 其次是父节点下的子节点的key和当前的url路径一致。

### 3. 设置二级路由

​	Link组件设置 to 属性。配置对应路由。

## Home/Header开发

### 1. 布局

### 2. 退出登录

```
Modal组件显示提示
清除保存的user
跳转到login
```

## Home/Content开发

### 1. 分析Content组件目录结构

```
/Content
	/Breadcrumb
	/Category
	/Charts
	/Index
	/Product
	/Role
	/User
	index.js
	index.scss
```

### 2. 配置对应路由(index.js)

```
<Switch>
	<Route path='/index' component={Index}></Route> 
    <Route path='/user' component={User}></Route> 
    <Route path='/role' component={Role}></Route> 
    <Route path='/product' component={Product}></Route> 
    <Route path='/category' component={Category}></Route> 
    <Route path='/charts/pie' component={Pie}></Route> 
    <Route path='/charts/bar' component={Cube}></Route> 
    <Route path='/charts/line' component={Line}></Route> 
    <Redirect to='/index'></Redirect>
</Switch>
```

### 2.开发品类管理(Category)部分

#### 1. 结构分析

```
	Card(卡片视图)
		Breadcrumb(面包屑导航)
		Table(表格)
			THead(表头)
			Info(表格行信息)
			Operator(操作按钮)
    Modal(模态框)
    	AddForm/UpdateForm(新建/更新表单)
```

#### 2. 

...忘记保存 下次补全。

# day03 商品管理页面的开发

## 页面布局

![image-20210516171726170](/MDPics/image-20210516171726170.png)

## 一些注意的点：

#### **使用到的antd的组件**

​	Card、Table、Select、Input、Switch、Button、Icon

#### **分页为后台分页**

#### **搜索接口和查询接口整合为一个接口**

#### **受控组件的封装**

​	根据name属性。

#### tableInfo中设置className用于使表格Column项居中显示

​	样式设置 text-align:center;

#### 搜索时重置Table的pagination属性的curPage值