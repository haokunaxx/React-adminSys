import {Component} from 'react';
import {getUser} from '../../store/user';
import './index.scss';

import Sider from '../../components/Sider';
import Header from '../../components/Header';
import Content from '../../components/Content';
// import Footer from '../../components/Footer';


import { Layout } from 'antd';
const { Header:ElHeader, Sider:ElSider, Content:ElContent } = Layout;


export default class Home extends Component{

    componentDidMount(){
        // console.log(userInfo)
        let userInfo = getUser('userInfo');
        console.log(userInfo);
        if(!userInfo || !userInfo._id){
            this.props.history.replace('/Login');
        }
    }

    render(){
        return(
            <Layout className='outer-layout'>
                <ElSider>
                    <Sider />
                </ElSider>
                <Layout className='inner-layout'>
                    <ElHeader>
                        <Header></Header>
                    </ElHeader>
                    <ElContent style={{overflow:'auto',color:'#000'}}>
                        <Content></Content>
                    </ElContent>
                    {/* <ElFooter>
                        <Footer></Footer>
                    </ElFooter> */}
                </Layout>
            </Layout>
        )
    }
}