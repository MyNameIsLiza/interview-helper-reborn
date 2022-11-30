import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

import withContextCheck from '../../hoc/withContextCheck';
import useTopics from '../topics/useTopics';

import CategoriesFormContext from './CategoriesFormContext';
import useCategories from './useCategories';
import useCategoriesColumns from './useCategoriesColumns';
import useDeleteCategory from './useDeleteCategory';

function CategoriesTable(): React.ReactElement | null {
  const { categories } = useCategories();
  const { topics } = useTopics();
  const { isLoading } = useDeleteCategory();
  const columns = useCategoriesColumns();
  const navigate = useNavigate();

  /* useEffect(() => {
    console.log('Table loading', isLoading);
  }, [isLoading]); */

  return (
    <Table
      loading={isLoading}
      onRow={(record): { onClick: () => void } => {
        return {
          onClick: (): void => {
            navigate(`/categories/${record.id}`);
          },
        };
      }}
      dataSource={categories.map((category) => {
        return {
          ...category,
          key: category.id,
        };
      })}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => {
          const topicsByCategory = topics.filter(
            (topic) => topic.categoryId === record.id,
          );

          return (
            <ul>
              {topicsByCategory.length > 0
                ? topicsByCategory.map((topic) => (
                    <li key={topic.id}>{topic.title}</li>
                  ))
                : null}
            </ul>
          );
        },
        rowExpandable: (record) => {
          const topicsByCategory = topics.filter(
            (topic) => topic.categoryId === record.id,
          );
          return topicsByCategory.length > 0;
        },
      }}
    />
  );
}

export default withContextCheck(CategoriesTable, CategoriesFormContext);
