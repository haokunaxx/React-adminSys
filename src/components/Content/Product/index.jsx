import { Component } from 'react';
import './index.scss';

import {Table, Button, Modal, Card, message, Select, Input, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



import { getProdList, updateProdStatus } from '../../../api';

const { Option } = Select;

const CardTitle = (props) => {
  
    return(
        <div className="card-title-wrap">
            <p>商品管理</p>
            
        </div> 
    )
}


export default class Product extends Component{
    state = {
        productList:[], //数据

        totalPage:0,    //分页相关
        total:0,
        pageNum:1,
        pageSize:6,

        loading:false,  //加载状态
        
        keyword:'', // 搜索相关
        searchType:'productName'
    }

    componentDidMount(){
        this.getProdList();
    }
    getProdList = async () => {
        this.setState({loading:true});
        const {pageNum, pageSize, searchType, keyword} = this.state;
        let argsObj = {
            pageNum: pageNum,
            pageSize: pageSize
        };
        keyword.length > 0 && ( argsObj[searchType] = keyword );
        const res = await getProdList(argsObj);
        this.setState({
            productList: res.data.list,
            total: res.data.total
        },()=>{
            this.setState({loading:false});
        });
    }
    
    showModal = () => {

    }

    // 搜索begin
    // handleKeywordInput = (e) => {
    //     this.setState({
    //         keyword:e.target.value
    //     })
    // }
    // handleChange = (val) => {
    //     this.setState({
    //         searchType:val
    //     })
    // }
    // 受控组件封装
    handleStateValueChange = (name,value,callback) => {
        this.setState({
            [name]:value
        },()=>{
            callback && callback()
        })
    }
    search = () => {
        this.handleStateValueChange('pageNum',1,this.getProdList);
    }
    // 搜索end

    showSubCateList =  () => {

    }
    // 上下架切换
    onSaleChange = (item,isChecked) => {
        console.log(item,isChecked)
        updateProdStatus({
            productId:item._id,
            status:isChecked ?  '1' : '2'
        })
    }

    //分页器onchange
    handlePaginationChange = (pageNum,pageSize) => {
        this.setState({
            pageNum,
            pageSize
        },()=>{
            this.getProdList();
        })
    }
    render(){
        const tableInfo = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                className:'table-center',
                width: 100,
                dataIndex: 'price',
                // key: 'price',
                render:(price)=>{
                    return '$'+price
                }
            },
            {
                title: '状态',
                className:'table-center',
                width: 120,
                // dataIndex: 'status',
                // key: 'name',
                render:(item)=>{
                    let isChecked = item.status === 1 ? true : false;
                    return (
                        <>
                            {/* <Button type='primary'>{temp[status].opt}</Button>
                            <p>{temp[status].state}</p> */}
                           <Switch checkedChildren="在售" unCheckedChildren="已下架" onChange={(isChecked,e)=>{
                               this.onSaleChange(item,isChecked);
                           }} defaultChecked={isChecked}/>
                        </>
                    )
                }
            },
            {
                title: '操作',
                className:'table-center',
                width:200,
                render:(category)=>{
                    return (
                        <>
                            <Button type='link'>详情</Button>
                            <Button type='link'>修改</Button>
                        </>
                    )
                }
            }
        ];
        const  {loading, productList} = this.state;
        return(
            <>
                <Card
                    style={{ width: '100%' }}
                    title={<CardTitle />}
                    extra={<Button type='primary' icon={<PlusOutlined />} onClick={()=>{this.showModal('add')}}>添加商品</Button>}
                >
                    <div className="filter-wrap">
                        <Select defaultValue={this.state.searchType} style={{ width: 120 }} onChange={(val)=>{
                            this.handleStateValueChange('searchType',val);
                        }}>
                            <Option value="productName">按名称搜索</Option>
                            <Option value="productDesc">按描述搜索</Option>
                        </Select>
                        <Input placeholder="关键字" value={this.state.keyword} onChange={(e)=>{
                            this.handleStateValueChange('keyword',e.target.value)
                        }} className="keyword-input"/>
                        <Button type="primary" onClick={this.search}>搜索</Button>
                    </div>
                    <Table 
                        style={{height:'auto'}}
                        loading = {loading}
                        rowKey='_id'
                        dataSource={productList}
                        columns={tableInfo}
                        pagination={
                            {
                                current:this.state.pageNum,
                                defaultPageSize: 6,
                                total:this.state.total,
                                onChange:this.handlePaginationChange
                            }
                        }
                    />
                </Card>
            </>
        )
    }
}