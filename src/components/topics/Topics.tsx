import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import { topicsRequests } from '../../services/api';
import { topicsSelector } from '../../store/slices/topics';
import type { Topic } from '../../types';
import Loader from '../axillary/loader/Loader';

import TopicsForm from './TopicsForm';
import TopicsFormContext from './TopicsFormContext';
import TopicsTable from './TopicsTable';

export default function Topics(): React.ReactElement {
  const { topics, loading, error } = useSelector(topicsSelector);
  const [open, setOpen] = useState<boolean>(false);
  const [topic, setTopic] = useState<Topic | null>(null);

  const contextData = useMemo(
    () => ({ setOpen, setTopic, topic }),
    [topic, setOpen, setTopic],
  );

  const clearTopicsInfo = useCallback(() => {
    setOpen(false);
    setTopic(null);
  }, []);

  return (
    <div>
      <h1>Topics</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <h2>{error}</h2>
      ) : topics.length > 0 ? (
        <div>
          <TopicsFormContext.Provider value={contextData}>
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
              title="Adding new topic"
              centered
              open={open}
              onCancel={clearTopicsInfo}
              onOk={clearTopicsInfo}
              footer={null}
            >
              <TopicsForm />
            </Modal>
            <TopicsTable />
          </TopicsFormContext.Provider>
        </div>
      ) : (
        <h2>Topics are missing</h2>
      )}
    </div>
  );
}
