import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CellType } from 'rc-table/lib/interface';
import { useContext } from 'react';

import type { Category } from '../../types';

import CategoriesFormContext from './CategoriesFormContext';
import useDeleteCategory from './useDeleteCategory';

interface CategoryColumnsType extends Category {
  key: string;
}

export default function useCategoriesColumns(): ColumnsType<CategoryColumnsType> {
  const context = useContext(CategoriesFormContext);
  const { deleteCategory } = useDeleteCategory();

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
      render: (value, category) => (
        <EditOutlined
          onClick={(event): void => {
            event.stopPropagation();
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
      render: (value, category) => {
        return {
          props: {
            onClick: (event: Event) => {
              event.stopPropagation();
            },
          } as CellType<CategoryColumnsType>,
          children: (
            <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={async () => {
                // TODO Promise
                const result = await deleteCategory(category.id);
                await message.success(`Category ${result.title} was deleted`);
              }}
              onCancel={(): void => {
                console.log('Cancel delete');
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          ),
        };
      },
    },
  ];
}
