import { useQuery } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';

export default function useCategory(id?: string) {
  const query = useQuery(
    ['category', id],
    async () => categoriesRequests.fetchCategory(id),
    { enabled: !!id },
  );
  return { category: query.data, ...query, error: query.error as ServerError };
}
