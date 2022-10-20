import { Button, Form, Input } from 'antd';
import { useCallback, useContext, useEffect } from 'react';

import withContextCheck from '../../hoc/withContextCheck';
import { useAppDispatch } from '../../store';
import { addCategory, editCategory } from '../../store/slices/categories';
import type { Category } from '../../types';

import CategoriesFormContext from './CategoriesFormContext';

function CategoriesForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const context = useContext(CategoriesFormContext);
  const [form] = Form.useForm();

  const onFinish = useCallback((values: Category): void => {
    if (context?.category?.id) {
      dispatch(editCategory({ ...values, id: context.category.id }));
    } else {
      dispatch(addCategory(values));
    }
    context?.setCategory(null);
    context?.setOpen(false);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any): void => {
    console.error('Failed:', errorInfo);
  }, []);

  useEffect(() => () => {
    form.resetFields();
  });

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      layout="horizontal"
      name="basic"
      initialValues={{ ...context?.category }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please input title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: false }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withContextCheck(CategoriesForm);
