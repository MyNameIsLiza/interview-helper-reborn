import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import type { AppDispatch } from '../../store';
import { useAppDispatch } from '../../store';
import type { Category } from '../../store/slices/categories';
import {
  categoriesSelector,
  deleteCategory,
} from '../../store/slices/categories';
import type { CategoriesFormContextType } from '../axillary/types';

import CategoriesFormContext from './CategoriesFormContext';

const columns = (
  dispatch: AppDispatch,
  context: CategoriesFormContextType,
): ColumnsType<Category> => [
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
          context.setCategory(category);
          context.setOpen(true);
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

export default function CategoriesTable(): React.ReactElement {
  const { categories } = useSelector(categoriesSelector);
  const dispatch = useAppDispatch();
  const context = useContext(CategoriesFormContext);

  useEffect(() => {
    console.log('Table', context);
  });

  if (!context) return <>Error</>;
  return <Table dataSource={categories} columns={columns(dispatch, context)} />;
}
