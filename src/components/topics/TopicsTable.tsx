import { Table } from 'antd';
import { useSelector } from 'react-redux';

import withContextCheck from '../../hoc/withContextCheck';
import { topicsSelector } from '../../store/slices/topics';

import useTopicsColumns from './useTopicsColumns';

function TopicsTable(): React.ReactElement | null {
  const { topics } = useSelector(topicsSelector);
  const columns = useTopicsColumns();

  return (
    <Table
      dataSource={topics.map((topic) => ({
        ...topic,
        key: topic.id,
      }))}
      columns={columns}
    />
  );
}

export default withContextCheck(TopicsTable);
