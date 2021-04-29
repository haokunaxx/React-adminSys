import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Form, Input, Select } from 'antd';
const { Option } = Select;
const { Item } = Form;


const AddForm = (props) => {
  const { formHook, cateList, parentName, parentId} = props;

  const [data,setData] = useState(parentId === '0' ? cateList : []);    //搜索时显示
  const [val,setVal] = useState( parentId );         //Item上的value

  const [form] = Form.useForm();

  useEffect(()=>{
    formHook(form); //向父组件传入form表单对象
  },[])//设置依赖师hook只在组件挂载时调用，不设置依赖选中不同项时也会调用

  //选中
  const handleChange = value => {
    setVal(value);
  };

  // 渲染的列表
  const options = data.map(d => <Option key={d._id}>{d.name}</Option>);
  
  return (
    <>
      <Form form={form} name="AddForm">
        <Item
          name="belongs"
          label="所属分类"
          initialValue = {parentId === '0' ? '0' : parentName}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            disabled = {parentId!=='0'? true:false}
            showSearch
            value={val}
            style={{ width: '100%' }}
            defaultActiveFirstOption
            showArrow={false}
            filterOption={(inputVal,options)=>{
              return options.children && options.children.indexOf(inputVal)>-1;
            }}
            onChange={handleChange}
            notFoundContent={null}
            placeholder="Select a option and change input text above"
          >
            {parentId === '0'&&<Option key='0'>一级品类</Option>}
            {options}
          </Select>
        </Item>
        <Item
          name="categoryName"
          label="分类名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Item>
      </Form>
    </>
  );
};

AddForm.propTypes = {
  cateList:PropTypes.array.isRequired,
  parentName:PropTypes.string.isRequired,
  parentId:PropTypes.string.isRequired,
  formHook:PropTypes.func.isRequired
}
export default AddForm;