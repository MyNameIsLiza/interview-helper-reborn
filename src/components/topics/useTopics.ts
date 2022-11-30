import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { ServerError, TopicsParameters } from '../../services/api';
import { topicsRequests } from '../../services/api';
import type { Topic } from '../../types';

interface UseTopicsResult {
  topics: Topic[];
  error: ServerError;
  isLoading: UseQueryResult['isLoading'];
  isFetching: UseQueryResult['isFetching'];
}

export default function useTopics(
  parameters?: TopicsParameters,
): UseTopicsResult {
  const query = useQuery<Topic[], ServerError>(
    ['topics', parameters],
    async () => topicsRequests.fetchTopics(parameters),
  );
  return {
    topics: query.data || [],
    ...query,
  };
}
