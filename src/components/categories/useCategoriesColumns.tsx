import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useContext } from 'react';

import { useAppDispatch } from '../../store';
import { deleteCategory } from '../../store/slices/categories';
import type { Category } from '../../types';

import CategoriesFormContext from './CategoriesFormContext';

export default function useCategoriesColumns(): ColumnsType<Category> {
  const dispatch = useAppDispatch();
  const context = useContext(CategoriesFormContext);
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
      render: (category: Category) => (
        <EditOutlined
          onClick={(): void => {
            context?.setCategory(category);
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
      render: (category: Category) => (
        <DeleteOutlined
          onClick={(): void => {
            dispatch(deleteCategory(category.id));
          }}
        />
      ),
    },
  ];
}
