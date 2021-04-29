import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';
const Item = Form.Item;

const UpdateForm = (props) => {

  const [form] = Form.useForm();

  const {formHook,defCateName} = props;

  useEffect(()=>{
    formHook(form); //向父组件传入form表单对象
  },[])

  return (
    <>
      <Form form={form}>
        <Item
          name='categoryName'
          label='分类名'
          rules={[{ required: true, message: '请先输入新的分类名称!' }]}
          initialValue={defCateName}
        >
          <Input type="text" placeholder='请输入新的分类名称'/>
        </Item>
      </Form>
    </>
  );
};
UpdateForm.propTypes = {
  defCateName:PropTypes.string.isRequired,
  formHook:PropTypes.func.isRequired
}
export default UpdateForm;