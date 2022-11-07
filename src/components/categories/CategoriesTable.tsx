import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import withContextCheck from '../../hoc/withContextCheck';
import { categoriesSelector } from '../../store/slices/categories';

import useCategoriesColumns from './useCategoriesColumns';

function CategoriesTable(): React.ReactElement | null {
  const { categories } = useSelector(categoriesSelector);
  const columns = useCategoriesColumns();
  const navigate = useNavigate();
  return (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            navigate(`/categories/${record.id}`);
          },
        };
      }}
      dataSource={categories.map((category) => ({
        ...category,
        key: category.id,
      }))}
      columns={columns}
    />
  );
}

export default withContextCheck(CategoriesTable);
