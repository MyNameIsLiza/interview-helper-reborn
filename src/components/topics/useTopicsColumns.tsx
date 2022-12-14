import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';

import { useAppDispatch } from '../../store';
import { deleteTopic } from '../../store/slices/topics';
import type { Topic } from '../../types';

import TopicsFormContext from './TopicsFormContext';

export default function useTopicsColumns(): ColumnsType<Topic> {
  const dispatch = useAppDispatch();
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
      render: (category: Topic) => (
        <DeleteOutlined
          onClick={(): void => {
            dispatch(deleteTopic(category.id));
          }}
        />
      ),
    },
  ];
}
