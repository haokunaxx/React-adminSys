import {useState} from 'react';
import { Modal, Button } from 'antd';
import {withRouter} from 'react-router-dom';
import './index.scss';
import {removeUser} from '../../store/user';
function Header(props){

    const [visible,setVisible] = useState(false),
        [modalText] = useState('确定要退出当前登录吗?');
    const showModal = () =>{
        setVisible(true);
    };
    const handleOk = () =>{
        removeUser('userInfo');
        props.history.replace('/login');
    };
    const handleCancel = () =>{
        setVisible(false);
    };
    // console.log(userInfo)
    return (
        <div className='header-wrapper'>
            <div className="header-temp"></div>
            <div className="header-menu">
                <p>Hello, useState</p>
                <Button type="text" onClick={showModal} style={{color:'#2c82fd'}}>
                    退出
                </Button>
            <Modal
                visible={visible}
                cancelText='取消'
                okText='确认'
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    </div>
    )
}


export default withRouter(Header);