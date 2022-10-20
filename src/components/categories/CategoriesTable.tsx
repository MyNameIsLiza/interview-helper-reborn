import { Table } from 'antd';
import { useSelector } from 'react-redux';

import withContextCheck from '../../hoc/withContextCheck';
import { categoriesSelector } from '../../store/slices/categories';

import useCategoriesColumns from './useCategoriesColumns';

function CategoriesTable(): React.ReactElement | null {
  const { categories } = useSelector(categoriesSelector);
  const columns = useCategoriesColumns();

  return <Table dataSource={categories} columns={columns} />;
}

export default withContextCheck(CategoriesTable);
