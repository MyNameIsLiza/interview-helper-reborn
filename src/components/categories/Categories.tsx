import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import type { Category } from '../../store/slices/categories';
import { categoriesSelector } from '../../store/slices/categories';
import Loader from '../axillary/loader/Loader';

import CategoriesForm from './CategoriesForm';
import CategoriesFormContext from './CategoriesFormContext';
import CategoriesTable from './CategoriesTable';

export default function Categories(): React.ReactElement {
  const { categories, loading, error } = useSelector(categoriesSelector);
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | null>(null);

  const contextData = useMemo(
    () => ({ setOpen, setCategory, category }),
    [category, setOpen, setCategory],
  );

  const clearCategoriesInfo = useCallback(() => {
    setOpen(false);
    setCategory(null);
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <h2>{error}</h2>
  ) : categories.length > 0 ? (
    <div>
      <CategoriesFormContext.Provider value={contextData}>
        <Space size="large">
          <h2>Categories</h2>
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
          width="50%"
        >
          <CategoriesForm />
        </Modal>
        <CategoriesTable />
      </CategoriesFormContext.Provider>
    </div>
  ) : (
    <h2>Categories are missing</h2>
  );
}
