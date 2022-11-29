import { Table } from 'antd';

import withContextCheck from '../../hoc/withContextCheck';

import TopicsFormContext from './TopicsFormContext';
import useTopics from './useTopics';
import useTopicsColumns from './useTopicsColumns';

function TopicsTable(): React.ReactElement | null {
  const { topics } = useTopics();
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

export default withContextCheck(TopicsTable, TopicsFormContext);
