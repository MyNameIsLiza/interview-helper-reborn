import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { useCallback, useMemo, useState } from 'react';

import type { Category } from '../../types';
import Loader from '../axillary/loader/Loader';
import useLogChanges from '../axillary/useLogChanges';

import CategoriesForm from './CategoriesForm';
import CategoriesFormContext from './CategoriesFormContext';
import CategoriesTable from './CategoriesTable';
import useCategories from './useCategories';

export default function Categories(): React.ReactElement {
  const { categories, isLoading, error, status, isFetching } = useCategories();
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | null>(null);

  useLogChanges('Categories', 'status', status);
  useLogChanges('Categories', 'isFetching', isFetching);
  useLogChanges('Categories', 'categories', categories);

  const contextData = useMemo(
    () => ({ setOpen, setCategory, category, open }),
    [category, setOpen, setCategory, open],
  );

  const clearCategoriesInfo = useCallback(() => {
    setOpen(false);
    setCategory(null);
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      {isLoading || isFetching ? (
        <Loader />
      ) : error ? (
        <h2>{error.message}</h2>
      ) : categories.length > 0 ? (
        <div>
          <CategoriesFormContext.Provider value={contextData}>
            <Space size="large">
              <Button
                onClick={(): void => {
                  setOpen(true);
                }}
              >
                Add new
                <PlusCircleOutlined />
              </Button>
            </Space>
            <Modal
              title="Adding new category"
              centered
              open={open}
              onCancel={clearCategoriesInfo}
              onOk={clearCategoriesInfo}
              footer={null}
            >
              <CategoriesForm />
            </Modal>
            <CategoriesTable />
          </CategoriesFormContext.Provider>
        </div>
      ) : (
        <h2>Categories are missing</h2>
      )}
    </div>
  );
}
