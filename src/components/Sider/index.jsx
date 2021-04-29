import {Component} from 'react';
import {Link,withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import {
    PieChartOutlined,
    MailOutlined,
  } from '@ant-design/icons';

import './index.scss';

import menuConf from '../../assets/data/menuConfig';

const { SubMenu } = Menu;
class Sider extends Component{
    /* 
        根据menu数据动态生成侧边栏
        两种结构：
            有子节点：
             <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                <Menu.Item key="5">
                    <Link to='/test'>Option 5</Link>
                </Menu.Item>
                ...
            </SubMenu>
            无子节点：
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
    */
    
    getMenuItems = (menuConf) => {
        const {pathname} = this.props.location;
        return menuConf.map(item => {
            if(item.children && item.children.length>0){
                let defaultChildNode = item.children.find(child=>child.key === pathname);
                if(defaultChildNode){
                    this.defOpenKey = item.key;
                }
                return (
                    <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
                        {this.getMenuItems(item.children)}
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.key} icon={<PieChartOutlined />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            }
        })
    }

    componentWillMount(){
        this.menuItems = this.getMenuItems(menuConf);
    }

    render(){
        const {pathname} = this.props.location;
        return(
            <div className='sider-wrapper'>
                <div className="sys-name">
                   AdminSystem
                </div>
                <Menu
                    selectedKeys = {[pathname]}
                    defaultOpenKeys = {[this.defOpenKey]}
                    mode="inline"
                    theme="dark">
                        {this.menuItems}
                </Menu>
            </div>
        )
    }
}

export default withRouter(Sider);