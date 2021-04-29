import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Form, Input, Select } from 'antd';
const { Option } = Select;
const { Item } = Form;


const AddForm = (props) => {
  const { formHook, cateList, parentName, parentId} = props;

  const [data,setData] = useState(parentId === '0' ? cateList : []);    //搜索时显示
  const [val,setVal] = useState(parentId === '0' ? '一级品类': parentName);         //Item上的value

  const [form] = Form.useForm();

  useEffect(()=>{
    formHook(form); //向父组件传入form表单对象
  })


  //搜索
  const handleSearch = value => {
    setData(cateList.filter(item => item.name && item.name.indexOf(value) > -1));
  };

  //选中
  const handleChange = value => {
    setVal(value);
  };

  // 渲染的列表
  parentId === '0' && data.unshift({_id:'0',name:'一级品类'});    //党委
  const options = data.map(d => <Option key={d._id}>{d.name}</Option>);

  return (
    <>
      <Form form={form} name="AddForm">
        <Item
          name="belongs"
          label="所属分类"
          initialValue = {val}
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
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            placeholder="Select a option and change input text above"
          >
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