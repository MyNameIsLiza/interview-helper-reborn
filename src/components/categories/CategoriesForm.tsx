import { Button, Form, Input } from 'antd';
import { useCallback, useContext, useEffect } from 'react';

import withContextCheck from '../../hoc/withContextCheck';
import type { Category } from '../../types';

import CategoriesFormContext from './CategoriesFormContext';
import useAddCategory from './useAddCategory';
import useEditCategory from './useEditCategory';

function CategoriesForm(): React.ReactElement {
  const context = useContext(CategoriesFormContext);
  const [form] = Form.useForm();
  const { addCategory } = useAddCategory();
  const { editCategory } = useEditCategory();

  const onFinish = useCallback(
    async (values: Category): Promise<any> => {
      await (context?.category?.id
        ? editCategory({ ...values, id: context.category.id })
        : addCategory(values));
      context?.setOpen(false);
      context?.setCategory(null);
    },
    [context],
  );

  const onFinishFailed = useCallback((errorInfo: any): void => {
    console.error('Failed:', errorInfo);
  }, []);

  useEffect(
    () => () => {
      if (!context?.open) {
        form.resetFields();
      }
    },
    [context?.open],
  );

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
        <Input key={context?.category?.id || ''} />
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

export default withContextCheck(CategoriesForm, CategoriesFormContext);
