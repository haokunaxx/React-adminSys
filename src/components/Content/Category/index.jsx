import {Component} from 'react';

import {Table, Button, Modal, Card, message } from 'antd';

import TableInner from './components/TableInner';   //Table的操作栏
import CardTitle from './components/CardTitle';     //卡片头部（面包屑导航）
import UpdateForm from './components/updateForm';   //更新分类表单
import AddForm from './components/addForm';         //添加分类表单

import './index.scss';

import {addCate, getCateList, updateCate} from '../../../api';

export default class Category extends Component{
    state = {
        cateList:[],    //分类数据
        parentId:'0',   //获取一级分类数据需要
        parentName:'',
        loading:false,
        breadcrumbArr:[],
        isModalVisible:false,
        defaultValue:'',
        modalStatus:null
    }
    componentDidMount(){
        // console.log(this)
        this.getCateList();
    }
    // 获取列表数据
    getCateList = async () =>{
        this.setState({loading:true});
        const res = await getCateList({parentId:this.state.parentId});
        this.setState({cateList:res.data},()=>{
            this.setState({loading:false});
        });
    }
    // 显示一级列表
    showFirstLevelCateList = () => {
        this.setState({
            parentId:'0',
            parentName:''
        },()=>{
            this.getCateList();
        });
    }
    // 显示子列表
    showSubCateList = (item) => {
        this.setState({
            parentId:item._id,
            parentName:item.name
        },()=>{
            this.getCateList();
        });
    } 

    showModal = (flag,defData) => {
        if(flag === 'edit'){
            this.curCate = defData
        }
        this.setState({
            modalStatus:flag === 'edit' ? 'edit' : 'add',
            defaultValue:flag === 'edit' ? defData.name :''
        })
        this.modalShow(true);
    }

    handleOk = async () => {
        if(this.state.modalStatus === 'add'){
            
            const categoryName = this.form.getFieldValue('categoryName');

            const res = await addCate({
                parentId:this.state.parentId,
                categoryName
            });

            if(res.status === 0){   //成功刷新列表
                this.getCateList();
            }else{                  //失败提示信息
                message.error('添加分类出现问题');
                this.getCateList();
            }

        }else{
            const categoryId = this.curCate._id;    //当前更改的那条数据的id，在showModal时进行了保存
            const categoryName = this.form.getFieldValue('categoryName');

            const res = await updateCate({categoryId,categoryName});

            if(res.status === 0){   //成功刷新列表
                this.getCateList();
            }else{                  //失败提示信息
                message.error('更新分类出现问题');
                this.getCateList();
            }
        }

        this.modalShow(false);
    }

    handleCancel = () =>{
        this.modalShow(false);
    }
    modalShow = (flag) => {
        this.setState({
            isModalVisible:flag ? true : false
        })
    }
    render(){
        const tableInfo = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width:300,
                render:(category)=>{
                    const {parentId} = this.state;
                    return (
                        <TableInner 
                            parentId = {parentId} 
                            category = {category} 
                            showModal={()=>{this.showModal('edit',category)}}
                            showSubCateList={()=>{this.showSubCateList(category)}}
                        />
                    )
                }
            }
        ];

        const {cateList,loading,parentName,parentId} = this.state;;

        
        return(
            <>
                <Card
                    style={{ width: '100%' }}
                    title={
                        <CardTitle
                            parentName={parentName} 
                            parentId={parentId} 
                            showFirstLevelCateList={()=>{this.showFirstLevelCateList()}}
                        />}
                    extra={<Button type='primary' onClick={()=>{this.showModal('add')}}>添加分类</Button>}
                >
                    <Table 
                        style={{height:'auto'}}
                        loading = {loading}
                        rowKey='_id'
                        dataSource={cateList}
                        columns={tableInfo}
                        pagination={{defaultPageSize:6}}
                    />;
                </Card>

                <Modal title={this.state.modalStatus === 'edit' ? '更新分类' : '添加分类'}
                    destroyOnClose = {true}
                    visible={this.state.isModalVisible} 
                    onOk={this.handleOk} 
                    onCancel={this.handleCancel}>
                        {
                            this.state.modalStatus === 'edit' ? (
                                <UpdateForm 
                                    defCateName={this.state.defaultValue} 
                                    formHook={(form)=>this.form = form}
                                />
                            ) :
                            <AddForm
                                parentId = {parentId}
                                parentName = {parentName}
                                cateList = {cateList}
                                formHook={(form)=>this.form = form}
                            />
                        }
                </Modal>
            </>
        )
    }
}