import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';

import { topicsRequests } from '../../services/api';
import type { Topic } from '../../types';

import TopicsFormContext from './TopicsFormContext';

export default function useTopicsColumns(): ColumnsType<Topic> {
  const context = useContext(TopicsFormContext);
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'id',
    },
    {
      title: 'Edit',
      dataIndex: '',
      key: 'edit',
      width: '5%',
      render: (category: Topic) => (
        <EditOutlined
          onClick={(): void => {
            context?.setTopic(category);
            context?.setOpen(true);
          }}
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      width: '5%',
      render: (topic: Topic) => (
        <Popconfirm
          title="Are you sure to delete this topic?"
          onConfirm={async (): Promise<void> => {
            const result = await topicsRequests.deleteTopic(topic.id);
            message.success(`Topic ${result.title} was deleted`);
          }}
          onCancel={() => {
            console.log('Cancel delete');
          }}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];
}
