import React,{ Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined,LockOutlined ,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import './index.scss';

import {UserLogin} from '../../api';
import {saveUser,getUser} from '../../store/user';

export default class Login extends Component {
    formRef = React.createRef();
    handleSubmit = (e) => {
        e.preventDefault();
        /* antd 表单验证方法。
            this.formRef.current.validateFields()执行结果返回的是一个promise对象，
            验证通过后返回表单数据，类型为对象；
            验证失败返回表单数据以及验证失败的表单项
        */
        this.formRef.current.validateFields().then(
            async values=>{
                const response = await UserLogin(values);
                if(response.status === 1){
                    message.error(response.msg);
                }else{
                    saveUser(response.data);
                    this.props.history.replace('/');
                }

            }
        ).catch(
            err=>{
                message.error('请按要求填写完整表单');
            }
        );
    }
    componentDidMount(){
        if(getUser()){
            this.props.history.replace('/');
        }
    }
    render() {
        return (
            <div className="login-wrapper">
                <header className='login-header'>
                    Stupid System
                </header>
                <section className='login-form'>
                    <div className="form-header">用户登录</div>
                    <Form
                        ref={this.formRef} 
                        name="basic">
                        <Form.Item
                            // label="Username"
                            initialValue = 'admin'
                            name="username"
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
                            ]}
                        >
                            <Input 
                                size="large" 
                                placeholder="large size" 
                                prefix={<UserOutlined  
                                style={{opacity:'.5'}}/>} />
                        </Form.Item>

                        <Form.Item
                            // label="Password"
                            name="password"
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
                            {/* <Input.Password /> */}
                            <Input.Password
                                size="large"
                                placeholder="input password"
                                prefix={<LockOutlined  style={{opacity:'.5'}}/>}
                                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" block htmlType="submit" onClick={this.handleSubmit} >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}