import { Button, Form, Input } from 'antd';
import { useCallback, useContext, useEffect } from 'react';

import withContextCheck from '../../hoc/withContextCheck';
import { useAppDispatch } from '../../store';
import { addTopic, editTopic } from '../../store/slices/topics';
import type { Topic } from '../../types';

import TopicsFormContext from './TopicsFormContext';

function TopicsForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const context = useContext(TopicsFormContext);
  const [form] = Form.useForm();

  const onFinish = useCallback((values: Topic): void => {
    if (context?.topic?.id) {
      dispatch(editTopic({ ...values, id: context.topic.id }));
    } else {
      dispatch(addTopic(values));
    }
    context?.setTopic(null);
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
      initialValues={{ ...context?.topic }}
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

export default withContextCheck(TopicsForm);
