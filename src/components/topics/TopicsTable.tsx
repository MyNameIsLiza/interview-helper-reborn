import { Table } from 'antd';

import useLogChanges from '../axillary/useLogChanges';

import useTopics from './useTopics';
import useTopicsColumns from './useTopicsColumns';

function TopicsTable(properties: {
  categoryId?: string;
}): React.ReactElement | null {
  useLogChanges('TopicsTable', 'props', properties);
  const { topics } = useTopics(properties);
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

export default TopicsTable;
