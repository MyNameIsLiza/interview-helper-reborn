import { useQuery } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import useLogChanges from '../axillary/useLogChanges';

export default function useCategories() {
  const query = useQuery('categories', categoriesRequests.fetchCategories);

  return {
    categories: query.data || [],
    ...query,
    error: query.error as ServerError,
  };
}
