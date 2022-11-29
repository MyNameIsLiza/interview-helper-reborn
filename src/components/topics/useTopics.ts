import { useQuery } from 'react-query';

import type {
  ServerError,
  TopicsParams as TopicsParameters,
} from '../../services/api';
import { topicsRequests } from '../../services/api';

export default function useTopics(parameters?: TopicsParameters) {
  const query = useQuery(['topics', parameters], async () =>
    topicsRequests.fetchTopics(parameters),
  );
  return {
    topics: query.data || [],
    ...query,
    error: query.error as ServerError,
  };
}
